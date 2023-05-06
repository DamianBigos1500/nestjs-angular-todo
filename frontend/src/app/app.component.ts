import { ApiService } from './services/api.service';
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showMenu: boolean = true;
  username: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.jwtUserToken.subscribe((token: string) => {
      if (token) {
        const decoded: any = jwtDecode(token);
        this.username = decoded.username;
      }

      if (this.username) {
        this.showMenu = false;
      } else {
        this.showMenu = true;
      }
    });
  }

  logout() {
    this.username = '';
    this.apiService.logout();
  }
}
