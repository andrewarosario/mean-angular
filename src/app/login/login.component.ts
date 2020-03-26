import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isLogin = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.criarForm();
  }

  criarForm(): void {
    this.loginForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.authService.autenticar(this.loginForm.value)
      .subscribe(
          res => this.router.navigate(['/chat']),
          err => console.log(err)
      );
  }

  toggleLogin(): void {
    this.isLogin = !this.isLogin;
  }

  get nome() {
    return this.loginForm.get('nome');
  }

  get senha() {
    return this.loginForm.get('senha');
  }

}
