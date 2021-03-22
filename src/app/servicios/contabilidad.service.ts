/* Servicios */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



/* Clases */
import { ApiUrl } from '../modelos/ruta-api-rest';
import { Contabilidad } from '../modelos/contabilidad';

@Injectable({
  providedIn: 'root'
})
export class ContabilidadService {

  constructor(private http:HttpClient) { }

   /* Consulta todas las mesas registradas de la tabla contabilidad */
   findAllContabilidad():Promise<Contabilidad[]>{
    return this.http.get<Contabilidad[]>(ApiUrl + 'contabilidad').toPromise();
  }

  /* Consulta una de las Agendas registradas de la tabla Agenda */
  findByIdContabilidad(descripcion:String):Promise<Contabilidad[]>{
    return this.http.get<Contabilidad[]>(ApiUrl + 'contabilidad/' + descripcion).toPromise();
  }

  findAllContabilidadIdentificacion(identificacion:String):Promise<Contabilidad[]>{
    return this.http.get<Contabilidad[]>(ApiUrl + 'contabilidadIdentificacion/' + identificacion).toPromise();
  }

  /* Inserta un dato ala tabla Agenda */
  insertContabilidad(contabilidad:Contabilidad){
    return this.http.post<Contabilidad>(ApiUrl + 'contabilidad', contabilidad)
  }

  /* Borra un dato de la tabla Agenda por id */
  deleteByIdContabilidad(id_contabilidad:Number){
    return this.http.delete(ApiUrl + 'contabilidad/' + id_contabilidad);
  }

  /* Actualiza un dato de la tabla Agenda por id */
  updateContabilidad(contabilidad:Contabilidad){
    return this.http.put<Contabilidad>(ApiUrl + 'contabilidad/' + contabilidad.id_contabilidad, contabilidad);
  }

}
