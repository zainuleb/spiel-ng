import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EmailTaken } from '../validators/email-taken';
import { RegisterValidators } from '../validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private auth: AuthService, private emailTaken: EmailTaken) {}

  //Alert Properties
  showAlert = false;
  alertMsg = 'Please wait your account is being created';
  alertColor = 'blue';
  inSubmission: boolean = false;

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.emailTaken.validate]
  );
  age = new FormControl('', [
    Validators.required,
    Validators.min(12),
    Validators.max(99),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.min(12),
    Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}/gm),
  ]);
  confirm_password = new FormControl('', [
    Validators.required,
    Validators.min(12),
  ]);
  phone_number = new FormControl('', [
    Validators.required,
    Validators.min(13),
    Validators.max(13),
  ]);

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirm_password: this.confirm_password,
      phone_number: this.phone_number,
    },
    [RegisterValidators.match('password', 'confirm_password')]
  );

  ngOnInit(): void {}

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait your account is being created';
    this.alertColor = 'white';
    this.inSubmission = true;

    const { email, password } = this.registerForm.value;

    try {
      await this.auth.createUser(this.registerForm.value);
    } catch (e) {
      console.error(e);

      this.alertMsg = 'An unexpected error occured';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertMsg = 'Your account has been created';
    this.alertColor = 'green';
  }
}
