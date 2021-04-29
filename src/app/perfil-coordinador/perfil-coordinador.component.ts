import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Barrio } from '../modelos/barrio';
import { Comuna } from '../modelos/comuna';
import { CoordinadorAux } from '../modelos/coordinador-aux';
import { DigitadorAux } from '../modelos/digitador-aux';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { Lider } from '../modelos/lider';
import { Lugar } from '../modelos/lugar';
import { LugarMesa } from '../modelos/lugar-mesa';
import { Mesa } from '../modelos/mesa';
import { Token } from '../modelos/token';
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { Validaciones } from '../modelos/validaciones';
import { Votante } from '../modelos/votante';
import { BarrioService } from '../servicios/barrio.service';
import { ComunaService } from '../servicios/comuna.service';
import { DigitadorService } from '../servicios/digitador.service';
import { LiderService } from '../servicios/lider.service';
import { LoginService } from '../servicios/login.service';
import { LugarMesaService } from '../servicios/lugar-mesa.service';
import { LugarService } from '../servicios/lugar.service';
import { MesaService } from '../servicios/mesa.service';
import { VotanteService } from '../servicios/votante.service';

@Component({
  selector: 'app-perfil-coordinador',
  templateUrl: './perfil-coordinador.component.html',
  styleUrls: ['./perfil-coordinador.component.css']
})
export class PerfilCoordinadorComponent implements OnInit {

  /* Llamo ala clase validaciones */
  validaciones = new Validaciones();

  /* Inicializo un arreglo del objeto Barrio */
  barrio:Barrio[] = [];
  barrioAux:Barrio[] = [];

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

  /* Inicializo un arreglo del objeto Mesa */
  mesa:Mesa[] = [];
  mesaAux:Mesa[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];

  votante:Votante[] = [];

  /* Inicializo un arreglo del objeto usuario para los coordinadores */
  coordinador:UsuarioFindAll[] = [];
  coordinadorAux2:UsuarioFindAll[] = [];
  coordinadorAux:CoordinadorAux[] = [];

  /* Inicializo un arreglo del objeto digitador */
  digitador:DigitadorFindAll[] = [];

  /* Inicializo un arreglo del objeto Digitador Para la lista sin id */
  digitadorAux:DigitadorAux[] = [];

  /* Inicializo un arreglo del objeto lider */
  lider:Lider[] = [];
  liderAux:Lider[] = [];

