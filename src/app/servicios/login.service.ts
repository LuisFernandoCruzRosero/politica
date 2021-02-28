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
  autenticidad:Token = new Token('',null)

  /* Se llama el Cliente HttpClient */
  constructor(private http:HttpClient) { }

  /* Consulta todos los tipos de usuarios de la tabla TipoUsuario */
  findAllTipoUsuario():Promise<TipoUsuario[]>{
    return this.http.get<TipoUsuario[]>(ApiUrl + 'tipoUsuario').toPromise();
  }

  /* Consulta todos los usuarios en la tabla Usuario */
  findAllUsuario():Promise<UsuarioFindAll[]>{
    return this.http.get<UsuarioFindAll[]>(ApiUrl + 'usuario').toPromise();
  }

  /* Consulta todos los Digitadores en la tabla Digitador */
  findAllDigitador():Promise<DigitadorFindAll[]>{
    return this.http.get<DigitadorFindAll[]>(ApiUrl + 'digitador').toPromise();
  }

  /* Agrega el token al local Storage de Autenticidad */
  InsertToken(aut:Token){
    localStorage.setItem('autenticidad', JSON.stringify(aut));
  }

  /* elimina el token del local Storage de Autenticidad */
  deleteToken(aut:Token){
    localStorage.setItem('autenticidad', JSON.stringify(aut));
  }

  /* obtiene el token al local Storage de Autenticidad */
  findAllToken(){
    this.autenticidad = JSON.parse(localStorage.getItem('autenticidad'));
    return this.autenticidad;
  }
  /* Inserta un dato ala tabla coordinador */
  insertCoordinador(usuario:UsuarioFindAll){
    return this.http.post<UsuarioFindAll>(ApiUrl + 'usuario', usuario)
  }

  /* obtiene la cedula de todos los usuarios */
  findAllUsuarioCedula(ced_usuario:String):Promise<UsuarioFindAll[]>{
    return this.http.get<UsuarioFindAll[]>(ApiUrl + 'usuarioCedula/' + ced_usuario).toPromise();
  }

  /* obtiene la cedula de todos los usuarios */
  findByIdUsuarioCoordinador(id_usuario:Number):Promise<UsuarioFindAll[]>{
  return this.http.get<UsuarioFindAll[]>(ApiUrl + 'usuarioCoordinador/' + id_usuario).toPromise();
  }

 /* obtiene la cedula de todos los usuarios */
 findAllUsuarioCoordinadorCedula(ced_usuario:String):Promise<UsuarioFindAll[]>{
  return this.http.get<UsuarioFindAll[]>(ApiUrl + 'usuarioCoordinadorCedula/' + ced_usuario).toPromise();
}

findAllUsuarioCoordinadorLugar(id_lugar:Number):Promise<UsuarioFindAll[]>{
  return this.http.get<UsuarioFindAll[]>(ApiUrl + 'usuarioCoordinadorLugar/' + id_lugar).toPromise();
}

findAllUsuarioCoordinadorBarrio(id_barrio:Number):Promise<UsuarioFindAll[]>{
  return this.http.get<UsuarioFindAll[]>(ApiUrl + 'usuarioCoordinadorBarrio/' + id_barrio).toPromise();
}
  /* obtiene todos los usuarios de coordinador */
  findAllUsuarioCoordinador():Promise<UsuarioFindAll[]>{
    return this.http.get<UsuarioFindAll[]>(ApiUrl + 'usuarioCoordinador').toPromise();
  }
  
   /* Cuenta el total de todas las coordinador */
   findByIdTotalUsuarioCoordinador(){
    return this.http.get<any>(ApiUrl + 'usuarioCoordinadorContar');
  }

  /* Borra un dato de la tabla coordinador por id */
  deleteByIdCoordinador(id_usuario:Number){
    return this.http.delete(ApiUrl + 'usuario/' + id_usuario);
  }

   /* Actualiza un dato de la tabla coordinador por id */
   updateUsuario(usuario:UsuarioFindAll){
    return this.http.put<UsuarioFindAll>(ApiUrl + 'usuario/' + usuario.id_usuario, usuario);
  }
}
