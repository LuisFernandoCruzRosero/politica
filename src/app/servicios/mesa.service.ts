/* Servicios */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Clases */
import { Mesa } from '../modelos/mesa';
import { ApiUrl } from '../modelos/ruta-api-rest';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  /* Se llama el servicio HttpClient */
  constructor(private http:HttpClient) { }

  /* Consulta todas las mesas registradas de la tabla mesa */
  findAllMesa():Promise<Mesa[]>{
    return this.http.get<Mesa[]>(ApiUrl + 'mesa').toPromise();
  }

  /* Consulta una de las mesas registradas de la tabla mesa */
  findByIdMesa(nom_mesa:String):Promise<Mesa[]>{
    return this.http.get<Mesa[]>(ApiUrl + 'mesa/' + nom_mesa).toPromise();
  }

  /* Inserta un dato ala tabla Mesa */
  insertMesa(mesa:Mesa){
    return this.http.post<Mesa>(ApiUrl + 'mesa', mesa)
  }

  /* Borra un dato de la tabla Mesa por id */
  deleteByIdMesa(id_mesa:Number){
    return this.http.delete(ApiUrl + 'mesa/' + id_mesa);
  }

  /* Actualiza un dato de la tabla Mesa por id */
  updateMesa(mesa:Mesa){
    return this.http.put<Mesa>(ApiUrl + 'mesa/' + mesa.id_mesa, mesa);
  }

  /* Cuenta el total de todas las mesas */
  findByIdTotalMesa(){
    return this.http.get<any>(ApiUrl + 'mesaContar');
  } 
}
