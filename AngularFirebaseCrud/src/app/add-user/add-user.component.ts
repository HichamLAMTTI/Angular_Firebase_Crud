import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  pr = "";
  no = "";
  adr = "";
  em = "";
  tel = ""; 

  constructor(private fire: AngularFirestore, private snackBar: MatSnackBar, private router: Router, private angularAuth: AngularFireAuth) {
    this.angularAuth.auth.onAuthStateChanged((user) => {
      if(user){

      }else{
        this.router.navigate(['/login']);
      }
    })
   }

  ngOnInit(): void {
  }

  getUserInputFirstName(valFirstName : string){
    this.pr = valFirstName;
  }

  getUserInputLastName(valLasttName : string){
    this.no = valLasttName;
  }

  getUserInputAdress(valAdr : string){
    this.adr = valAdr;
  }

  getUserInputEmail(valEmail : string){
    this.em = valEmail;
  }

  getUserInputPhone(valPhone : string){
    this.tel = valPhone;
  }

  addUser(){
    this.fire.firestore.collection("Users").add({
      adresse: this.adr,
      email: this.em,
      nom: this.no,
      prenom: this.pr,
      tel: this.tel
    })
    .then(() => {
      this.snackBar.open("User has been added Successfully","",{duration: 3000});
      this.router.navigate(['/user']);
    })
    .catch((error) => {
      this.snackBar.open("Error adding User !!","",{duration: 3000});
      this.router.navigate(['/user']);
    })
  }

  showUsers(){
    this.router.navigate(["/user"]);
  }

}
