/* Servicios */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* Clases */
import { ApiUrl } from '../modelos/ruta-api-rest';
import { Lider } from '../modelos/lider';


@Injectable({
  providedIn: 'root'
})
export class LiderService {

  /* Se llama el servicio HttpClient */
  constructor(private http:HttpClient) { }

  /* Consulta todas las mesas registradas de la tabla lider */
  findAllLider():Promise<Lider[]>{
    return this.http.get<Lider[]>(ApiUrl + 'lider').toPromise();
  }

  /* Consulta una de los lider registradas de la tabla lider */
  findByIdLiderCedula(ced_lider:String):Promise<Lider[]>{
    return this.http.get<Lider[]>(ApiUrl + 'liderCedula/' + ced_lider).toPromise();
  }

  /* Inserta un dato ala tabla lider */
  insertLider(lider:Lider){
    return this.http.post<Lider>(ApiUrl + 'lider', lider)
  }

  /* Borra un dato de la tabla lider por id */
  deleteByIdLider(id_lider:Number){
    return this.http.delete(ApiUrl + 'lider/' + id_lider);
  }

  /* Actualiza un dato de la tabla lider por id */
  updateLider(lider:Lider){
    return this.http.put<Lider>(ApiUrl + 'lider/' + lider.id_lider, lider);
  }

  /* Cuenta el total de todas las lider */
  findByIdTotalLider(){
    return this.http.get<any>(ApiUrl + 'liderContar');
  }
}
