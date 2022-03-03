import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Temas } from '../models/Temas';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  getAllTemas(): Observable<Temas[]> {
    return this.http.get<Temas[]>("https://projetoblogpessoalgstv.herokuapp.com/temas/todos", this.token)
  }

  getById(id: number): Observable<Temas> {
    return this.http.get<Temas>(`https://projetoblogpessoalgstv.herokuapp.com/temas/${id}`, this.token);
  }
  postTema(tema: Temas): Observable<Temas> {
    return this.http.post<Temas>("https://projetoblogpessoalgstv.herokuapp.com/temas/save", tema, this.token);
  }

  putTema(tema: Temas): Observable<Temas> {
    return this.http.put<Temas>("https://projetoblogpessoalgstv.herokuapp.com/temas/edit", tema, this.token);
  }

  deleteTema(id: number) {
    return this.http.delete(`https://projetoblogpessoalgstv.herokuapp.com/temas/delete/${id}`, this.token);
  } 

}
