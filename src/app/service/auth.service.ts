import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../models/Usuario';
import { UsuarioCred } from '../models/UsuarioCred';

//Passar a url toda, com o endpoint do controller

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }
  
  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set("Authorization", environment.token)
    }
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>("https://projetoblogpessoalgstv.herokuapp.com/usuarios/cadastro", usuario);
  }

  getUserById(id: number): Observable<Usuario> {
    return  this.http.get<Usuario>(`https://projetoblogpessoalgstv.herokuapp.com/usuarios/${id}`, this.token)
  }
  
  login(usuarioLogin: UsuarioCred): Observable<UsuarioCred> {
    return this.http.post<UsuarioCred>("https://projetoblogpessoalgstv.herokuapp.com/usuarios/logar", usuarioLogin);
  }

  edit(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`https://projetoblogpessoalgstv.herokuapp.com/usuarios/edit`, usuario, this.token)
  }

  logado(){
    let ok: boolean = false;

    if(environment.token != "") {
      ok = true;
    }
    return ok;
  }

}
