import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
        login: ['', Validators.required],
        password: ['', Validators.required],
        rememberMe: [false, Validators.required]
      });
  }

  login() {
    if (this.formGroup.valid) {
      alert(
`You are almost login in.
You input
[login]=${this.formGroup.value.login};
[password]=${this.formGroup.value.password};
[rememberMe]=${this.formGroup.value.rememberMe}`
      );
    }
  }

}
