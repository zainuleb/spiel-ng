import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: '',
  };

  showAlert = false;
  alertMsg = 'Please Wait! You are being logged in';
  alertColor = 'blue';
  isSubmission = false;

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void { }

  async login() {

    this.showAlert = true;
    this.alertMsg = 'Please Wait! You are being logged in';
    this.alertColor = 'blue';
    this.isSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
    } catch (error) {
      this.isSubmission = false;
      this.alertMsg = 'Something went wrong';
      this.alertColor = 'red';

      console.log(error);
      return
    }

    this.alertMsg = 'You are logged in';
    this.alertColor = 'green';

  }
}
