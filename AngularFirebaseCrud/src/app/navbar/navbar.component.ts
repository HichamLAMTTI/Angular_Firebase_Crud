import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public angularAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }
  
  homeLink(){
    this.router.navigate(['/home']);
  }

  userLink(){
    this.router.navigate(['/user']);
  }

  signOut(){
    this.angularAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

}
