/* Servicios */
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { VotanteService } from '../servicios/votante.service';
import { ComunaService } from '../servicios/comuna.service';
import { LugarService } from '../servicios/lugar.service';
import { BarrioService } from '../servicios/barrio.service';
import { MesaService } from '../servicios/mesa.service';
import { LiderService } from '../servicios/lider.service';

/* Clases */
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { Token } from '../modelos/token';
import { Validaciones } from '../modelos/validaciones';
import { Votante } from '../modelos/votante';
import { Comuna } from '../modelos/comuna';
import { Lugar } from '../modelos/lugar';
import { Barrio } from '../modelos/barrio';
import { Mesa } from '../modelos/mesa';
import { Lider } from '../modelos/lider';
import { DigitadorService } from '../servicios/digitador.service';
import { VotanteAux } from '../modelos/votante-aux';



@Component({
  selector: 'app-votante',
  templateUrl: './votante.component.html',
  styleUrls: ['./votante.component.css']
})
export class VotanteComponent implements OnInit {

  /* Llamo ala clase validaciones */
  validaciones = new Validaciones();

  /* Total de Agendas Ingresadas */
  totalVotante:any = 0;

  /* Inicializo un arreglo del objeto Agenda */
  votantes:Votante[] = [];
  /* Inicializo un arreglo del objeto Barrio */
  barrio:Barrio[] = [];
  /* Inicializo un arreglo del objeto Comuna */
  comuna:Comuna[] = [];
  /* Inicializo un arreglo del objeto Lugar */
  lugar:Lugar[] = [];
  /* Inicializo un arreglo del objeto Mesa */
  mesa:Mesa[] = [];
  /* Inicializo un arreglo del objeto Lider */
  lider:Lider[] = [];
   /* Inicializo un arreglo del objeto Lider */
   votanteAux:VotanteAux[] = [];
  

  /* Inicializo un arreglo del objeto Agenda Para la busqueda*/
  votantesBuscar:Votante[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];

  /* Inicializamos un arreglo del objeto Digitador */
  digitador:DigitadorFindAll[] = [];

  /* Inicializo el objeto Agenda Para formulario Agregar*/
  seletedVotanteAgregar:Votante = new Votante(this.validaciones.NULL, 
   this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL,
   this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
   this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
   this.validaciones.STR_LETTER_WITHOUT);

    /* Inicializo el objeto Agenda Para formulario listar*/
    seletedVotanteListar:Votante = new Votante(this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL,
    this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT);
 
  /* Inicializo el objeto Agenda Para formulario Actualizar*/
  seletedVotanteActualizar:Votante = new Votante(this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL,
    this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT);

