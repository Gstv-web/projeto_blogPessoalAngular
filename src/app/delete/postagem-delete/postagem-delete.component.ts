import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/models/Postagem';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem();

  idPostagem: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
  ) { }

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == "") {
      alert("Sua sessão expirou. Faça o login novamente");
      this.router.navigate(["/login"]);
    }

    this.idPostagem = this.route.snapshot.params["id"];
    this.findById();
  }

  findById() {
    this.postagemService.getById(this.idPostagem).subscribe((resp: Postagem) => {
      this.postagem = resp;
    });
  }

  delete() {
    this.postagemService.deletePost(this.idPostagem).subscribe(() => {
      alert("Postagem apagada com sucesso!");
      this.router.navigate(["/inicio"]);
    })
  }

}
