import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Postagem } from '../models/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }
  
  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }
  
  getAllPosts(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>("https://projetoblogpessoalgstv.herokuapp.com/postagem/todos", this.token);
  }

  getById(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(`https://projetoblogpessoalgstv.herokuapp.com/postagem/${id}`, this.token);
  }

  newPost(post: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>("https://projetoblogpessoalgstv.herokuapp.com/postagem/save", post, this.token);
  }

  editPost(post: Postagem): Observable<Postagem> {
    return this.http.put<Postagem>("https://projetoblogpessoalgstv.herokuapp.com/postagem/edit", post, this.token);
  }

  deletePost(id: number) {
    return this.http.delete(`https://projetoblogpessoalgstv.herokuapp.com/postagem/delete/${id}`, this.token);
  }

}