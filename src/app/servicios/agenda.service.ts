/* Servicios */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/* Clases */
import { Agenda } from '../modelos/agenda';
import { ApiUrl } from '../modelos/ruta-api-rest';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

    /* Se llama el servicio HttpClient */
    constructor(private http:HttpClient) { }

    /* Consulta todas las mesas registradas de la tabla agenda */
    findAllAgenda():Promise<Agenda[]>{
      return this.http.get<Agenda[]>(ApiUrl + 'agenda').toPromise();
    }

    /* Consulta una de las Agendas registradas de la tabla Agenda */
    findByIdAgenda(descripcion:String):Promise<Agenda[]>{
      return this.http.get<Agenda[]>(ApiUrl + 'agenda/' + descripcion).toPromise();
    }

    /* Inserta un dato ala tabla Agenda */
    insertAgenda(agenda:Agenda){
      return this.http.post<Agenda>(ApiUrl + 'agenda', agenda)
    }

    /* Borra un dato de la tabla Agenda por id */
    deleteByIdAgenda(id_agenda:Number){
      return this.http.delete(ApiUrl + 'agenda/' + id_agenda);
    }

    /* Actualiza un dato de la tabla Agenda por id */
    updateAgenda(agenda:Agenda){
      return this.http.put<Agenda>(ApiUrl + 'agenda/' + agenda.id_agenda, agenda);
    }

    /* Cuenta el total de todas las Agendas */
    findByIdTotalAgenda(){
      return this.http.get<any>(ApiUrl + 'agendaContar');
    }
}