  /* Inicializo el objeto Mesa Para formulario Buscar*/
  seletedVotanteBuscar:Votante = new Votante(this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL,
    this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
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

  constructor(private loginServi:LoginService, private route:Router, private votanteService:VotanteService,
    private comunaService:ComunaService, private lugarService:LugarService, private barrioService:BarrioService,
    private mesaService:MesaService, private liderService:LiderService, private digitadorService:DigitadorService) { this.votanteAux = [] }

  /* Funcion que se llama por defecto es la primera en ejecutarse */
  ngOnInit() {
    /*se limpia arreglo aux para volver a llenar*/
    this.votanteAux = [];
    /* Consulto los Datos de la tabla usuario */
    this.loginServi.findAllUsuario().then(resultado => {
      /* Asigno los datos de la tabla usuario al arreglo usuario */
      this.usuario = resultado;
      /* Consulto los Datos de la tabla digitador */
      this.loginServi.findAllDigitador().then(resultado => {
        /* Asigno los datos de la tabla digitador al arreglo digitador */
        this.digitador = resultado;
        /* Consulto Los datos de la tabla votante */
        this.votanteService.findAllVotante().then(resultado => {
          /* Asigno al arreglo votantes todas las existenten en la tabla */
          this.votantes = resultado;
        /* Consulto Los datos de la tabla Comuna */
        this.comunaService.findAllComuna().then(resultado => {
          /* Asigno al arreglo Agendas todas las existenten en la tabla */
          this.comuna = resultado;
          /* Consulto Los datos de la tabla barrio */
        this.barrioService.findAllBarrio().then(resultado => {
          /* Asigno al arreglo barrio todas las existenten en la tabla */
          this.barrio = resultado;
          /* Consulto Los datos de la tabla lugar */
        this.lugarService.findAllLugar().then(resultado => {
          /* Asigno al arreglo lugar todas las existenten en la tabla */
          this.lugar = resultado;
          /* Consulto Los datos de la tabla mesa */
        this.mesaService.findAllMesa().then(resultado => {
          /* Asigno al arreglo Agendas todas las existenten en la tabla */
          this.mesa = resultado;
          /* Consulto Los datos de la tabla Lider */
        this.liderService.findAllLider().then(resultado => {
          /* Asigno al arreglo lider todas las existenten en la tabla */
          this.lider = resultado;
          /* consulta la cantidad de Agendas que existen en el sistema */
          this.votanteService.findByIdTotalVotante().subscribe(resultado=>{
            this.totalVotante = resultado;
          });
          for (let i = this.validaciones.INT_NUMBER_0; i < this.votantes.length; i++){
            for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
              for (let k = this.validaciones.INT_NUMBER_0; k < this.lider.length; k++) {
                for (let n = this.validaciones.INT_NUMBER_0; n < this.usuario.length; n++) {
                  for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                    for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          
                        if (this.votantes[i].id_barrio == this.barrio[j].id_barrio) {
                          if (this.votantes[i].id_lider == this.lider[k].id_lider) {
                            if (this.votantes[i].id_usuario == this.usuario[n].id_usuario) {
                              if (this.votantes[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.votantes[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.votantes[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.votantes[i].id_mesa == this.mesa[p].id_mesa) {
                                      console.log('entro');
                                      this.addVotanteAux({
                                        id_votante:this.votantes[i].id_votante,
                                        ced_votante: this.votantes[i].ced_votante,
                                        nom_lider: this.lider[k].nom_lider,
                                        nom_votante: this.votantes[i].nom_votante,
                                        nom_lugar: this.lugar[o].nom_lugar,
                                        nom_mesa: this.mesa[p].nom_mesa,
                                        nom_barrio: this.barrio[j].nom_barrio,
                                        nom_usuario: this.usuario[n].nom_usuario,
                                        tel_votante : this.votantes[i].tel_votante,
                                        activo : this.validaciones.TRUE,
                                        comuna_lugar: this.comuna[m].nom_comuna,
                                        comuna_barrio: this.comuna[l].nom_comuna,
                                        municipio: this.votantes[i].municipio,
                                        departamento: this.votantes[i].departamento
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
  
   /*  Funcion Guardar Votante */
   guardar() {
    /* Validacion de Campos Obligatorios y invalidos */
    if (this.validaciones.validaCampoObligatorio(this.seletedVotanteAgregar.nom_votante) == this.validaciones.TRUE) {
      alert('CAMPO NOMBRE VOTANTE OBLIGATORIO..');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedVotanteAgregar.ced_votante) == this.validaciones.TRUE) {
      alert('CAMPO CEDULA VOTANTE OBLIGATORIO.. ');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedVotanteAgregar.municipio) == this.validaciones.TRUE) {
      alert('CAMPO MUNICIPIO VOTANTE OBLIGATORIO.. ');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedVotanteAgregar.departamento) == this.validaciones.TRUE) {
      alert('CAMPO DEPARTAMENTO VOTANTE OBLIGATORIO.. ');
    } else if (this.validaciones.validacionNombre(this.seletedVotanteAgregar.nom_votante) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO NOMBRE INVALIDO: ' + this.seletedVotanteAgregar.nom_votante);
    } else if (this.validaciones.validacionNombre(this.seletedVotanteAgregar.municipio) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO MUNICIPIO INVALIDO: ' + this.seletedVotanteAgregar.municipio);
    } else if (this.validaciones.validacionNombre(this.seletedVotanteAgregar.departamento) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO DEPARTAMENTO INVALIDO: ' + this.seletedVotanteAgregar.departamento);
    } else if (this.validaciones.validacionNumerico(this.seletedVotanteAgregar.ced_votante) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO CEDULA INVALIDO: ' + this.seletedVotanteAgregar.ced_votante);
    } else if (this.validaciones.validacionNumerico(this.seletedVotanteAgregar.tel_votante) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO TELEFONO INVALIDO: ' + this.seletedVotanteAgregar.tel_votante);
    } else {
      /* LLamo al servicio votante para buscar los votantes existentes */
      this.votanteService.findByIdVotanteCedula(this.seletedVotanteAgregar.ced_votante).then(resultado =>{
      /* Se llena el arreglo votantes con la data seleccionada en la busqueda */
      this.votantes = resultado;
      /* LLamo al servicio digitador para buscar los votantes existentes */
      this.digitadorService.findByIdDigitadorCedula(this.seletedVotanteAgregar.ced_votante).then(resultado =>{
        /* Se llena el arreglo digitador con la data seleccionada en la busqueda */
        this.digitador = resultado;
        /* LLamo al servicio lider para buscar los votantes existentes */
      this.liderService.findByIdLiderCedula(this.seletedVotanteAgregar.ced_votante).then(resultado =>{
        /* Se llena el arreglo lider con la data seleccionada en la busqueda */
        this.lider = resultado;
        /* LLamo al servicio Usuario para buscar los votantes existentes */
      this.loginServi.findAllUsuarioCedula(this.seletedVotanteAgregar.ced_votante).then(resultado =>{
        /* Se llena el arreglo Usuario con la data seleccionada en la busqueda */
        this.usuario = resultado;
         /* Se pregunta si barrios contiene datos */
        if (this.votantes.length == this.validaciones.INT_NUMBER_0 && this.digitador.length == this.validaciones.INT_NUMBER_0 &&
          this.usuario.length == this.validaciones.INT_NUMBER_0 && this.lider.length == this.validaciones.INT_NUMBER_0 ) {
          /* llama el servicio de agregar un barrio en la tabla barrio */
          this.votanteService.insertVotante({
            /* Se envia la data diligenciada en el formulario */
            id_votante:this.seletedVotanteAgregar.id_votante,
            ced_votante: this.seletedVotanteAgregar.ced_votante,
            id_lider: this.seletedVotanteAgregar.id_lider,
            nom_votante: this.seletedVotanteAgregar.nom_votante,
            id_lugar: this.seletedVotanteAgregar.id_lugar,
            id_mesa: this.seletedVotanteAgregar.id_mesa,
            id_barrio: this.seletedVotanteAgregar.id_barrio,
            id_usuario: this.seletedVotanteAgregar.id_usuario,
            tel_votante : this.seletedVotanteAgregar.tel_votante,
            activo : this.validaciones.TRUE,
            id_comunaL: this.seletedVotanteAgregar.id_comunaL,
            id_comunaB: this.seletedVotanteAgregar.id_comunaB,
            municipio: this.seletedVotanteAgregar.municipio,
            departamento: this.seletedVotanteAgregar.departamento
          }).subscribe((resultado) => {
            /* Se da respuesta Exitosa del servidor */
            alert("Se Agrego EL VOTANTE");
            /* se llama la funcion inicial para que recargue la pagina */
            this.ngOnInit();
            /* se limpia el input de agregar */
            this.seletedVotanteAgregar.nom_votante = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedVotanteAgregar.ced_votante = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedVotanteAgregar.tel_votante = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedVotanteAgregar.municipio = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedVotanteAgregar.departamento = this.validaciones.STR_LETTER_WITHOUT;
          });
        } else if (this.votantes.length != this.validaciones.INT_NUMBER_0) { 
          alert("la cedula ya exite en votante: " + this.seletedVotanteAgregar.ced_votante);
        } else if (this.digitador.length != this.validaciones.INT_NUMBER_0) {
          alert("la cedula ya exite en digitador: " + this.seletedVotanteAgregar.ced_votante);
        } else if (this.usuario.length != this.validaciones.INT_NUMBER_0) {
          alert("la cedula ya exite en usuario: " + this.seletedVotanteAgregar.ced_votante);
        } else if (this.lider.length != this.validaciones.INT_NUMBER_0) {
          alert("la cedula ya exite en lider: " + this.seletedVotanteAgregar.ced_votante);
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
    }    
  }
  addVotanteAux(item:VotanteAux) {
    this.votanteAux.push(item);
  }
}