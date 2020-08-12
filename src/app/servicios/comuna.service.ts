/* Servicios */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Clases */
import { ApiUrl } from '../modelos/ruta-api-rest';
import { Comuna } from '../modelos/comuna';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ComunaService {

  /* Se llama el servicio HttpClient */
  constructor(private http:HttpClient) { }

  /* Consulta todas las comunas registradas de la tabla comuna */
  findAllComuna():Promise<Comuna[]>{
    return this.http.get<Comuna[]>(ApiUrl + 'comuna').toPromise();
  }

  /*Consulta una de comuna de la tabla comunas*/
  findByIdComuna(id_comuna:Number):Promise<Comuna[]>{
    return this.http.get<Comuna[]>(ApiUrl + 'comuna/' + id_comuna).toPromise();
  }

  /* Inserta un dato ala tabla Comuna */
  insertComuna(comuna:Comuna){
    return this.http.post<Comuna>(ApiUrl + 'comuna', comuna)
  }

  /* Borra un dato de la tabla Comuna por id */
  deleteByIdComuna(id_comuna:Number){
    return this.http.delete(ApiUrl + 'comuna/' + id_comuna);
  }
  
   /* Actualiza un dato de la tabla Comuna por id */
   updateComuna(comuna:Comuna){
    return this.http.put<Comuna>(ApiUrl + 'comuna/' + comuna.id_comuna, comuna);
  }
}


