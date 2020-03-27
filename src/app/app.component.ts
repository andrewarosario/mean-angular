import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './core/models/usuario';
import { UsuarioService } from './core/services/usuario.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public usuario$: Observable<Usuario>;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuario$ = this.usuarioService.getUsuario();
  }

  public logout(): void {
    this.usuarioService.logout();
  }
}
