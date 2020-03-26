import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  cadastrar(usuario: Usuario) {
    return this.http.post<any>(API + 'usuarios/cadastro', usuario);
  }

  autenticar(usuario: Usuario) {

    return this.http
      .post<Usuario>(
        API + 'usuarios/login',
        usuario,
        { observe: 'response'}
      )
      .pipe(
        tap((res: any) => {
          const authToken = res.body.token;
          this.usuarioService.setToken(authToken);
          console.log(`Usuário ${usuario} autenticado com o token ${authToken}`);
      }));
  }
}
