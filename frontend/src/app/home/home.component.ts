import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { TodoComponent } from '../todo/todo.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  todos: any = [];
  filteredTodos: any = [
    {
      id: 3456,
      title: 'Create Nest App',
      description: 'Create a nest app',
      status: 'OPEN',
    },
  ];

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit() {
    this.apiService.getAllTodos().subscribe((todos: any) => {
      this.todos = todos;
      this.filteredTodos = this.todos;
    });
  }

  filterChanged(event: MatSelectChange) {
    const value = this.todos;
    this.filteredTodos = this.todos;
    if (value) {
      this.filteredTodos = this.filteredTodos.filter(
        (t: any) => t.status === value,
      );
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(TodoComponent, {
      width: '500px',
      hasBackdrop: true,
      role: 'dialog',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      // this.apiService
      //   .createTodo(data.title, data.description)
      //   .subscribe((result: any) => {
      //     console.log(result);
      //     this.todos.push(result);
      //     this.filteredTodos = this.todos;
      //   });
    });
  }

  statusChanged(event: MatSelectChange, taskId: number, index: number) {
    const value = event.value;
    this.apiService.updateStatus(value, taskId).subscribe((todo: any) => {
      this.todos[index] = todo;
      this.filteredTodos = this.todos;
    });
  }

  delete(id: number) {
    if (confirm('Do you want to remove todo')) {
      this.apiService.deleteTodo(id).subscribe((res: any) => {
        if (res.success) {
          this.todos = this.todos.filter((t: any) => t.id !== id);
          this.filteredTodos = this.todos;
        }
      });
    }
  }
}
