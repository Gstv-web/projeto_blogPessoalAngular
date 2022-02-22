import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioCred } from '../models/UsuarioCred';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioCred = new UsuarioCred();

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  login() {
    this.auth.login(this.usuarioLogin).subscribe({
      next: (resp: UsuarioCred) => {
        this.usuarioLogin = resp;

        environment.foto = this.usuarioLogin.foto;
        environment.nome = this.usuarioLogin.nome;
        environment.idUsuario = this.usuarioLogin.idUsuario;
        environment.token = this.usuarioLogin.token;
        environment.tipoUsuario = this.usuarioLogin.tipoUsuario;
        
        this.router.navigate(["/inicio"]);
      },
      error: erro => {
      if (erro.status == 400) {
        alert("Usuário ou senha inválidos");
        }
      }
    });
  }
}
