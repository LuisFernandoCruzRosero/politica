/* Servicios */
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DigitadorService } from '../servicios/digitador.service';
import { ComunaService } from '../servicios/comuna.service';
import { LugarService } from '../servicios/lugar.service';
import { BarrioService } from '../servicios/barrio.service';
import { MesaService } from '../servicios/mesa.service';
import { LiderService } from '../servicios/lider.service';

/* Modelos */
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { Token } from '../modelos/token';
import { Validaciones } from '../modelos/validaciones';
import { Comuna } from '../modelos/comuna';
import { Lugar } from '../modelos/lugar';
import { Barrio } from '../modelos/barrio';
import { Mesa } from '../modelos/mesa';
import { Lider } from '../modelos/lider';

@Component({
  selector: 'app-digitador',
  templateUrl: './digitador.component.html',
  styleUrls: ['./digitador.component.css']
})
export class DigitadorComponent implements OnInit {

  /* Llamo ala clase validaciones */
  validaciones = new Validaciones();

  /* Total de digitador Ingresadas */
  totalDigitador:any = 0;

  /* Inicializo un arreglo del objeto digitador */
  digitador:DigitadorFindAll[] = [];

  /* Inicializo un arreglo del objeto Comuna */
  comuna:Comuna[] = [];

  /* Inicializo un arreglo del objeto Lugar */
  lugar:Lugar[] = [];

  /* Inicializo un arreglo del objeto Barrio */
  barrio:Barrio[] = [];

  /* Inicializo un arreglo del objeto Mesa */
  mesa:Mesa[] = [];

  /* Inicializo un arreglo del objeto lider */
  lider:Lider[] = [];

  /* Inicializo un arreglo del objeto digitador Para la busqueda*/
  digitadorBuscar:DigitadorFindAll[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];

  /* Inicializo el objeto digitador Para formulario Agregar*/
  seletedDigitadorAgregar:DigitadorFindAll = new DigitadorFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, 
    this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Inicializo el objeto digitador Para formulario Actualizar*/
  seletedDigitadorActualizar:DigitadorFindAll = new DigitadorFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, 
    this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Inicializo el objeto digitador Para formulario Buscar*/
  seletedDigitadorBuscar:DigitadorFindAll = new DigitadorFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, 
    this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Verificar la Ayutenticidad */
  encontrado:Boolean = this.validaciones.FALSE;

  /* Para bloquear desdel ts la viste del HTML dependiendo el tipo de usuario */
  vista:Number;

  /* Token de verificacion de logueo */
  token:Token;

  /* Se llama a login service para verificar la autenticidad de usuario */
  /* Se llama a router para poder navegar del ts a un html deacuerdo ala autenticidad */
  /* Se llama a Mesa service para poder realizar la funciones del CRUD del modulo de las mesas */

  constructor(private loginServi:LoginService, private route:Router, private digitadorServi:DigitadorService, 
    private comunaServi:ComunaService, private lugarServi:LugarService, private barrioServi:BarrioService, 
    private mesaServi:MesaService, private liderServi:LiderService) {}

