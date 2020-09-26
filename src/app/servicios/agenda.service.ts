/* Servicios */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Clases */
import { ApiUrl } from '../modelos/ruta-api-rest';
import { Agenda } from '../modelos/agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  /* Se llama el servicio HttpClient */
  constructor(private http:HttpClient) { }

  /* Consulta todos los itinerarios registradas de la tabla agenda */
  findAllAgenda():Promise<Agenda[]>{
    return this.http.get<Agenda[]>(ApiUrl + 'agenda').toPromise();
  }

  /* Consulta todas las barrios registradas de la tabla barrio */
  findByIdAgenda(id_agenda:Number):Promise<Agenda[]>{
    return this.http.get<Agenda[]>(ApiUrl + 'agenda/' + id_agenda).toPromise();
  }

   /* Inserta un dato ala tabla agenda */
   insertAgenda(agenda:Agenda){
    return this.http.post<Agenda>(ApiUrl + 'agenda', agenda);
  }

  /* Borra un dato de la tabla agenda por id */
  deleteByIdBarrio(id_barrio:Number){
    return this.http.delete(ApiUrl + 'barrio/' + id_barrio);
  }
}
