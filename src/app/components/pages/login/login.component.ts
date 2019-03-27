import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from '../../../utils/Utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  private returnUrl: string;
  hide = true;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
        login: ['', Validators.required],
        password: ['', Validators.required],
        rememberMe: [false, Validators.required]
      });
    this.activatedRoute.queryParams.subscribe(params => {
      this.returnUrl = params.returnUrl;
    });
  }

  login() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value.login, this.formGroup.value.password).subscribe({
        next: (value: {token: string}) => {
          this.formGroup.reset();
          const user = {
            token: value.token,
            detail: Utils.parseJwt(value.token)
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          if (this.returnUrl) {
            this.router.navigate([this.returnUrl]).catch(alert);
          } else {
            this.router.navigate(['work/grid']).catch(alert);
          }
        }
      });
    }
  }

}
