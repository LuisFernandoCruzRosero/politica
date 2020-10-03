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
import { VotanteService } from '../servicios/votante.service';
import { Votante } from '../modelos/votante';

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

  /* Inicializo un arreglo del objeto Votante */
  votante:Votante[] = [];

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
    private mesaServi:MesaService, private liderServi:LiderService, private votanteServi:VotanteService) {}

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
/*
                    for(let i = this.validaciones.INT_NUMBER_0; i < this.barrios.length; i++){
                      for (let j = this.validaciones.INT_NUMBER_0; j < this.comunas.length; j++) {
                        if (this.comunas[j].id_comuna == this.barrios[i].id_comunaB) {
                          this.addBarrioAux({
                            id_barrio:this.barrios[i].id_barrio,
                            nom_barrio:this.barrios[i].nom_barrio,
                            latitud:this.barrios[i].latitud,
                            longitud:this.barrios[i].longitud,
                            zona_roja:this.barrios[i].zona_roja,
                            nom_comuna:this.comunas[j].nom_comuna,
                          });
                        }
                      }
                    }
*/
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

  /*  Funcion Guardar Barrio */
  guardar() {
    /* Validacion de Campos Obligatorios y invalidos */
    if (this.validaciones.validaCampoObligatorio(this.seletedDigitadorAgregar.ced_digitador) == this.validaciones.TRUE) {
      alert('CAMPO CEDULA OBLIGATORIO..');
    } else if (this.validaciones.validacionNumerico(this.seletedDigitadorAgregar.ced_digitador) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO CEDULA INVALIDO: ' + this.seletedDigitadorAgregar.ced_digitador);
    } else if (this.validaciones.validaCampoObligatorio(this.seletedDigitadorAgregar.nom_digitador) == this.validaciones.TRUE) {
      alert('CAMPO NOMBRE OBLIGATORIO..');
    } else if (this.validaciones.validacionNombre(this.seletedDigitadorAgregar.nom_digitador) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO NOMBRE INVALIDO: ' + this.seletedDigitadorAgregar.nom_digitador);
    } else if (this.validaciones.validaCampoObligatorio(this.seletedDigitadorAgregar.usu_digiador) == this.validaciones.TRUE) {
      alert('CAMPO USUARIO OBLIGATORIO..');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedDigitadorAgregar.con_digitador) == this.validaciones.TRUE) {
      alert('CAMPO CONTRASEÑA OBLIGATORIO: ');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedDigitadorAgregar.municipio) == this.validaciones.TRUE) {
      alert('CAMPO MUNICIPIO OBLIGATORIO: ');
    } else if (this.validaciones.validacionNombre(this.seletedDigitadorAgregar.municipio) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO MUNICIPIO INVALIDO: ' + this.seletedDigitadorAgregar.municipio);
    } else if (this.validaciones.validaCampoObligatorio(this.seletedDigitadorAgregar.departamento) == this.validaciones.TRUE) {
      alert('CAMPO DEPARTAMENTO OBLIGATORIO: ');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedDigitadorAgregar.departamento) == this.validaciones.TRUE) {
      alert('CAMPO DEPARTAMENTO INVALIDO: ' + this.seletedDigitadorAgregar.departamento);
    } else if (this.validaciones.validacionNumerico(this.seletedDigitadorAgregar.tel_digitador) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO DEPARTAMENTO INVALIDO: ' + this.seletedDigitadorAgregar.tel_digitador);
    } else {
      /* LLamo al servicio digitador para buscar los digitadores existentes */
      this.digitadorServi.findByIdDigitadorCedula(this.seletedDigitadorAgregar.ced_digitador).then(resultado =>{
        this.digitador = resultado;
        this.votanteServi.findByIdVotanteCedula(this.seletedDigitadorAgregar.ced_digitador).then(resultado =>{
          this.votante = resultado
        },(err:HttpErrorResponse) => {
          if(err.error instanceof Error){
            alert("a ocurrido un errror cliente");
          }else{
            alert("a ocurrido un errror servidor");
          }
        }); 
      },(err:HttpErrorResponse) => {
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    }    
  }
}
