import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../models/Postagem';
import { Temas } from '../models/Temas';
import { Usuario } from '../models/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem();
  listaPostagem: Postagem[]

  listaTemas: Temas[];
  tema: Temas = new Temas();
  idTema: number;

  idUsuario = environment.idUsuario;
  usuario: Usuario = new Usuario();


  constructor(
    private router: Router,
    private temaService: TemaService,
    private postagemService: PostagemService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == "") {
      alert("Sua sessão expirou. Faça o login novamente");
      this.router.navigate(["/login"]);
    }

    this.authService.refreshToken();
    this.listarTemas();
    this.listarPostagens();
  }

  listarTemas() { // mostra uma lista de temas (acessando o service e utilizando uma função no html)
    this.temaService.getAllTemas().subscribe((resp: Temas[]) => {
      this.listaTemas = resp;
    });
  }

  getTagById() {
    this.temaService.getById(this.idTema).subscribe((resp: Temas) => {
      this.tema = resp;
    });
  }


  listarPostagens() {
    this.postagemService.getAllPosts().subscribe((resp: Postagem[]) => {
      this.listaPostagem = resp;
    })
  }

  findByUserId() {
    this.authService.getUserById(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp;
    });
  }


  publicar() {
    // variáveis para relacionamento many to many
    this.tema.idTema = this.idTema;
    this.postagem.fkTema = this.tema;
    this.usuario.idUsuario = this.idUsuario;
    this.postagem.fkUsuario = this.usuario;

    if (this.postagem.titulo == undefined || this.postagem.texto == undefined) {
      alert("Os campos de título e texto não podem estar vazios!")
    } else {
      this.postagemService.newPost(this.postagem).subscribe((resp: Postagem) => {
        this.postagem = resp;
        alert("Postagem efetuada!")
        this.postagem = new Postagem();
        this.listarPostagens();
      })
    }
  }

}
