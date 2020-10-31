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
import { DigitadorAux } from '../modelos/digitador-aux';

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

  /* Inicializo un arreglo del objeto Digitador Para la lista sin id */
 digitadorAux:DigitadorAux[] = [];

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

     /* Inicializo el objeto digitador Para formulario Buscar*/
    seletedListarDigitador:DigitadorFindAll = new DigitadorFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
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
    private mesaServi:MesaService, private liderServi:LiderService, private votanteServi:VotanteService) { this.digitadorAux = [] }

  /* Funcion que se llama por defecto es la primera en ejecutarse */
  ngOnInit() {
    /* Se limpia arreglo auxiliar para volver a llenar */
    this.digitadorAux = [];
    /* Consulto los Datos de la tabla usuario */
    this.loginServi.findAllUsuario().then(resultado => {
      /* Asigno los datos de la tabla usuario al arreglo usuario */
      this.usuario = resultado;
      console.log(this.usuario);
      /* Consulto los Datos de la tabla digitador */
      this.loginServi.findAllDigitador().then(resultado => {
        /* Asigno los datos de la tabla digitador al arreglo digitador */
        this.digitador = resultado;
        console.log(this.digitador);
        /* Consulto Los datos de la tabla Comuna */
        this.comunaServi.findAllComuna().then(resultado => {
          /* Asigno al arreglo Comuna todas las existenten en la tabla */
          this.comuna = resultado;
          console.log(this.comuna);
          /* Asigno al arreglo lugar todas las existenten en la tabla */
          this.lugarServi.findAllLugar().then(resultado => {
            /* Asigno al arreglo lugar todas las existenten en la tabla */
            this.lugar = resultado;
            console.log(this.lugar);
            /* Asigno al arreglo barrio todas las existenten en la tabla */
            this.barrioServi.findAllBarrio().then(resultado => {
              /* Asigno al arreglo barrio todas las existenten en la tabla */
              this.barrio = resultado;
              console.log(this.barrio);
               /* Asigno al arreglo lider todas las existenten en la tabla */
              this.liderServi.findAllLider().then(resultado => {
                /* Asigno al arreglo lider todas las existenten en la tabla */
                this.lider = resultado;
                console.log(this.lider);
                /* Asigno al arreglo mesa todas las existenten en la tabla */
                 this.mesaServi.findAllMesa().then(resultado => {
                  /* Asigno al arreglo mesa todas las existenten en la tabla */
                  this.mesa = resultado;
                  console.log(this.mesa);
                  /* consulta la cantidad de digitador que existen en el sistema */
                  this.digitadorServi.findByIdTotalDigitador().subscribe(resultado=>{
                    /* Asigno al arreglo digitador todas las existenten en la tabla */
                    this.totalDigitador = resultado;
                    });

                    for (let i = this.validaciones.INT_NUMBER_0; i < this.digitador.length; i++) {
                      for (let j = this.validaciones.INT_NUMBER_0; j < this.lider.length; j++) {
                        for (let k = this.validaciones.INT_NUMBER_0; k < this.usuario.length; k++) {
                          for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                            for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++) {
                              for (let n = this.validaciones.INT_NUMBER_0; n < this.barrio.length; n++) {
                                for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                                  for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                                    if (this.digitador[i].id_lider == this.lider[j].id_lider) {
                                      if (this.digitador[i].id_usuario == this.usuario[k].id_usuario) {
                                        if (this.digitador[i].id_comunaB == this.comuna[l].id_comuna) {
                                          if (this.digitador[i].id_comunaL == this.comuna[m].id_comuna) {
                                            if (this.digitador[i].id_barrio == this.barrio[n].id_barrio) {
                                              if (this.digitador[i].id_lugar == this.lugar[o].id_lugar) {
                                                if (this.digitador[i].id_mesa == this.mesa[p].id_mesa) {
                                                  console.log('encontro1');
                                                  this.addDigitadorAux({
                                                    id_digitador : this.digitador[i].id_digitador,
                                                    ced_digitador: this.digitador[i].ced_digitador,
                                                    nom_digitador : this.digitador[i].nom_digitador,
                                                    tel_digitador : this.digitador[i].tel_digitador,
                                                    municipio : this.digitador[i].municipio,
                                                    departamento : this.digitador[i].departamento,
                                                    usu_digiador : this.digitador[i].usu_digiador,
                                                    con_digitador : this.digitador[i].con_digitador,
                                                    comuna_barrio : this.comuna[l].nom_comuna,
                                                    nom_barrio : this.barrio[n].nom_barrio,
                                                    comuna_lugar : this.comuna[m].nom_comuna,
                                                    nom_lugar : this.lugar[o].nom_lugar,
                                                    id_tipo_usuario : this.digitador[i].id_tipo_usuario,
                                                    nom_lider : this.lider[j].nom_lider,
                                                    nom_usuario : this.usuario[k].nom_usuario,
                                                    nom_mesa : this.mesa[p].nom_mesa,
                                                    activo : this.digitador[i].activo,
                                                  })
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    console.log(this.digitadorAux)

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
        /* LLamo al servicio votante para buscar los digitadores existentes */
        this.votanteServi.findByIdVotanteCedula(this.seletedDigitadorAgregar.ced_digitador).then(resultado =>{
          this.votante = resultado
          /* LLamo al servicio usuario para buscar los digitadores existentes */
          this.loginServi.findAllUsuarioCedula(this.seletedDigitadorAgregar.ced_digitador).then(resultado =>{
            this.usuario = resultado;
            /* LLamo al servicio lider para buscar los digitadores existentes */
            this.liderServi.findByIdLiderCedula(this.seletedDigitadorAgregar.ced_digitador).then(resultado =>{
              this.lider = resultado
                /* Se valida que el nuevo registro no exista en ninguna tabla existente */
                if (this.digitador.length == this.validaciones.INT_NUMBER_0 && this.votante.length == this.validaciones.INT_NUMBER_0
                    && this.usuario.length == this.validaciones.INT_NUMBER_0 && this.lider.length == this.validaciones.INT_NUMBER_0) {
                      this.digitadorServi.insertDigitador({
                        id_digitador : this.seletedDigitadorAgregar.id_digitador,
                        ced_digitador: this.seletedDigitadorAgregar.ced_digitador,
                        nom_digitador : this.seletedDigitadorAgregar.nom_digitador,
                        tel_digitador : this.seletedDigitadorAgregar.tel_digitador,
                        municipio : this.seletedDigitadorAgregar.municipio,
                        departamento : this.seletedDigitadorAgregar.departamento,
                        usu_digiador : this.seletedDigitadorAgregar.usu_digiador,
                        con_digitador : this.seletedDigitadorAgregar.con_digitador,
                        id_comunaB : this.seletedDigitadorAgregar.id_comunaB,
                        id_barrio : this.seletedDigitadorAgregar.id_barrio,
                        id_comunaL : this.seletedDigitadorAgregar.id_comunaL,
                        id_lugar : this.seletedDigitadorAgregar.id_lugar,
                        id_tipo_usuario : 4,
                        id_lider : this.seletedDigitadorAgregar.id_lider,
                        id_usuario : this.seletedDigitadorAgregar.id_usuario,
                        id_mesa : this.seletedDigitadorAgregar.id_mesa,
                        activo : this.validaciones.TRUE,
                      }).subscribe((resultado) => {
                        alert('Se agrego el digitador..');
                        this.ngOnInit();
                        /* Se limpian los IMPUT */
                        this.seletedDigitadorAgregar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
                        this.seletedDigitadorAgregar.nom_digitador = this.validaciones.STR_LETTER_WITHOUT;
                        this.seletedDigitadorAgregar.usu_digiador = this.validaciones.STR_LETTER_WITHOUT;
                        this.seletedDigitadorAgregar.con_digitador = this.validaciones.STR_LETTER_WITHOUT;
                        this.seletedDigitadorAgregar.municipio = this.validaciones.STR_LETTER_WITHOUT;
                        this.seletedDigitadorAgregar.departamento = this.validaciones.STR_LETTER_WITHOUT;
                        this.seletedDigitadorAgregar.tel_digitador = this.validaciones.STR_LETTER_WITHOUT;
                      });
                } else if (this.digitador.length != this.validaciones.INT_NUMBER_0) {
                  alert("la cedula ya Existe en digitador: " + this.seletedDigitadorAgregar.ced_digitador);
                } else if (this.votante.length != this.validaciones.INT_NUMBER_0) {
                  alert("la cedula ya Existe en votante: " + this.seletedDigitadorAgregar.ced_digitador);
                } else if (this.usuario.length != this.validaciones.INT_NUMBER_0) {
                  alert("la cedula ya Existe en usuario: " + this.seletedDigitadorAgregar.ced_digitador);
                } else if (this.lider.length != this.validaciones.INT_NUMBER_0) {
                  alert("la cedula ya Existe en lider: " + this.seletedDigitadorAgregar.ced_digitador);
                }
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
   /* Agregar Barrio a Arreglo local par aquitar id */
   addDigitadorAux(item:DigitadorAux){
    this.digitadorAux.push(item);
  }

}
