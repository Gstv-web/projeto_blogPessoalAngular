import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { UsuarioCred } from '../models/UsuarioCred';

//Passar a url toda, com o endpoint do controller

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  login(usuarioLogin: UsuarioCred): Observable<UsuarioCred> {
    return this.http.post<UsuarioCred>("https://projetoblogpessoalgstv.herokuapp.com/usuarios/logar", usuarioLogin);
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>("https://projetoblogpessoalgstv.herokuapp.com/usuarios/cadastro", usuario);
  }

}
