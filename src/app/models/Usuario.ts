// MODEL DE USUÁRIO
// ESTRUTURA DE MODEL EM TYPESCRIPT

import { Postagem } from "./Postagem";

export class Usuario {
    public idUsuario: number;
    public nome: string;
    public email: string;
    public senha: string;
    public foto: string;
    public tipoUsuario: string;
    public postagem: Postagem[];
}
