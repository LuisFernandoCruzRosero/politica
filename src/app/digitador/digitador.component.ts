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
import { LugarMesa } from '../modelos/lugar-mesa';
import { LugarMesaService } from '../servicios/lugar-mesa.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  comunaLAux:Comuna[] = [];
  comunaBAux:Comuna[] = [];

  /* Inicializo un arreglo del objeto Lugar */
  lugar:Lugar[] = [];
  lugarAux:Lugar[] = [];

  /* Mesa Lugar */
  lugarMesa:LugarMesa[] = [];
  lugarMesaAux:LugarMesa[] = [];

  /* Inicializo un arreglo del objeto Barrio */
  barrio:Barrio[] = [];
  barrioAux:Barrio[] = [];

  /* Inicializo un arreglo del objeto Mesa */
  mesa:Mesa[] = [];
  mesaAux:Mesa[] = [];

  /* Inicializo un arreglo del objeto lider */
  lider:Lider[] = [];
  liderAux:Lider[] = [];

  /* Inicializo un arreglo del objeto digitador Para la busqueda*/
  digitadorBuscar:DigitadorFindAll[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];
  /* Inicializo un arreglo del objeto usuario para los coordinadores */
  coordinador:UsuarioFindAll[] = [];
  coordinadorAux:UsuarioFindAll[] = [];

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

  /* Inicializo el objeto Lugar Para formulario Buscar*/
  seletedLugarBuscar:Lugar = new Lugar(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.NULL);

  /* Inicializo el objeto barrio Para formulario Buscar*/
  seletedBarrioBuscar:Barrio = new Barrio(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.NULL);

  /* Inicializo el objeto Lider Para formulario Buscar*/
  seletedLiderBuscar:Lider = new Lider(this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,this.validaciones.NULL,this.validaciones.NULL,
    this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT);
  
    /* Inicializo el objeto Coordinador Para formulario Buscar*/
  seletedCoordinadorBuscar:UsuarioFindAll = new UsuarioFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,
    this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT);
  
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
    private mesaServi:MesaService, private liderServi:LiderService, private votanteServi:VotanteService, 
    private lugarmesaService:LugarMesaService) { this.digitadorAux = [] }

  /* Funcion que se llama por defecto es la primera en ejecutarse */
  ngOnInit() {
    /* se quema el departamento y el municipio */
    this.seletedDigitadorAgregar.departamento = 'NARIÑO';
    this.seletedDigitadorAgregar.municipio = 'TUMACO';
    /* Se limpia arreglo auxiliar para volver a llenar */
    this.digitadorAux = [];
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
          this.comunaBAux = this.comuna;
          this.comunaLAux = this.comuna;
          /* Asigno al arreglo lugar todas las existenten en la tabla */
          this.lugarServi.findAllLugar().then(resultado => {
            /* Asigno al arreglo lugar todas las existenten en la tabla */
            this.lugar = resultado;
            this.lugarAux = this.lugar;
            /* Asigno al arreglo barrio todas las existenten en la tabla */
            this.barrioServi.findAllBarrio().then(resultado => {
              /* Asigno al arreglo barrio todas las existenten en la tabla */
              this.barrio = resultado;
              this.barrioAux = this.barrio;
               /* Asigno al arreglo lider todas las existenten en la tabla */
              this.liderServi.findAllLider().then(resultado => {
                /* Asigno al arreglo lider todas las existenten en la tabla */
                this.lider = resultado;
                this.liderAux = this.lider;
                /* Asigno al arreglo mesa todas las existenten en la tabla */
                 this.mesaServi.findAllMesa().then(resultado => {
                  /* Asigno al arreglo mesa todas las existenten en la tabla */
                  this.mesa = resultado;
                  this.mesaAux = this.mesa;
                  /* asigno el arreglo coordinador todos los datos de la tabla usuario que son coordinadores */
                  this.loginServi.findAllUsuarioCoordinador().then(resultado=>{
                    this.coordinador = resultado;
                    this.coordinadorAux = this.coordinador;
                    /* consulta la cantidad de digitador que existen en el sistema */
                     this.digitadorServi.findByIdTotalDigitador().subscribe(resultado=>{
                    /* Asigno al arreglo digitador todas las existenten en la tabla */
                    this.totalDigitador = resultado;
                    });                  

                    for (let i = this.validaciones.INT_NUMBER_0; i < this.digitador.length; i++) {
                      for (let j = this.validaciones.INT_NUMBER_0; j < this.lider.length; j++) {
                        for (let k = this.validaciones.INT_NUMBER_0; k < this.coordinador.length; k++) {
                          for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                            for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++) {
                              for (let n = this.validaciones.INT_NUMBER_0; n < this.barrio.length; n++) {
                                for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                                  for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                                    if (this.digitador[i].id_lider == this.lider[j].id_lider) {
                                      if (this.digitador[i].id_usuario == this.coordinador[k].id_usuario) {
                                        if (this.digitador[i].id_comunaB == this.comuna[l].id_comuna) {
                                          if (this.digitador[i].id_comunaL == this.comuna[m].id_comuna) {
                                            if (this.digitador[i].id_barrio == this.barrio[n].id_barrio) {
                                              if (this.digitador[i].id_lugar == this.lugar[o].id_lugar) {
                                                if (this.digitador[i].id_mesa == this.mesa[p].id_mesa) {
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
                                                    nom_usuario : this.coordinador[k].nom_usuario,
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
      alert('CAMPO USUARIO OBLIGATORIO..');
    } else if (this.validaciones.validacionNombre(this.seletedDigitadorAgregar.municipio) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO MUNICIPIO INVALIDO: ' + this.seletedDigitadorAgregar.municipio);
    } else if (this.validaciones.validaCampoObligatorio(this.seletedDigitadorAgregar.departamento) == this.validaciones.TRUE) {
      alert('CAMPO DEPARTAMENTO OBLIGATORIO: ');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedDigitadorAgregar.tel_digitador) == this.validaciones.TRUE) {
      alert('CAMPO TELEFONO OBLIGATORIO: ' + this.seletedDigitadorAgregar.tel_digitador);
    } else if (this.validaciones.validacionNumerico(this.seletedDigitadorAgregar.tel_digitador) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO TELEFONO INVALIDO: ' + this.seletedDigitadorAgregar.tel_digitador);
    } else if (this.validaciones.validaNull(this.seletedDigitadorAgregar.id_comunaB) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO COMUNA BARRIO OBLIGATORIO: ' + this.seletedDigitadorAgregar.id_comunaB);
    } else if (this.validaciones.validaNull(this.seletedDigitadorAgregar.id_barrio) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO BARRIO OBLIGATORIO: ' + this.seletedDigitadorAgregar.id_barrio);
    } else if (this.validaciones.validaNull(this.seletedDigitadorAgregar.id_comunaL) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO COMUNA LUGAR OBLIGATORIO: ' + this.seletedDigitadorAgregar.id_comunaL);
    } else if (this.validaciones.validaNull(this.seletedDigitadorAgregar.id_lugar) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO LUGAR OBLIGATORIO: ' + this.seletedDigitadorAgregar.id_lugar);
    } else if (this.validaciones.validaNull(this.seletedDigitadorAgregar.id_lider) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO Lider OBLIGATORIO: ' + this.seletedDigitadorAgregar.id_lider);
    } else if (this.validaciones.validaNull(this.seletedDigitadorAgregar.id_lider) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO COORDINADOR OBLIGATORIO: ' + this.seletedDigitadorAgregar.id_usuario);
    } else if (this.validaciones.validaNull(this.seletedDigitadorAgregar.id_mesa) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO MESA OBLIGATORIO: ' + this.seletedDigitadorAgregar.id_mesa);
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
              this.lider = resultado;
                /* Se valida que el nuevo registro no exista en ninguna tabla existente */
                if (this.digitador.length == this.validaciones.INT_NUMBER_0 && this.votante.length== this.validaciones.INT_NUMBER_0
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
                        this.limpiar();
                      },(err:HttpErrorResponse)=>{
                        if(err.error instanceof Error){
                          alert("a ocurrido un errror cliente");
                        }else{
                          alert("a ocurrido un errror servidor");
                        }
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

  SelectComunaBAgregar(id_comunaB:Number){
    this.barrioAux = [];
    let j = 0;
    for(let i = 0; i < this.barrio.length; i++){
      if(id_comunaB == this.barrio[i].id_comunaB){
        this.barrioAux[j] = this.barrio[i];
        j++;
      }
    }
  }

  SelectBarrioAgregar(id_barrio:Number){
    for(let i = 0; i < this.barrio.length; i++){
      if(id_barrio == this.barrio[i].id_barrio){
        this.seletedDigitadorAgregar.id_comunaB = this.barrio[i].id_comunaB;
      }
    }
  }

  SelectComunaLAgregar(id_comunaL:Number){
    this.lugarAux = [];
    let j = 0;
    for(let i = 0; i < this.lugar.length; i++){
      if(id_comunaL == this.lugar[i].id_comunaL){
        this.lugarAux[j] = this.lugar[i];
        j++;
      }
    }
  }

  SelectLugarAgregar(id_lugar:Number){
    let l = 0;
    this.lugarMesa = [];
    this.mesaAux = [];
    this.lugarMesaAux = [];
    this.lugarmesaService.findAllLugarMesa().then(resultado =>{
      this.lugarMesa = resultado;
      for(let i = 0; i < this.lugar.length; i++){
        if(id_lugar == this.lugar[i].id_lugar){
          this.seletedDigitadorAgregar.id_comunaL = this.lugar[i].id_comunaL;
        }
      }
      for (let j = 0; j < this.lugarMesa.length;j++) {
        if (this.lugarMesa[j].id_lugar == this.seletedDigitadorAgregar.id_lugar) {
          this.lugarMesaAux[l] = this.lugarMesa[j];
           l++;
        }
      }
      let h = 0;
      for (let k = 0; k < this.lugarMesaAux.length ;k++) {
       for (let m = 0; m < this.mesa.length; m++) {
          if (this.mesa[m].id_mesa == this.lugarMesaAux[k].id_mesa) {
            this.mesaAux[h] = this.mesa[m];
            h++;
          }
       }
      }
    });
  }

  SelectLiderAgregar(id_lider:Number) {
    for(let i = 0; i < this.lider.length; i++){
      if(id_lider == this.lider[i].id_lider){
        this.seletedDigitadorAgregar.id_usuario = this.lider[i].id_usuario;
      }
    }
  }

  SelectCoordinadorAgregar(id_coordinador:Number) {
    this.liderAux = [];
    let j = 0;
    for(let i = 0; i < this.lider.length; i++){
      if(id_coordinador == this.lider[i].id_usuario){
        this.liderAux[j] = this.lider[i];
        j++;
      }
    }
  }

  selectLugarBuscar(id_lugar:Number) {
    this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
    this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
    this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
    this.seletedDigitadorBuscar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedLugarBuscar.id_lugar = id_lugar;
    this.seletedDigitadorBuscar.id_digitador = this.validaciones.NULL;
  }

  selectBarriorBuscar(id_barrio:Number) {
    this.seletedDigitadorBuscar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
    this.seletedBarrioBuscar.id_barrio = id_barrio;
    this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
    this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
    this.seletedDigitadorBuscar.id_digitador = this.validaciones.NULL;
  }

  selectLiderBuscar(id_lider:Number) { 
    
    this.seletedDigitadorBuscar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
    this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
    this.seletedLiderBuscar.id_lider = id_lider;
    this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
    this.seletedDigitadorBuscar.id_digitador = this.validaciones.NULL;
  }

  selectCoordinadorBuscar(id_coordinador:Number) {
    this.seletedDigitadorBuscar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
    this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
    this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
    this.seletedCoordinadorBuscar.id_usuario = id_coordinador;
    this.seletedDigitadorBuscar.id_digitador = this.validaciones.NULL;
  }

  selectDigitadorBuscar (id_digitador:Number) {
    this.seletedDigitadorBuscar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
    this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
    this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
    this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
    this.seletedDigitadorBuscar.id_digitador = id_digitador;
  }

  buscar() {
    this.digitadorAux = [];
    if(this.seletedDigitadorBuscar.id_digitador != this.validaciones.NULL){
      this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
      this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
      this.seletedDigitadorBuscar.id_usuario = this.validaciones.NULL;
      this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
      this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
      this.digitadorServi.findByIdDigitador(this.seletedDigitadorBuscar.id_digitador).then(resultado=>{
        this.digitador = resultado;
        if ( this.digitador != this.validaciones.NULL) {
          for (let i = this.validaciones.INT_NUMBER_0; i < this.digitador.length; i++) {
            for (let j = this.validaciones.INT_NUMBER_0; j < this.lider.length; j++) {
              for (let k = this.validaciones.INT_NUMBER_0; k < this.coordinador.length; k++) {
                for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                  for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++) {
                    for (let n = this.validaciones.INT_NUMBER_0; n < this.barrio.length; n++) {
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          if (this.digitador[i].id_lider == this.lider[j].id_lider) {
                            if (this.digitador[i].id_usuario == this.coordinador[k].id_usuario) {
                              if (this.digitador[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.digitador[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.digitador[i].id_barrio == this.barrio[n].id_barrio) {
                                    if (this.digitador[i].id_lugar == this.lugar[o].id_lugar) {
                                      if (this.digitador[i].id_mesa == this.mesa[p].id_mesa) {
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
                                          nom_usuario : this.coordinador[k].nom_usuario,
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
        } else if(this.digitadorAux.length == this.validaciones.INT_NUMBER_0){
          alert('nombre: ' + this.seletedDigitadorBuscar.nom_digitador + ' No Existe..');
        }

      },(err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    }

    if(this.seletedDigitadorBuscar.ced_digitador != this.validaciones.STR_LETTER_WITHOUT){
      this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
      this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
      this.seletedDigitadorBuscar.id_usuario = this.validaciones.NULL;
      this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
      this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
      this.digitadorServi.findByIdDigitadorCedula(this.seletedDigitadorBuscar.ced_digitador).then(resultado=>{
        this.digitador = resultado;
        if ( this.digitador != this.validaciones.NULL) {
          for (let i = this.validaciones.INT_NUMBER_0; i < this.digitador.length; i++) {
            for (let j = this.validaciones.INT_NUMBER_0; j < this.lider.length; j++) {
              for (let k = this.validaciones.INT_NUMBER_0; k < this.coordinador.length; k++) {
                for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                  for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++) {
                    for (let n = this.validaciones.INT_NUMBER_0; n < this.barrio.length; n++) {
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          if (this.digitador[i].id_lider == this.lider[j].id_lider) {
                            if (this.digitador[i].id_usuario == this.coordinador[k].id_usuario) {
                              if (this.digitador[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.digitador[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.digitador[i].id_barrio == this.barrio[n].id_barrio) {
                                    if (this.digitador[i].id_lugar == this.lugar[o].id_lugar) {
                                      if (this.digitador[i].id_mesa == this.mesa[p].id_mesa) {
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
                                          nom_usuario : this.coordinador[k].nom_usuario,
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
        } else if(this.digitadorAux.length == this.validaciones.INT_NUMBER_0){
          alert('Cedula: ' + this.seletedDigitadorBuscar.ced_digitador + ' No Existe..');
        }

      },(err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    }

    if(this.seletedLugarBuscar.id_lugar != this.validaciones.NULL) {
      this.seletedDigitadorBuscar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
      this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
      this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
      this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
      this.digitadorServi.findByIdDigitadorLugar(this.seletedLugarBuscar.id_lugar).then(resultado=>{
        this.digitador = resultado;
        for (let i = this.validaciones.INT_NUMBER_0; i < this.digitador.length; i++) {
          for (let j = this.validaciones.INT_NUMBER_0; j < this.lider.length; j++) {
            for (let k = this.validaciones.INT_NUMBER_0; k < this.coordinador.length; k++) {
              for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++) {
                  for (let n = this.validaciones.INT_NUMBER_0; n < this.barrio.length; n++) {
                    for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                      for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                        if (this.digitador[i].id_lider == this.lider[j].id_lider) {
                          if (this.digitador[i].id_usuario == this.coordinador[k].id_usuario) {
                            if (this.digitador[i].id_comunaB == this.comuna[l].id_comuna) {
                              if (this.digitador[i].id_comunaL == this.comuna[m].id_comuna) {
                                if (this.digitador[i].id_barrio == this.barrio[n].id_barrio) {
                                  if (this.digitador[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.digitador[i].id_mesa == this.mesa[p].id_mesa) {
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
                                        nom_usuario : this.coordinador[k].nom_usuario,
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

        if(this.digitadorAux.length == this.validaciones.INT_NUMBER_0){
          alert('En este Lugar: ' + this.seletedLugarBuscar.nom_lugar + ' No Se a Registrado ningun digitador..');
        }
      },(err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    }

    if(this.seletedBarrioBuscar.id_barrio != this.validaciones.NULL) {
      this.seletedDigitadorBuscar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
      this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
      this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
      this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
      this.digitadorServi.findByIdDigitadorBarrio(this.seletedBarrioBuscar.id_barrio).then(resultado=>{
        this.digitador = resultado;
        for (let i = this.validaciones.INT_NUMBER_0; i < this.digitador.length; i++) {
          for (let j = this.validaciones.INT_NUMBER_0; j < this.lider.length; j++) {
            for (let k = this.validaciones.INT_NUMBER_0; k < this.coordinador.length; k++) {
              for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++) {
                  for (let n = this.validaciones.INT_NUMBER_0; n < this.barrio.length; n++) {
                    for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                      for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                        if (this.digitador[i].id_lider == this.lider[j].id_lider) {
                          if (this.digitador[i].id_usuario == this.coordinador[k].id_usuario) {
                            if (this.digitador[i].id_comunaB == this.comuna[l].id_comuna) {
                              if (this.digitador[i].id_comunaL == this.comuna[m].id_comuna) {
                                if (this.digitador[i].id_barrio == this.barrio[n].id_barrio) {
                                  if (this.digitador[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.digitador[i].id_mesa == this.mesa[p].id_mesa) {
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
                                        nom_usuario : this.coordinador[k].nom_usuario,
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

        if(this.digitadorAux.length == this.validaciones.INT_NUMBER_0){
          alert('En este Barrio: ' + this.seletedBarrioBuscar.nom_barrio + ' No Se a Registrado ningun digitador..');
        }
      },(err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    }

    if(this.seletedCoordinadorBuscar.id_usuario != this.validaciones.NULL) {
      this.seletedDigitadorBuscar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
      this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
      this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
      this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
      this.digitadorServi.findByIdDigitadorCoordinador(this.seletedCoordinadorBuscar.id_usuario).then(resultado=>{
        this.digitador = resultado;
        for (let i = this.validaciones.INT_NUMBER_0; i < this.digitador.length; i++) {
          for (let j = this.validaciones.INT_NUMBER_0; j < this.lider.length; j++) {
            for (let k = this.validaciones.INT_NUMBER_0; k < this.coordinador.length; k++) {
              for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++) {
                  for (let n = this.validaciones.INT_NUMBER_0; n < this.barrio.length; n++) {
                    for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                      for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                        if (this.digitador[i].id_lider == this.lider[j].id_lider) {
                          if (this.digitador[i].id_usuario == this.coordinador[k].id_usuario) {
                            if (this.digitador[i].id_comunaB == this.comuna[l].id_comuna) {
                              if (this.digitador[i].id_comunaL == this.comuna[m].id_comuna) {
                                if (this.digitador[i].id_barrio == this.barrio[n].id_barrio) {
                                  if (this.digitador[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.digitador[i].id_mesa == this.mesa[p].id_mesa) {
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
                                        nom_usuario : this.coordinador[k].nom_usuario,
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

        if(this.digitadorAux.length == this.validaciones.INT_NUMBER_0){
          alert('El Coordinador: ' + this.seletedCoordinadorBuscar.nom_usuario + ' No Tiene Registrado ningun digitador..');
        }
      },(err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    }

    if(this.seletedLiderBuscar.id_lider != this.validaciones.NULL) {
      this.seletedDigitadorBuscar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
      this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
      this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
      this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
      this.digitadorServi.findByIdDigitadorLider(this.seletedLiderBuscar.id_lider).then(resultado=>{
        this.digitador = resultado;
        for (let i = this.validaciones.INT_NUMBER_0; i < this.digitador.length; i++) {
          for (let j = this.validaciones.INT_NUMBER_0; j < this.lider.length; j++) {
            for (let k = this.validaciones.INT_NUMBER_0; k < this.coordinador.length; k++) {
              for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++) {
                  for (let n = this.validaciones.INT_NUMBER_0; n < this.barrio.length; n++) {
                    for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                      for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                        if (this.digitador[i].id_lider == this.lider[j].id_lider) {
                          if (this.digitador[i].id_usuario == this.coordinador[k].id_usuario) {
                            if (this.digitador[i].id_comunaB == this.comuna[l].id_comuna) {
                              if (this.digitador[i].id_comunaL == this.comuna[m].id_comuna) {
                                if (this.digitador[i].id_barrio == this.barrio[n].id_barrio) {
                                  if (this.digitador[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.digitador[i].id_mesa == this.mesa[p].id_mesa) {
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
                                        nom_usuario : this.coordinador[k].nom_usuario,
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

        if(this.digitadorAux.length == this.validaciones.INT_NUMBER_0){
          alert('El Lider: ' + this.seletedLiderBuscar.nom_lider + ' No Tiene Registrado ningun digitador..');
        }
      },(err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    }
  }

  listar() {
    this.limpiar();
    this.ngOnInit();
  }

  limpiar() {
    /* Se limpian los imput de Buscar */
    this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
    this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
    this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
    this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
    this.seletedDigitadorBuscar.ced_digitador =this.validaciones.STR_LETTER_WITHOUT;
    this.seletedDigitadorBuscar.id_digitador = this.validaciones.NULL;
    /* selimpian los imput de Agregar  */
    this.seletedDigitadorAgregar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedDigitadorAgregar.nom_digitador = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedDigitadorAgregar.usu_digiador = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedDigitadorAgregar.con_digitador = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedDigitadorAgregar.municipio = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedDigitadorAgregar.departamento = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedDigitadorAgregar.tel_digitador = this.validaciones.STR_LETTER_WITHOUT;
  }

  /* Funcion que elimina lo seleccionado en base de datos */
  eliminar(digitador:DigitadorFindAll) {
    /* dialogo de confirmacion de eliminar los datos */
    if(confirm('estas seguro de querer eliminarlo id_digitador: ' + digitador.ced_digitador + ' nombre digitador: ' + digitador.nom_digitador)){
      /* se llama el servicio mesa la funcion eliminar */
      this.digitadorServi.deleteByIdDigitador(digitador.id_digitador).subscribe((modificado) =>{
        /* Se da respuesta Exitosa del servidor */
        alert('Registro Eliminado Exito');
        /* se llama la funcion inicial para que recargue la pagina */
        this.ngOnInit();
      },(err:HttpErrorResponse) => {
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    }
  }

  actualizar(item:DigitadorFindAll){
    /* llena el objeto de comuna para actualizar */
    for(let i = 0; i < this.digitador.length; i++) {
      if (this.digitador[i].id_digitador == item.id_digitador) {
        this.seletedDigitadorActualizar = this.digitador[i];
      }
    }
  }

  SelectComunaLActualizar(id_comunaL:number) {
        this.lugarAux = [];
        let j = 0;
        for(let i = 0; i < this.lugar.length; i++){
          if(id_comunaL == this.lugar[i].id_comunaL){
            this.lugarAux[j] = this.lugar[i];
            j++;
          }
        }
  }

  SelectComunaBActualizar(id_comunaB:Number) {
    this.barrioAux = [];
    let j = 0;
    for(let i = 0; i < this.barrio.length; i++){
      if(id_comunaB == this.barrio[i].id_comunaB){
        this.barrioAux[j] = this.barrio[i];
        j++;
      }
    }
  }

  SelectLugarActualizar(id_lugar:Number){
    let l = 0;
    this.lugarMesa = [];
    this.mesaAux = [];
    this.lugarMesaAux = [];
    this.lugarmesaService.findAllLugarMesa().then(resultado =>{
      this.lugarMesa = resultado;
      for(let i = 0; i < this.lugar.length; i++){
        if(id_lugar == this.lugar[i].id_lugar){
          this.seletedDigitadorActualizar.id_comunaL = this.lugar[i].id_comunaL;
        }
      }
      for (let j = 0; j < this.lugarMesa.length;j++) {
        if (this.lugarMesa[j].id_lugar == this.seletedDigitadorActualizar.id_lugar) {
          this.lugarMesaAux[l] = this.lugarMesa[j];
          l++;
        }
      }
      let h = 0;
      for (let k = 0; k < this.lugarMesaAux.length ;k++) {
      for (let m = 0; m < this.mesa.length; m++) {
          if (this.mesa[m].id_mesa == this.lugarMesaAux[k].id_mesa) {
            this.mesaAux[h] = this.mesa[m];
            h++;
          }
      }
      }
    });
  }

  SelectCoordinadorActualizar(id_coordinador:Number){
    this.liderAux = [];
    let j = 0;
    for(let i = 0; i < this.lider.length; i++){
      if(id_coordinador == this.lider[i].id_usuario){
        this.liderAux[j] = this.lider[i];
        j++;
      }
    }
  }

  SelectLiderActualizar(id_lider:Number){
    for(let i = 0; i < this.lider.length; i++){
      if(id_lider == this.lider[i].id_lider){
        this.seletedDigitadorActualizar.id_usuario = this.lider[i].id_usuario;
      }
    }
  }

  SelectBarrioActualizar(id_barrio:Number){
    for(let i = 0; i < this.barrio.length; i++){
      if(id_barrio == this.barrio[i].id_barrio){
        this.seletedDigitadorActualizar.id_comunaB = this.barrio[i].id_comunaB;
      }
    }
  }


  actualizacion() {
    /* Validacion de campos Obligatorios */
    if (this.validaciones.validaCampoObligatorio(
      this.seletedDigitadorActualizar.ced_digitador) == this.validaciones.TRUE) {
      alert('CEDULA Obligatoria..');
    } else if (this.validaciones.validaCampoObligatorio(
      this.seletedDigitadorActualizar.nom_digitador) == this.validaciones.TRUE) {
      alert('NOMBRE obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedDigitadorActualizar.id_comunaL) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('COMUNA DE VOTACION obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedDigitadorActualizar.id_lugar) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('LUGAR DE VOTACION obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedDigitadorActualizar.id_comunaB) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('COMUNA BARRIO obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedDigitadorActualizar.id_barrio) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('BARRIO obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedDigitadorActualizar.id_lider) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('LIDER obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedDigitadorActualizar.id_usuario) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('COORDINADOR obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedDigitadorActualizar.id_mesa) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('MESA obligatotio..');
    } else if (this.validaciones.validaCampoObligatorio(
      this.seletedDigitadorActualizar.tel_digitador) == this.validaciones.TRUE) {
      alert('TELEFONO obligatotio..');
    }

    /* Validaciones de Rangos */
    else if (this.validaciones.validacionNumeros(
      this.seletedDigitadorActualizar.ced_digitador) == this.validaciones.TRUE) {
      alert('Cedula: ' + this.seletedDigitadorActualizar.ced_digitador + ' Invalida..');
      this.seletedDigitadorActualizar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
    } else if (this.validaciones.validacionNombre(
      this.seletedDigitadorActualizar.nom_digitador) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('NOMBRE: ' + this.seletedDigitadorActualizar.nom_digitador + ' Invalido..');
      this.seletedDigitadorActualizar.nom_digitador = this.validaciones.STR_LETTER_WITHOUT;
    } else if (this.validaciones.validacionNumeros(
      this.seletedDigitadorActualizar.tel_digitador) == this.validaciones.TRUE) {
      alert('TELEFONO: ' + this.seletedDigitadorActualizar.tel_digitador + ' Invalido..')
    } else {
      this.digitadorServi.findByIdDigitadorCedula(this.seletedDigitadorActualizar.ced_digitador).then(resultado =>{
        this.digitador = resultado;
        /* LLamo al servicio votante para buscar los digitadores existentes */
        this.votanteServi.findByIdVotanteCedula(this.seletedDigitadorActualizar.ced_digitador).then(resultado =>{
          this.votante = resultado
          /* LLamo al servicio usuario para buscar los digitadores existentes */
          this.loginServi.findAllUsuarioCedula(this.seletedDigitadorActualizar.ced_digitador).then(resultado =>{
            this.usuario = resultado;
            /* LLamo al servicio lider para buscar los digitadores existentes */
            this.liderServi.findByIdLiderCedula(this.seletedDigitadorActualizar.ced_digitador).then(resultado =>{
              this.lider = resultado;
              if (this.votante.length == this.validaciones.INT_NUMBER_0 && 
                this.usuario.length == this.validaciones.INT_NUMBER_0 && 
                this.lider.length == this.validaciones.INT_NUMBER_0) {
                  if (this.digitador.length == this.validaciones.INT_NUMBER_0) {
                    this.digitadorServi.updateDigitador({
                      id_digitador: this.seletedDigitadorActualizar.id_digitador,
                      ced_digitador: this.seletedDigitadorActualizar.ced_digitador,
                      nom_digitador: this.seletedDigitadorActualizar.nom_digitador,
                      usu_digiador: this.seletedDigitadorActualizar.usu_digiador,
                      con_digitador: this.seletedDigitadorActualizar.con_digitador,
                      id_comunaL: this.seletedDigitadorActualizar.id_comunaL,
                      id_lugar: this.seletedDigitadorActualizar.id_lugar,
                      id_barrio: this.seletedDigitadorActualizar.id_barrio,
                      id_lider: this.seletedDigitadorActualizar.id_lider,
                      id_usuario: this.seletedDigitadorActualizar.id_usuario,
                      municipio: this.seletedDigitadorActualizar.municipio,
                      departamento: this.seletedDigitadorActualizar.departamento,
                      id_comunaB: this.seletedDigitadorActualizar.id_comunaB,
                      id_mesa: this.seletedDigitadorActualizar.id_mesa,
                      id_tipo_usuario: this.seletedDigitadorActualizar.id_tipo_usuario,
                      activo: this.seletedDigitadorActualizar.activo,
                      tel_digitador: this.seletedDigitadorActualizar.tel_digitador,
                    }).subscribe((modificado) => {
                      /* se limpia el input de actualizar */
                      this.seletedDigitadorActualizar.id_digitador = this.validaciones.NULL;
                      /* Se da respuesta Exitosa del servidor */
                      alert("Se actualizo el digitador con exito");
                      /* se llama la funcion inicial para que recargue la pagina */
                      this.ngOnInit();
                    },(err:HttpErrorResponse) => {
                      if(err.error instanceof Error){
                        alert("a ocurrido un errror cliente");
                      }else{
                        alert("a ocurrido un errror servidor");
                      }
                    });
                  } else {
                    let id_number = this.validaciones.INT_NUMBER_0; 
                    let encuentra:Boolean = this.validaciones.FALSE;
                    for (let i = 0; i < this.digitador.length; i++ ) {
                      if (this.seletedDigitadorActualizar.id_digitador == this.digitador[i].id_digitador &&
                          this.seletedDigitadorActualizar.ced_digitador == this.digitador[i].ced_digitador) {
                            encuentra = this.validaciones.TRUE;
                            id_number = i;
                      }
                    }
                    if (encuentra == this.validaciones.TRUE) {
                      this.digitadorServi.updateDigitador({
                        id_digitador: this.seletedDigitadorActualizar.id_digitador,
                        ced_digitador: this.seletedDigitadorActualizar.ced_digitador,
                        nom_digitador: this.seletedDigitadorActualizar.nom_digitador,
                        usu_digiador: this.seletedDigitadorActualizar.usu_digiador,
                        con_digitador: this.seletedDigitadorActualizar.con_digitador,
                        id_comunaL: this.seletedDigitadorActualizar.id_comunaL,
                        id_lugar: this.seletedDigitadorActualizar.id_lugar,
                        id_barrio: this.seletedDigitadorActualizar.id_barrio,
                        id_lider: this.seletedDigitadorActualizar.id_lider,
                        id_usuario: this.seletedDigitadorActualizar.id_usuario,
                        municipio: this.seletedDigitadorActualizar.municipio,
                        departamento: this.seletedDigitadorActualizar.departamento,
                        id_comunaB: this.seletedDigitadorActualizar.id_comunaB,
                        id_mesa: this.seletedDigitadorActualizar.id_mesa,
                        id_tipo_usuario: this.seletedDigitadorActualizar.id_tipo_usuario,
                        activo: this.seletedDigitadorActualizar.activo,
                        tel_digitador: this.seletedDigitadorActualizar.tel_digitador,
                      }).subscribe((modificado) => {
                        /* se limpia el input de actualizar */
                        this.seletedDigitadorActualizar.id_digitador = this.validaciones.NULL;
                        /* Se da respuesta Exitosa del servidor */
                        alert("Se actualizo el digitador con exito");
                        /* se llama la funcion inicial para que recargue la pagina */
                        this.ngOnInit();
                      },(err:HttpErrorResponse) => {
                        if(err.error instanceof Error){
                          alert("a ocurrido un errror cliente");
                        }else{
                          alert("a ocurrido un errror servidor");
                        }
                      });
                    } else {
                      /* Mensaje de respuesta de lugar ya existe */
                      alert('la Cedula: ' + this.seletedDigitadorActualizar.ced_digitador +'\n' +
                            'esta registrada con el nombre: ' + this.digitador[id_number].nom_digitador 
                            + '\n\n'
                      );
                      /* se limpia el input de actualizar */
                      this.seletedDigitadorActualizar.id_digitador = this.validaciones.NULL;
                      /* Recargo la pagina */
                      this.ngOnInit();
                    }
                  }
              } else if (this.digitador.length != this.validaciones.INT_NUMBER_0) {
                alert("la cedula ya Existe en digitador: " + this.seletedDigitadorActualizar.ced_digitador);
                this.seletedDigitadorActualizar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
              } else if (this.votante.length != this.validaciones.INT_NUMBER_0) {
                alert("la cedula ya Existe en votante: " + this.seletedDigitadorActualizar.ced_digitador);
                this.seletedDigitadorActualizar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
              } else if (this.usuario.length != this.validaciones.INT_NUMBER_0) {
                alert("la cedula ya Existe en usuario: " + this.seletedDigitadorActualizar.ced_digitador);
                this.seletedDigitadorActualizar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
              } else if (this.lider.length != this.validaciones.INT_NUMBER_0) {
                alert("la cedula ya Existe en lider: " + this.seletedDigitadorActualizar.ced_digitador);
                this.seletedDigitadorActualizar.ced_digitador = this.validaciones.STR_LETTER_WITHOUT;
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

  cancelar() {
    this.seletedDigitadorActualizar.id_digitador = this.validaciones.NULL;
    this.ngOnInit();
  }
}