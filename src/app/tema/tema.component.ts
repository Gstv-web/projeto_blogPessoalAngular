import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Temas } from '../models/Temas';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Temas = new Temas();
  listaTemas: Temas[];

  constructor(private router: Router,
    private temaService: TemaService) { }

  ngOnInit() {
    window.scroll(0,0);

    if (environment.token == "") {
      alert("Sua sessão expirou. Faça o login novamente");
      this.router.navigate(["/login"]);
    }

    this.listarTemas();
  }

  listarTemas() { // mostra uma lista de temas (acessando o service e utilizando uma função no html)
    this.temaService.getAllTemas().subscribe((resp: Temas[]) => {
      this.listaTemas = resp;
    });
  }

  cadastrar() {
    if (this.tema.tags == undefined || this.tema.tags.length < 2){
      alert("A descrição do tema deve ter no mínimo 2 caracteres.")
    } else {
      this.temaService.postTema(this.tema).subscribe((resp: Temas) => {
        this.tema = resp;
        alert("Tema cadastrado");
        this.tema = new Temas();
        this.listarTemas();
      });
    }
  }

}
