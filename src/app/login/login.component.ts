import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isLogin = true;

  constructor(
    private formBuilder: FormBuilder
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
