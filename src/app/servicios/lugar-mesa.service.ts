/* Servicios */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Clases */
import { ApiUrl } from '../modelos/ruta-api-rest';
import { LugarMesa } from '../modelos/lugar-mesa';

@Injectable({
  providedIn: 'root'
})
export class LugarMesaService {

   /* Se llama el servicio HttpClient */
   constructor(private http:HttpClient) { }

   /* Consulta todas las lugar-mesas registradas de la tabla lugar_mesa */
   findAllLugarMesa():Promise<LugarMesa[]>{
     return this.http.get<LugarMesa[]>(ApiUrl + 'lugarmesa').toPromise();
   }

    /*Consulta los lugares de una Mesa*/
   findAllByIdLugarMesa(id_lugar:Number):Promise<LugarMesa[]>{
    return this.http.get<LugarMesa[]>(ApiUrl + 'lugarMesaLugar/' + id_lugar).toPromise();
   }
   /*Consulta una de las LugarMesa*/
   findByIdLugarMesa(id_lugar:Number, id_mesa:Number):Promise<LugarMesa[]>{
    return this.http.get<LugarMesa[]>(ApiUrl + 'lugarmesa/' + id_lugar + '/' + id_mesa).toPromise();
  }

   /* Inserta un dato ala tabla Lugar_Mesa */
   insertLugarMesa(lugarmesa:LugarMesa){
     return this.http.post<LugarMesa>(ApiUrl + 'lugarmesa', lugarmesa)
   }
 
   /* Borra un dato de la tabla lugarmesa por id */
   deleteByIdLugarMesa(id_lugar_mesa:Number){
     return this.http.delete(ApiUrl + 'lugarmesa/' + id_lugar_mesa);
   }
 
   /* Actualiza un dato de la tabla lugarmesa por id */
   updateLugarMesa(lugarmesa:LugarMesa){
     return this.http.put<LugarMesa>(ApiUrl + 'lugarmesa/' + lugarmesa.id_lugar_mesa, lugarmesa);
   }

    /* Cuenta el total de todas los lugarmesa */
  findByIdTotalLugarMesa(){
    return this.http.get<any>(ApiUrl + 'lugarmesaContar');
  } 

}
