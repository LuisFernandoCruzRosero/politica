/* Servicios */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/* Clases */
import { ApiUrl } from '../modelos/ruta-api-rest';
import { Token } from '../modelos/token';
import { TipoUsuario } from '../modelos/tipo-usuario';
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { DigitadorFindAll } from '../modelos/digitador-find-all';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /* Se crea la variable autenticidad como objeto Token y se inicializa vacia */
  autenticidad:Token=new Token('',null)

  /* Se llama el Cliente HttpClient */
  constructor(private http:HttpClient) { }

  /* Consulta todos los tipos de usuarios de la tabla TipoUsuario */
  findAllTipoUsuario():Promise<TipoUsuario[]>{
    return this.http.get<TipoUsuario[]>(ApiUrl+'tipoUsuario').toPromise();
  }

  /* Consulta todos los usuarios en la tabla Usuario */
  findAllUsuario():Promise<UsuarioFindAll[]>{
    return this.http.get<UsuarioFindAll[]>(ApiUrl+'usuario').toPromise();
  }

  /* Consulta todos los Digitadores en la tabla Digitador */
  findAllDigitador():Promise<DigitadorFindAll[]>{
    return this.http.get<DigitadorFindAll[]>(ApiUrl+'digitador').toPromise();
  }

  /* Agrega el token al local Storage de Autenticidad */
  InsertToken(aut:Token){
    localStorage.setItem('autenticidad',JSON.stringify(aut));
  }

  /* elimina el token del local Storage de Autenticidad */
  deleteToken(aut:Token){
    localStorage.setItem('autenticidad',JSON.stringify(aut));
  }

  /* obtiene el token al local Storage de Autenticidad */
  findAllToken(){
    this.autenticidad=JSON.parse(localStorage.getItem('autenticidad'));
    return this.autenticidad;
  }
}
