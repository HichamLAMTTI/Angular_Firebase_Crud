import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authentified = false;
  email = "";
  password = "";

  constructor(private angularAuth: AngularFireAuth, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  getUserInputName(valUsern:string){
    this.email = valUsern;
    //console.log(this.email);
  }
  getUserInputPassword(valPassw:string){
    this.password = valPassw;
    //console.log(this.password);
  }

  login(){
    if(this.email == "" || this.password == ""){
      this.authentified = false;
      this.snackBar.open("Please fill all required fields following by a * !!","Cancel",{duration: 3000});
    }else{
      this.angularAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.authentified = true;
        this.snackBar.open("Welcome !!","",{duration: 3000});
        this.router.navigate(['/home']);
      })
      .catch((error:any) => {
        this.authentified = false;
        //let errorCode = error.code;
        let msg = error.message;
        alert("Error : " + msg);
        this.router.navigate(['/login']);
      }) 
    }
  }

}
