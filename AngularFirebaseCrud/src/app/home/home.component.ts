import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private angularAuth: AngularFireAuth, private router: Router) {
    this.angularAuth.auth.onAuthStateChanged((user) => {
      if(user){

      }else{
        this.router.navigate(['/login']);
      }
    })
   }

  ngOnInit(): void {
  }

}
