/* Servicios */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Clases */
import { ApiUrl } from '../modelos/ruta-api-rest';
import { Lugar } from '../modelos/lugar';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

   /* Se llama el servicio HttpClient */
   constructor(private http:HttpClient) { }

   /* Consulta todas las Lugar registradas de la tabla Lugar */
   findAllLugar():Promise<Lugar[]>{
     return this.http.get<Lugar[]>(ApiUrl + 'lugar').toPromise();
   }

   /*Consulta una de las lugar*/
   findByIdLugar(nom_lugar:String):Promise<Lugar[]>{
    return this.http.get<Lugar[]>(ApiUrl + 'lugar/' + nom_lugar).toPromise();
  }

  /*Consultatodos los lugares de una comuna*/
   findAllLugarComuna(id_comunaL:Number):Promise<Lugar[]>{
    return this.http.get<Lugar[]>(ApiUrl + 'lugarComuna/' + id_comunaL).toPromise();
  }
 
   /* Inserta un dato ala tabla Lugar */
   insertLugar(lugar:Lugar){
     return this.http.post<Lugar>(ApiUrl + 'lugar', lugar)
   }
 
   /* Borra un dato de la tabla Lugar por id */
   deleteByIdLugar(id_lugar:Number){
     return this.http.delete(ApiUrl + 'lugar/' + id_lugar);
   }
 
   /* Actualiza un dato de la tabla Lugar por id */
   updateLugar(lugar:Lugar){
     return this.http.put<Lugar>(ApiUrl + 'lugar/' + lugar.id_lugar, lugar);
   }

   
  /* Cuenta el total de todas los Lugares */
  findByIdTotalLugar(){
    return this.http.get<any>(ApiUrl + 'lugarContar');
  } 

   /*Consulta un zona de tabla lugar*/
   findAllByIdLugarZona(zona_roja:Boolean):Promise<Lugar[]>{
    return this.http.get<Lugar[]>(ApiUrl + 'LugarZona/' + zona_roja).toPromise();
  }

 
}
