import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/models/Postagem';
import { Temas } from 'src/app/models/Temas';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem();

  tema: Temas = new Temas();
  listaTemas: Temas[];
  idTema: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == "") {
      alert("Sua sessão expirou. Faça o login novamente");
      this.router.navigate(["/login"]);
    }

    let id = this.route.snapshot.params['id'];
    this.findById(id);
    this.listarTemas();

  }

  findById(id: number) {
    this.postagemService.getById(id).subscribe((resp: Postagem) => {
      this.postagem = resp;
    });
  }

  findByIdTema() {
    this.temaService.getById(this.idTema).subscribe((resp: Temas) => {
      this.tema = resp
    });
  }

  listarTemas() { // mostra uma lista de temas (acessando o service e utilizando uma função no html)
    this.temaService.getAllTemas().subscribe((resp: Temas[]) => {
      this.listaTemas = resp;
    });
  }

  atualizar() {
    this.tema.idTema = this.idTema;
    this.postagem.fkTema = this.tema;

    this.postagemService.editPost(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;
      alert("Postagem atualizada com sucesso!");
      this.router.navigate(["/inicio"]);
    })
  }
}
