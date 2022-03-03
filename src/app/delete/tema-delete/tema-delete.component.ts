import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Temas } from 'src/app/models/Temas';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Temas = new Temas();
  idTema: number;
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

    this.idTema = this.route.snapshot.params["id"];
    this.findByTag(this.idTema);
  }

  findByTag(id: number) {
    this.temaService.getById(id).subscribe((resp: Temas) => {
      this.tema = resp;
    });
  }

  apagar() {
    this.temaService.deleteTema(this.idTema).subscribe(() => {
      alert("Tema apagado com sucesso");
      this.router.navigate(["/tema"]);
    })
  }

}
