import { Temas } from "./Temas";
import { Usuario } from "./Usuario";

export class Postagem {
    public idPostagem: number;
    public titulo: string;
    public texto: string;
    public data: Date;
    public fkTema: Temas;
    public fkUsuario: Usuario;
}