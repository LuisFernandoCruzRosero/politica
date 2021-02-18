/* Servicios */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* Clases */

import { ApiUrl } from '../modelos/ruta-api-rest';
import { Votante } from '../modelos/votante';


@Injectable({
  providedIn: 'root'
})
export class VotanteService {
 /* Se llama el servicio HttpClient */
 constructor(private http:HttpClient) { }

 /* Consulta todas las mesas registradas de la tabla Votante */
 findAllVotante():Promise<Votante[]>{
   return this.http.get<Votante[]>(ApiUrl + 'votante').toPromise();
 }

 /* Consulta una de las Agendas registradas de la tabla Votante */
 findByIdVotante(id_votante:Number):Promise<Votante[]>{
   return this.http.get<Votante[]>(ApiUrl + 'votante/' + id_votante).toPromise();
 }



 /* Inserta un dato ala tabla Votante */
 insertVotante(votante:Votante){
   return this.http.post<Votante>(ApiUrl + 'votante', votante)
 }

 /* Borra un dato de la tabla Votante por id */
 deleteByIdVotante(id_votante:Number){
   return this.http.delete(ApiUrl + 'votante/' + id_votante);
 }

 /* Actualiza un dato de la tabla Votante por id */
 updateVotante(votante:Votante){
   return this.http.put<Votante>(ApiUrl + 'votante/' + votante.id_votante, votante);
 }

 /* Cuenta el total de todas las Votantes */
 findByIdTotalVotante(){
   return this.http.get<any>(ApiUrl + 'votanteContar');
 }

 /* Consulta una de las cedulas registradas de la tabla Votante */
 findByIdVotanteCedula(cedula:String):Promise<Votante[]>{
  return this.http.get<Votante[]>(ApiUrl + 'votanteCedula/' + cedula).toPromise();
}

  /* Busca los votantes por Lugar */
  findByIdVotanteLugar(id_lugar:Number):Promise<Votante[]>{
    return this.http.get<Votante[]>(ApiUrl + 'votanteLugar/' + id_lugar).toPromise();
  }

  findAllVotanteBarrio(id_barrio:Number):Promise<Votante[]>{
    return this.http.get<Votante[]>(ApiUrl + 'votanteBarrio/' + id_barrio).toPromise();

  }

  findAllVotanteUsuario(id_usuario:Number):Promise<Votante[]>{
    return this.http.get<Votante[]>(ApiUrl + 'votanteUsuario/' + id_usuario).toPromise();

  }
  findAllVotanteLider(id_lider:Number):Promise<Votante[]>{
    return this.http.get<Votante[]>(ApiUrl + 'votanteLider/' + id_lider).toPromise();

  }

}
