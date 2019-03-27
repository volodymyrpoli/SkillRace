import { Component, OnInit } from '@angular/core';
import { Utils } from '../../../utils/Utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  isCurrentUserAdmin() {
    return Utils.isCurrentUserAdmin();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
