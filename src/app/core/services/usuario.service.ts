import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { Usuario } from '../models/usuario';
import jtw_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioSubject = new BehaviorSubject<Usuario>(null);

  constructor(
    private tokenService: TokenService
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
  }

  isLogged() {
      return this.tokenService.possuiToken();
  }

}
