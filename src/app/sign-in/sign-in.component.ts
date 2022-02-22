import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user: Usuario= new Usuario;
  confirmSenha: string;
  type: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0);
  }

  confirmPassword(event: any) {
    this.confirmSenha = event.target.value;
  }

  userType(event: any) {
    this.type = event.target.value;
  }

  signIn() {
    this.user.tipoUsuario = this.type;

    if (this.user.senha != this.confirmSenha) {
      alert("As senhas não são iguais!")
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: Usuario) => {
        this.user = resp;
        this.router.navigate(["/login"]);
        alert("Usuário cadastrado com sucesso!");
      });
    }

  }


}
