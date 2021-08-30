import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  showUserss = false;

  editPrenom = "";
  editNom = "";
  editTel = "";
  editEmail = "";
  editAdresse = "";

  listUsers = [
    {
      id: "",
      prenom: "",
      nom: "",
      tel: "",
      email: "",
      adresse: "",
      isEdit: false
    }
  ];

  singleUser = {id: "0", prenom: "0", nom: "0", tel: "0", email: "0", adresse: "0"};
  


  constructor(private fire: AngularFirestore, private router: Router, private snackBar: MatSnackBar, private angularAuth: AngularFireAuth) {
    this.angularAuth.auth.onAuthStateChanged((user) => {
      if(user){

      }else{
        this.router.navigate(['/login']);
      }
    });
    
    this.fire.firestore.collection("Users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.singleUser["id"] = doc.id;
        this.singleUser.prenom = doc.data().prenom;
        this.singleUser.nom = doc.data().nom;
        this.singleUser.tel = doc.data().tel;
        this.singleUser.email = doc.data().email;
        this.singleUser.adresse = doc.data().adresse;
        this.listUsers.push(JSON.parse(JSON.stringify(this.singleUser)));
      });
    });
    
  }

  ngOnInit(): void {
    
  }

  addButton(){
    this.router.navigate(['/addUser']);
  }

  showUsers(){
    this.showUserss = true;
  }

  // --> Edit User

  getEditPrenom(valPrenom : string){
    this.editPrenom = valPrenom;
  }

  getEditNom(valNom : string){
    this.editNom = valNom;
  }

  getEditTel(valTel : string){
    this.editTel = valTel;
  }

  getEditEmail(valEmail : string){
    this.editEmail = valEmail;
  }

  getEditAdresse(valAdresse : string){
    this.editAdresse = valAdresse;
  }

  editUser(i : any){
    i.isEdit = true;
    
    if(this.editPrenom == "" && this.editNom == "" && this.editTel == "" && this.editEmail == "" && this.editAdresse == ""){
      
    }else{
      var docUser = this.fire.firestore.collection("Users").doc(i.id);
      if(this.editPrenom != ""){
        docUser.update({
          prenom: this.editPrenom
        })
      }
      if(this.editNom != ""){
        docUser.update({
          nom: this.editNom
        })
      }
      if(this.editTel != ""){
        docUser.update({
          tel: this.editTel
        })
      }
      if(this.editEmail != ""){
        docUser.update({
          email: this.editEmail
        })
      }
      if(this.editAdresse != ""){
        docUser.update({
          adresse: this.editAdresse
        })
      }
      this.snackBar.open("Updated !!", "", {duration: 3000});
      this.router.navigate(["/home"]);
    }
  }

  cancelButton(a: boolean){
    a = false;
    location.reload();
  }
  

  deleteUser(i : string){
    this.fire.firestore.collection("Users").doc(i).delete().then(() => {
      this.snackBar.open("Document successfully deleted!", "", {duration: 3000});
      location.reload();
    }).catch((error) => {
      error = "Error removing document" + error;
      this.snackBar.open(error, "", {duration: 3000});
    });
  }
}
