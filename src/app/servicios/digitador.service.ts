/* Servicios */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* Clases */
import { ApiUrl } from '../modelos/ruta-api-rest';
import { DigitadorFindAll } from '../modelos/digitador-find-all';


@Injectable({
  providedIn: 'root'
})
export class DigitadorService {

  /* Se llama el servicio HttpClient */
  constructor(private http:HttpClient) { }

  /* Consulta todas las mesas registradas de la tabla digitador */
  findAllDigitador():Promise<DigitadorFindAll[]>{
    return this.http.get<DigitadorFindAll[]>(ApiUrl + 'digitador').toPromise();
  }

  /* Consulta una de los digitadores registradas de la tabla digitador */
  findByIdDigitadorCedula(ced_digitador:String):Promise<DigitadorFindAll[]>{
    return this.http.get<DigitadorFindAll[]>(ApiUrl + 'digitador/' + ced_digitador).toPromise();
  }

  /* Inserta un dato ala tabla digitador */
  insertDigitador(digitador:DigitadorFindAll){
    return this.http.post<DigitadorFindAll>(ApiUrl + 'digitador', digitador)
  }

  /* Borra un dato de la tabla digitador por id */
  deleteByIdDigitador(id_digitador:Number){
    return this.http.delete(ApiUrl + 'digitador/' + id_digitador);
  }

  /* Actualiza un dato de la tabla digitador por id */
  updateDigitador(digitador:DigitadorFindAll){
    return this.http.put<DigitadorFindAll>(ApiUrl + 'digitador/' + digitador.id_digitador, digitador);
  }

  /* Cuenta el total de todas las digitador */
  findByIdTotalDigitador(){
    return this.http.get<any>(ApiUrl + 'digitadorContar');
  }
}