  /* Funcion que se llama por defecto es la primera en ejecutarse */
  ngOnInit() {
    /* Consulto los Datos de la tabla usuario */
    this.loginServi.findAllUsuario().then(resultado => {
      /* Asigno los datos de la tabla usuario al arreglo usuario */
      this.usuario = resultado;
      /* Consulto los Datos de la tabla digitador */
      this.loginServi.findAllDigitador().then(resultado => {
        /* Asigno los datos de la tabla digitador al arreglo digitador */
        this.digitador = resultado;
        /* Consulto Los datos de la tabla Comuna */
        this.comunaServi.findAllComuna().then(resultado => {
          /* Asigno al arreglo Comuna todas las existenten en la tabla */
          this.comuna = resultado;
          /* Asigno al arreglo lugar todas las existenten en la tabla */
          this.lugarServi.findAllLugar().then(resultado => {
            /* Asigno al arreglo lugar todas las existenten en la tabla */
            this.lugar = resultado;
            /* Asigno al arreglo barrio todas las existenten en la tabla */
            this.barrioServi.findAllBarrio().then(resultado => {
              /* Asigno al arreglo barrio todas las existenten en la tabla */
              this.barrio = resultado;
               /* Asigno al arreglo lider todas las existenten en la tabla */
              this.liderServi.findAllLider().then(resultado => {
                /* Asigno al arreglo lider todas las existenten en la tabla */
                this.lider = resultado;
                /* Asigno al arreglo mesa todas las existenten en la tabla */
                 this.mesaServi.findAllMesa().then(resultado => {
                  /* Asigno al arreglo mesa todas las existenten en la tabla */
                  this.mesa = resultado;
                  /* consulta la cantidad de digitador que existen en el sistema */
                  this.digitadorServi.findByIdTotalDigitador().subscribe(resultado=>{
                    /* Asigno al arreglo digitador todas las existenten en la tabla */
                    this.totalDigitador = resultado;
                    });
                    try {
                      /* Consulto Tokent de Autenticidad */
                      this.token = this.loginServi.findAllToken();
                      /* Agrego ala variable vista el valor de tipo de usuario para bloquear permisos */
                      this.vista = this.token.tipo_usuario;
                      /* Busco el usuario logueado */
                      for (let i = this.validaciones.INT_NUMBER_0; i < this.usuario.length; i++) {
                        /* Se pregunta si el usuario logueado es de tipo 1 */
                        if (this.usuario[i].login == this.token.user_usu && this.token.tipo_usuario == this.validaciones.INT_NUMBER_1) {
                        /* Si la encuentro cambio el estado a true */
                        this.encontrado = this.validaciones.TRUE;
                        }
                      }
                      /* Busco el digitador logueado */
                      for (let i = this.validaciones.INT_NUMBER_0; i< this.digitador.length; i++) {
                        /* Se pregunta si el usuario logueado es de tipo 4 */
                        if (this.digitador[i].usu_digiador == this.token.user_usu && this.token.tipo_usuario == this.validaciones.INT_NUMBER_4) {
                        /* Si la encuentro cambio el estado a true */
                        this.encontrado = this.validaciones.TRUE;
                        }
                      }
                    } catch (e) {
                      /* Si no encuentra el usuario */
                      if(this.encontrado == this.validaciones.FALSE){
                      /* Navega al login */
                      //this.route.navigate(['/']);
                      }
                    }
                }, (err:HttpErrorResponse) => {
                  if (err.error instanceof Error) {
                    alert("a ocurrido un errror cliente");
                  } else {
                    alert("a ocurrido un errror servidor");
                  }
                });
                }, (err:HttpErrorResponse) => {
                  if (err.error instanceof Error) {
                    alert("a ocurrido un errror cliente");
                  } else {
                    alert("a ocurrido un errror servidor");
                  }
                });
              }, (err:HttpErrorResponse) => {
                if (err.error instanceof Error) {
                  alert("a ocurrido un errror cliente");
                } else {
                  alert("a ocurrido un errror servidor");
                }
              });
            }, (err:HttpErrorResponse) => {
              if (err.error instanceof Error) {
                alert("a ocurrido un errror cliente");
              } else {
                alert("a ocurrido un errror servidor");
              }
            });
          }, (err:HttpErrorResponse) => {
            if (err.error instanceof Error) {
              alert("a ocurrido un errror cliente");
            } else {
              alert("a ocurrido un errror servidor");
            }
          });
        }, (err:HttpErrorResponse) => {
          if (err.error instanceof Error) {
            alert("a ocurrido un errror cliente");
          } else {
            alert("a ocurrido un errror servidor");
          }
        });
      }, (err:HttpErrorResponse) => {
        if (err.error instanceof Error) {
          alert("a ocurrido un errror cliente");
        } else {
          alert("a ocurrido un errror servidor");
        }
      });
  }

}
