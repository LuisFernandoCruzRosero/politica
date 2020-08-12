/* Servicios */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Clases */
import { ApiUrl } from '../modelos/ruta-api-rest';
import { Barrio } from '../modelos/barrio';

@Injectable({
  providedIn: 'root'
})
export class BarrioService {

  /* Se llama el servicio HttpClient */
  constructor(private http:HttpClient) { }

  /* Consulta todas las barrios registradas de la tabla barrio */
  findAllBarrio():Promise<Barrio[]>{
    return this.http.get<Barrio[]>(ApiUrl + 'barrio').toPromise();
  }

  /*Consulta un barrio de tabla barrio*/
  findByIdBarrio(id_barrio:Number):Promise<Barrio[]>{
    return this.http.get<Barrio[]>(ApiUrl + 'barrio/' + id_barrio).toPromise();
  }

  /*Consulta Barrios por comuna*/
  findAllBarrioComuna(id_comunaB:Number):Promise<Barrio[]>{
    return this.http.get<Barrio[]>(ApiUrl + 'barrio/' + id_comunaB).toPromise();
  }

  /* Inserta un dato ala tabla barrio */
  insertBarrio(barrio:Barrio){
    return this.http.post<Barrio>(ApiUrl + 'barrio', barrio)
  }

  /* Borra un dato de la tabla barrio por id */
  deleteByIdBarrio(id_barrio:Number){
    return this.http.delete(ApiUrl + 'barrio/' + id_barrio);
  }

  /* Actualiza un dato de la tabla barrio por id */
  updateBarrio(barrio:Barrio){
    return this.http.put<Barrio>(ApiUrl + 'barrio/' + barrio.id_barrio, barrio);
  }

}