  /* Inicializo el objeto Agenda Para formulario Actualizar*/
  seletedCoordinadorActualizar:UsuarioFindAll = new UsuarioFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,
    this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT,
  );

  /* Inicializo el objeto digitador Para formulario Actualizar*/
  seletedDigitadorActualizar:DigitadorFindAll = new DigitadorFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, 
    this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT
  );

   /* Verificar la Ayutenticidad */
   encontrado:Boolean = this.validaciones.FALSE;

   /* Para bloquear desdel ts la viste del HTML dependiendo el tipo de usuario */
   vista:Number;
 
   /* Token de verificacion de logueo */
   token:Token;

  constructor(private loginServi:LoginService, private route:Router, private comunaService:ComunaService, 
    private lugarService:LugarService, private lugarmesaService:LugarMesaService, private barrioService:BarrioService,
    private mesaService:MesaService, private liderServi:LiderService, private digitadorService:DigitadorService,
    private votanteService:VotanteService,
    ) { this.digitadorAux = [],  this.coordinadorAux = [] }

  ngOnInit() {
    /* Se inicializan en vacio los arreglos */
    this.digitadorAux = [];
    this.coordinadorAux = [];

    this.loginServi.findAllUsuario().then(resultado => {
      /* Asigno los datos de la tabla usuario al arreglo usuario */
      this.usuario = resultado;
      /* Consulto los Datos de la tabla digitador */
      this.loginServi.findAllDigitador().then(resultado => {
        /* Asigno los datos de la tabla digitador al arreglo digitador */
        this.digitador = resultado;
          /* Consulto Los datos de la tabla Comuna */
          this.comunaService.findAllComuna().then(resultado => {
            /* Asigno al arreglo Agendas todas las existenten en la tabla */
            this.comuna = resultado;
            this.comunaBAux = this.comuna;
            this.comunaLAux = this.comuna;
            /* Consulto Los datos de la tabla barrio */
            this.barrioService.findAllBarrio().then(resultado => {
            /* Asigno al arreglo barrio todas las existenten en la tabla */
            this.barrio = resultado;
            this.barrioAux = this.barrio;
            /* Consulto Los datos de la tabla lugar */
            this.lugarService.findAllLugar().then(resultado => {
              /* Asigno al arreglo lugar todas las existenten en la tabla */
              this.lugar = resultado;
              this.lugarAux = this.lugar;
              this.liderServi.findAllLider().then(resultado => {
                /* Asigno al arreglo lider todas las existenten en la tabla */
                this.lider = resultado;
                this.liderAux = this.lider;
                this.loginServi.findAllUsuarioCoordinador().then(resultado=>{
                  this.coordinador = resultado;
                  this.coordinadorAux2 = this.coordinador;
              /* Consulto Los datos de la tabla mesa */
              this.mesaService.findAllMesa().then(resultado => {
              /* Asigno al arreglo Agendas todas las existenten en la tabla */
                this.mesa = resultado;
                this.mesaAux = this.mesa;
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

                  if (this.token.tipo_usuario == this.validaciones.INT_NUMBER_4) {
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
                                                  if (this.digitador[i].usu_digiador == this.token.user_usu &&
                                                      this.digitador[i].id_tipo_usuario == this.token.tipo_usuario) {
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
                    }
                  } else {
                    for (let i = this.validaciones.INT_NUMBER_0; i < this.usuario.length; i++){
                      for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
                            for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                              for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                                for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                                  for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                                    
                                  if (this.usuario[i].id_barrio == this.barrio[j].id_barrio) {
                                        if (this.usuario[i].id_comunaB == this.comuna[l].id_comuna) {
                                          if (this.usuario[i].id_comunaL == this.comuna[m].id_comuna) {
                                            if (this.usuario[i].id_lugar == this.lugar[o].id_lugar) {
                                              if (this.usuario[i].id_mesa == this.mesa[p].id_mesa) {
                                                if (this.usuario[i].login == this.token.user_usu && 
                                                    this.usuario[i].id_tipo_usuario == this.token.tipo_usuario) {
                                                    this.addCoordinadorAux({
                                                      id_usuario:this.usuario[i].id_usuario,
                                                      ced_usuario: this.usuario[i].ced_usuario,
                                                      nom_usuario: this.usuario[i].nom_usuario,
                                                      nom_lugar: this.lugar[o].nom_lugar,
                                                      nom_mesa: this.mesa[p].nom_mesa,
                                                      nom_barrio: this.barrio[j].nom_barrio,
                                                      login:this.usuario[i].login,
                                                      contrasena:this.usuario[i].contrasena,
                                                      id_tipo_usuario:this.usuario[i].id_tipo_usuario,
                                                      tel_usuario : this.usuario[i].tel_usuario,
                                                      activo : this.validaciones.TRUE,
                                                      nom_comunaB: this.comuna[m].nom_comuna,
                                                      nom_comunaL: this.comuna[l].nom_comuna,
                                                      municipio: this.usuario[i].municipio,
                                                      departamento: this.usuario[i].departamento
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

                } catch (e) {
                  /* Si no encuentra el usuario */
                  if(this.encontrado == this.validaciones.FALSE){
                  /* Navega al login */
                  this.route.navigate(['/']);
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

  /* Agregar Barrio a Arreglo local par aquitar id */
  addDigitadorAux(item:DigitadorAux){
    this.digitadorAux.push(item);
  }

  addCoordinadorAux(item:CoordinadorAux) {
    this.coordinadorAux.push(item);
  }

  actualizarUsuario(item:UsuarioFindAll){
    /* llena el objeto de comuna para actualizar */
    for(let i = 0; i < this.usuario.length; i++) {
        if (this.usuario[i].id_usuario == item.id_usuario) {
        this.seletedCoordinadorActualizar = this.usuario[i];
      }
    }
  }

  actualizarDigitador(item:DigitadorFindAll){
    /* llena el objeto de comuna para actualizar */
    for(let i = 0; i < this.digitador.length; i++) {
      if (this.digitador[i].id_digitador == item.id_digitador) {
        this.seletedDigitadorActualizar = this.digitador[i];
      }
    }
  }

  actualizacion() {
    if (this.token.tipo_usuario == this.validaciones.INT_NUMBER_4) {
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
      this.digitadorService.findByIdDigitadorCedula(this.seletedDigitadorActualizar.ced_digitador).then(resultado =>{
        this.digitador = resultado;
        /* LLamo al servicio votante para buscar los digitadores existentes */
        this.votanteService.findByIdVotanteCedula(this.seletedDigitadorActualizar.ced_digitador).then(resultado =>{
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
                    this.digitadorService.updateDigitador({
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
                      alert("Se actualizo el usuario con exito");
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
                      this.digitadorService.updateDigitador({
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
    } else {
      /* Validacion de campos Obligatorios */
    if (this.validaciones.validaCampoObligatorio(
      this.seletedCoordinadorActualizar.ced_usuario) == this.validaciones.TRUE) {
      alert('CEDULA Obligatoria..');
    } else if (this.validaciones.validaCampoObligatorio(
      this.seletedCoordinadorActualizar.nom_usuario) == this.validaciones.TRUE) {
      alert('NOMBRE obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedCoordinadorActualizar.id_comunaL) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('COMUNA DE VOTACION obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedCoordinadorActualizar.id_lugar) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('LUGAR DE VOTACION obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedCoordinadorActualizar.id_comunaB) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('COMUNA BARRIO obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedCoordinadorActualizar.id_barrio) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('BARRIO obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedCoordinadorActualizar.id_usuario) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('COORDINADOR obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedCoordinadorActualizar.id_mesa) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('MESA obligatotio..');
    } else if (this.validaciones.validaCampoObligatorio(
      this.seletedCoordinadorActualizar.tel_usuario) == this.validaciones.TRUE) {
      alert('TELEFONO obligatotio..');
    }

    /* Validaciones de Rangos */
    else if (this.validaciones.validacionNumeros(
      this.seletedCoordinadorActualizar.ced_usuario) == this.validaciones.TRUE) {
      alert('Cedula: ' + this.seletedCoordinadorActualizar.ced_usuario + ' Invalida..');
      this.seletedCoordinadorActualizar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
    } else if (this.validaciones.validacionNombre(
      this.seletedCoordinadorActualizar.nom_usuario) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('NOMBRE: ' + this.seletedCoordinadorActualizar.nom_usuario + ' Invalido..');
      this.seletedCoordinadorActualizar.nom_usuario = this.validaciones.STR_LETTER_WITHOUT;
    } else if (this.validaciones.validacionNumeros(
      this.seletedCoordinadorActualizar.tel_usuario) == this.validaciones.TRUE) {
      alert('TELEFONO: ' + this.seletedCoordinadorActualizar.tel_usuario + ' Invalido..')
    } else {
      this.digitadorService.findByIdDigitadorCedula(this.seletedCoordinadorActualizar.ced_usuario).then(resultado =>{
        this.digitador = resultado;
        /* LLamo al servicio votante para buscar los digitadores existentes */
        this.votanteService.findByIdVotanteCedula(this.seletedCoordinadorActualizar.ced_usuario).then(resultado =>{
          this.votante = resultado
          /* LLamo al servicio usuario para buscar los digitadores existentes */
          this.loginServi.findAllUsuarioCedula(this.seletedCoordinadorActualizar.ced_usuario).then(resultado =>{
            this.usuario = resultado;
            /* LLamo al servicio lider para buscar los digitadores existentes */
            this.liderServi.findByIdLiderCedula(this.seletedCoordinadorActualizar.ced_usuario).then(resultado =>{
              this.lider = resultado;
              if (this.votante.length == this.validaciones.INT_NUMBER_0 && 
                this.digitador.length == this.validaciones.INT_NUMBER_0 && 
                this.lider.length == this.validaciones.INT_NUMBER_0) {
                  if (this.usuario.length == this.validaciones.INT_NUMBER_0) {
                    this.loginServi.updateUsuario({
                      id_usuario: this.seletedCoordinadorActualizar.id_usuario,
                      ced_usuario: this.seletedCoordinadorActualizar.ced_usuario,
                      nom_usuario: this.seletedCoordinadorActualizar.nom_usuario,
                      id_comunaL: this.seletedCoordinadorActualizar.id_comunaL,
                      id_lugar: this.seletedCoordinadorActualizar.id_lugar,
                      id_barrio: this.seletedCoordinadorActualizar.id_barrio,
                      municipio: this.seletedCoordinadorActualizar.municipio,
                      departamento: this.seletedCoordinadorActualizar.departamento,
                      id_comunaB: this.seletedCoordinadorActualizar.id_comunaB,
                      id_mesa: this.seletedCoordinadorActualizar.id_mesa,
                      id_tipo_usuario:3,
                      activo: this.seletedCoordinadorActualizar.activo,
                      tel_usuario: this.seletedCoordinadorActualizar.tel_usuario,
                      login: this.seletedCoordinadorActualizar.login,
                      contrasena: this.seletedCoordinadorActualizar.contrasena,
                    }).subscribe((modificado) => {
                      /* se limpia el input de actualizar */
                      this.seletedCoordinadorActualizar.id_usuario = this.validaciones.NULL;
                      /* Se da respuesta Exitosa del servidor */
                      alert("Se actualizo el coordinador con exito");
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
                    for (let i = 0; i < this.usuario.length; i++ ) {
                      if (this.seletedCoordinadorActualizar.id_usuario == this.usuario[i].id_usuario &&
                          this.seletedCoordinadorActualizar.ced_usuario == this.usuario[i].ced_usuario) {
                            encuentra = this.validaciones.TRUE;
                            id_number = i;
                      }
                    }
                    if (encuentra == this.validaciones.TRUE) {
                      this.loginServi.updateUsuario({
                        id_usuario: this.seletedCoordinadorActualizar.id_usuario,
                        ced_usuario: this.seletedCoordinadorActualizar.ced_usuario,
                        nom_usuario: this.seletedCoordinadorActualizar.nom_usuario,
                        id_comunaL: this.seletedCoordinadorActualizar.id_comunaL,
                        id_lugar: this.seletedCoordinadorActualizar.id_lugar,
                        id_barrio: this.seletedCoordinadorActualizar.id_barrio,
                        municipio: this.seletedCoordinadorActualizar.municipio,
                        departamento: this.seletedCoordinadorActualizar.departamento,
                        id_comunaB: this.seletedCoordinadorActualizar.id_comunaB,
                        id_mesa: this.seletedCoordinadorActualizar.id_mesa,
                        id_tipo_usuario: 3,
                        activo: this.seletedCoordinadorActualizar.activo,
                        tel_usuario: this.seletedCoordinadorActualizar.tel_usuario,
                        login: this.seletedCoordinadorActualizar.login,
                        contrasena: this.seletedCoordinadorActualizar.contrasena,
                      }).subscribe((modificado) => {
                        /* se limpia el input de actualizar */
                        this.seletedCoordinadorActualizar.id_usuario = this.validaciones.NULL;
                        /* Se da respuesta Exitosa del servidor */
                        alert("Se actualizo el coordinador con exito");
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
                      alert('la Cedula: ' + this.seletedCoordinadorActualizar.ced_usuario +'\n' +
                            'esta registrada con el nombre: ' + this.usuario[id_number].nom_usuario 
                            + '\n\n'
                      );
                      /* se limpia el input de actualizar */
                      this.seletedCoordinadorActualizar.id_usuario = this.validaciones.NULL;
                      /* Recargo la pagina */
                      this.ngOnInit();
                    }
                  }
              } else if (this.digitador.length != this.validaciones.INT_NUMBER_0) {
                alert("la cedula ya Existe en digitador: " + this.seletedCoordinadorActualizar.ced_usuario);
                this.seletedCoordinadorActualizar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
              } else if (this.votante.length != this.validaciones.INT_NUMBER_0) {
                alert("la cedula ya Existe en votante: " + this.seletedCoordinadorActualizar.ced_usuario);
                this.seletedCoordinadorActualizar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
              } else if (this.usuario.length != this.validaciones.INT_NUMBER_0) {
                alert("la cedula ya Existe en usuario: " + this.seletedCoordinadorActualizar.ced_usuario);
                this.seletedCoordinadorActualizar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
              } else if (this.lider.length != this.validaciones.INT_NUMBER_0) {
                alert("la cedula ya Existe en lider: " + this.seletedCoordinadorActualizar.ced_usuario);
                this.seletedCoordinadorActualizar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
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
  }
  
  cancelar() {
    if (this.token.tipo_usuario == this.validaciones.INT_NUMBER_4) {
      this.seletedDigitadorActualizar.id_digitador = this.validaciones.NULL;
    } else {
      this.seletedCoordinadorActualizar.id_usuario = this.validaciones.NULL;
    }
    this.ngOnInit();
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
        this.seletedCoordinadorActualizar.id_comunaL = this.lugar[i].id_comunaL;
        this.seletedDigitadorActualizar.id_comunaL = this.lugar[i].id_comunaL;
      }
    }
    for (let j = 0; j < this.lugarMesa.length;j++) {
      if (this.lugarMesa[j].id_lugar == this.seletedCoordinadorActualizar.id_lugar ||
          this.lugarMesa[j].id_lugar == this.seletedDigitadorActualizar.id_lugar) {
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

  SelectBarrioActualizar(id_barrio:Number) {
  for (let i = 0; i < this.barrio.length; i++) {
    if(id_barrio == this.barrio[i].id_barrio){
      this.seletedCoordinadorActualizar.id_comunaB = this.barrio[i].id_comunaB;
      this.seletedDigitadorActualizar.id_comunaB = this.barrio[i].id_comunaB;
    }
  }
  }

}
