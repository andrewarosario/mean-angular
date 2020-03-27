import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { Usuario } from '../models/usuario';
import jtw_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioSubject = new BehaviorSubject<Usuario>(null);

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {

      if (this.tokenService.possuiToken()) {
        this.decodeAndNotify();
      }
  }

  setToken(token: string) {
      this.tokenService.setToken(token);
      this.decodeAndNotify();
  }

  getUsuario() {
      return this.usuarioSubject.asObservable();
  }

  private decodeAndNotify() {
      const token = this.tokenService.getToken();
      const usuario = jtw_decode(token) as Usuario;
      this.usuarioSubject.next(usuario);
  }

  logout() {
      this.tokenService.removerToken();
      this.usuarioSubject.next(null);
      this.router.navigate(['/login']);
  }

  isLogged() {
      return this.tokenService.possuiToken();
  }

}
