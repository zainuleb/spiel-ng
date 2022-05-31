import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl('', [Validators.required, Validators.min(12), Validators.max(99)]);
  password = new FormControl('', [Validators.required, Validators.min(12)]);
  confirm_password = new FormControl('', [Validators.required, Validators.min(12)]);
  phone_number = new FormControl('', [Validators.required, Validators.min(10)]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phone_number: this.phone_number
  });

  constructor() {
  }

  ngOnInit(): void {
  }

}
