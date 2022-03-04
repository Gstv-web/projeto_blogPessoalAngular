import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {
  
  user: Usuario = new Usuario();
  idUser: number;
  confirmSenha: string;
  type: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == "") {
      alert("Sua sessão expirou. Faça o login novamente");
      this.router.navigate(["/login"]);
    }
    
    this.idUser = this.route.snapshot.params['id'];
    this.findById(this.idUser);
    this.authService.refreshToken();
  }

  confirmPassword(event: any) {
    this.confirmSenha = event.target.value;
  }

  userType(event: any) {
    this.type = event.target.value;
  }

  edit(){
    this.user.tipoUsuario = this.type;

    if (this.user.senha != this.confirmSenha) {
      alert("As senhas não são iguais!")
    } else {
      this.authService.edit(this.user).subscribe((resp: Usuario) => {
        this.user = resp;
        alert("Usuário atualizado com sucesso!");
        this.router.navigate(["/inicio"]);
      });
    }
  } 

  findById(id: number) {
    this.authService.getUserById(id).subscribe((resp: Usuario) => {
      this.user = resp;
    })
  }

}
