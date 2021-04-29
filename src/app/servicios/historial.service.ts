import { Injectable } from '@angular/core';
import { Historial } from '../modelos/historial';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../modelos/ruta-api-rest';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(private http:HttpClient) { }

  /* Consulta todas las mesas registradas de la tabla lider */
  findAllHistorial():Promise<Historial[]>{
    return this.http.get<Historial[]>(ApiUrl + 'historial').toPromise();
  }

  /* Consulta una de los lider registradas de la tabla lider */
  findByIdHistorialCedula(ced_candidato:String):Promise<Historial[]>{
    return this.http.get<Historial[]>(ApiUrl + 'historialCedula/' + ced_candidato).toPromise();
  }

  /* Consulta una de los lider registradas de la tabla lider */
  findByIdHistorialNombre(nom_candidato:String):Promise<Historial[]>{
    return this.http.get<Historial[]>(ApiUrl + 'historialNombre/' + nom_candidato).toPromise();
  }

  
  /* Consulta una de los lider registradas de la tabla lider */
  findByIdHistorialFecha(fec_historial:String):Promise<Historial[]>{
    return this.http.get<Historial[]>(ApiUrl + 'historialFecha/' + fec_historial).toPromise();
  }

  /* Inserta un dato ala tabla lider */
  insertHistorial(historial:Historial){
    return this.http.post<Historial>(ApiUrl + 'historial', historial)
  }

  /* Actualiza un dato de la tabla lider por id */
  updateHistorial(historial:Historial){
    return this.http.put<Historial>(ApiUrl + 'historial/' + historial.id_historial, historial);
  }

   /* Borra un dato de la tabla digitador por id */
   deleteByIdHistorial(id_historial:Number){
    return this.http.delete(ApiUrl + 'historial/' + id_historial);
  }
}
