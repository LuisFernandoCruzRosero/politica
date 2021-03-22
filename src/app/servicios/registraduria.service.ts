import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Clases */

import { ApiUrl } from '../modelos/ruta-api-rest';
import { Registraduria } from '../modelos/registraduria';

@Injectable({
  providedIn: 'root'
})
export class RegistraduriaService {

  constructor(private http:HttpClient) { }

  /* Consulta una de las Agendas registradas de la tabla Votante */
  findByIdRegistraduria(id_registraduria:Number):Promise<Registraduria[]>{
    return this.http.get<Registraduria[]>(ApiUrl + 'registraduria/' + id_registraduria).toPromise();
  }

   /* Consulta una de las Agendas registradas de la tabla Votante */
 findByIdRegistraduriaLugar(id_lugar:Number):Promise<Registraduria[]>{
  return this.http.get<Registraduria[]>(ApiUrl + 'registraduriaLugar/' + id_lugar).toPromise();
}

  /* Consulta una de las Agendas registradas de la tabla Votante */
  findAllRegistraduria():Promise<Registraduria[]>{
    return this.http.get<Registraduria[]>(ApiUrl + 'registraduria').toPromise();
  }

  /* Inserta un dato ala tabla Votante */
 insertRegistraduria(registraduria:Registraduria){
  return this.http.post<Registraduria>(ApiUrl + 'registraduria', registraduria)
}

updateRegistraduria(registraduria:Registraduria){
  return this.http.put<Registraduria>(ApiUrl + 'registraduria/' + registraduria.id_registraduria, registraduria);
}

 /* Borra un dato de la tabla digitador por id */
 deleteByIdRegistraduria(id_registraduria:Number){
  return this.http.delete(ApiUrl + 'registraduria/' + id_registraduria);
}

}
