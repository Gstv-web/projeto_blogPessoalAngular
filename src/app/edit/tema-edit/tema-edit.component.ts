import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Temas } from 'src/app/models/Temas';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Temas = new Temas();

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (environment.token == "") {
      alert("Sua sessão expirou. Faça o login novamente");
      this.router.navigate(["/login"]);
    }

    let id = this.route.snapshot.params["id"];
    this.findByIdTema(id);
  }

  findByIdTema(id: number) {
    this.temaService.getById(id).subscribe((resp: Temas) => {
      this.tema = resp
    });
  }

  atualizar() {
    if (this.tema.tags == undefined || this.tema.tags.length < 2){
      alert("A descrição do tema deve ter no mínimo 2 caracteres.")
    } else {
      this.temaService.putTema(this.tema).subscribe((resp: Temas) => {
        this.tema = resp;
        alert("Tema atualizado com sucesso");
        this.router.navigate(["/tema"]);
      });
    }
  }

}
