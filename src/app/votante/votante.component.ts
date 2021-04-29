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
import { LugarMesaService } from '../servicios/lugar-mesa.service';

/* Modelos */
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
import { LiderAux } from '../modelos/lider-aux';
import { LugarMesaComponent } from '../lugar-mesa/lugar-mesa.component';
import { LugarMesa } from '../modelos/lugar-mesa';





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
  
  votante:Votante[] = [];
  votanteAux:VotanteAux[] = [];

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

  /* Inicializo un arreglo del objeto Lider */
  lider:Lider[] = [];
  liderAux:Lider[] = [];

  /* Inicializo un arreglo del objeto Agenda Para la busqueda*/
  votantesBuscar:Votante[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];

  /* Inicializamos un arreglo del objeto Digitador */
  digitador:DigitadorFindAll[] = [];

  /* Inicializo un arreglo del objeto usuario para los coordinadores */
  coordinador:UsuarioFindAll[] = [];
  coordinadorAux:UsuarioFindAll[] = [];

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

     /* Inicializo el objeto digitador Para formulario Buscar*/
  seletedDigitadorBuscar:DigitadorFindAll = new DigitadorFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
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

  constructor(private loginServi:LoginService, private route:Router, private votanteService:VotanteService,
    private comunaService:ComunaService, private lugarService:LugarService, private barrioService:BarrioService,
    private mesaService:MesaService, private liderService:LiderService, private digitadorService:DigitadorService,private lugarmesaService:LugarMesaService ) { this.votanteAux = [] }

  /* Funcion que se llama por defecto es la primera en ejecutarse */
  ngOnInit() {
    /* se quema el departamento y el municipio */
    this.seletedVotanteAgregar.departamento = 'NARIÑO';
    this.seletedVotanteAgregar.municipio = 'TUMACO';
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
          this.votante = this.votantes;
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
          /* Consulto Los datos de la tabla mesa */
        this.mesaService.findAllMesa().then(resultado => {
          /* Asigno al arreglo Agendas todas las existenten en la tabla */
          this.mesa = resultado;
          this.mesaAux = this.mesa;
          /* Consulto Los datos de la tabla Lider */
        this.liderService.findAllLider().then(resultado => {
          /* Asigno al arreglo lider todas las existenten en la tabla */
          this.lider = resultado;
          this.liderAux = this.lider;
          /* consulta la cantidad de Agendas que existen en el sistema */
          this.votanteService.findByIdTotalVotante().subscribe(resultado=>{
            this.totalVotante = resultado;
          /* asigno el arreglo coordinador todos los datos de la tabla usuario que son coordinadores */
        this.loginServi.findAllUsuarioCoordinador().then(resultado=>{
            this.coordinador = resultado;
            this.coordinadorAux = this.coordinador;
          for (let i = this.validaciones.INT_NUMBER_0; i < this.votantes.length; i++){
            for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
              for (let k = this.validaciones.INT_NUMBER_0; k < this.lider.length; k++) {
                for (let n = this.validaciones.INT_NUMBER_0; n < this.coordinador.length; n++) {
                  for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                    for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          
                        if (this.votantes[i].id_barrio == this.barrio[j].id_barrio) {
                          if (this.votantes[i].id_lider == this.lider[k].id_lider) {
                            if (this.votantes[i].id_usuario == this.coordinador[n].id_usuario) {
                              if (this.votantes[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.votantes[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.votantes[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.votantes[i].id_mesa == this.mesa[p].id_mesa) {
                                      this.addVotanteAux({
                                        id_votante:this.votantes[i].id_votante,
                                        ced_votante: this.votantes[i].ced_votante,
                                        nom_lider: this.lider[k].nom_lider,
                                        nom_votante: this.votantes[i].nom_votante,
                                        nom_lugar: this.lugar[o].nom_lugar,
                                        nom_mesa: this.mesa[p].nom_mesa,
                                        nom_barrio: this.barrio[j].nom_barrio,
                                        nom_usuario: this.coordinador[n].nom_usuario,
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
      }, (err:HttpErrorResponse) => {
        if (err.error instanceof Error) {
          alert("a ocurrido un errror cliente");
        } else {
          alert("a ocurrido un errror servidor");
        }
      });}, (err:HttpErrorResponse) => {
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
        this.seletedVotanteAgregar.id_comunaB = this.barrio[i].id_comunaB;
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

  SelectLugarAgregar(id_lugar:Number){
    let l = 0;
    this.lugarMesa = [];
    this.mesaAux = [];
    this.lugarMesaAux = [];
    this.lugarmesaService.findAllLugarMesa().then(resultado =>{
      this.lugarMesa = resultado;
      for(let i = 0; i < this.lugar.length; i++){
        if(id_lugar == this.lugar[i].id_lugar){
          this.seletedVotanteAgregar.id_comunaL = this.lugar[i].id_comunaL;
        }
      }
      for (let j = 0; j < this.lugarMesa.length;j++) {
        if (this.lugarMesa[j].id_lugar == this.seletedVotanteAgregar.id_lugar) {
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
        this.seletedVotanteAgregar.id_usuario = this.lider[i].id_usuario;
      }
    }
  }


  selectLugarBuscar(id_lugar:Number) {
    this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
    this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
    this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
    this.seletedVotanteBuscar.ced_votante = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedLugarBuscar.id_lugar = id_lugar;
    this.seletedVotanteBuscar.id_votante = this.validaciones.NULL;
  }

  selectBarriorBuscar(id_barrio:Number) {
    this.seletedVotanteBuscar.ced_votante = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
    this.seletedBarrioBuscar.id_barrio = id_barrio;
    this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
    this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
    this.seletedVotanteBuscar.id_votante = this.validaciones.NULL;
  }

  selectLiderBuscar(id_lider:Number) { 
    
    this.seletedVotanteBuscar.ced_votante = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
    this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
    this.seletedLiderBuscar.id_lider = id_lider;
    this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
    this.seletedVotanteBuscar.id_votante = this.validaciones.NULL;
  }

  selectCoordinadorBuscar(id_coordinador:Number) {
    this.seletedVotanteBuscar.ced_votante = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
    this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
    this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
    this.seletedCoordinadorBuscar.id_usuario = id_coordinador;
    this.seletedVotanteBuscar.id_votante = this.validaciones.NULL;
  }

  selectVotanteBuscar (id_votante:Number) {
    this.seletedVotanteBuscar.ced_votante = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
    this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
    this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
    this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
    this.seletedVotanteBuscar.id_votante = id_votante;
  }


  buscar() {
    this.votanteAux = [];
    if(this.seletedVotanteBuscar.id_votante != this.validaciones.NULL){
      this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
      this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
      this.seletedDigitadorBuscar.id_digitador = this.validaciones.NULL;
      this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
      this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
      this.votanteService.findByIdVotante(this.seletedVotanteBuscar.id_votante).then(resultado=>{
        this.votantes = resultado;
        if ( this.votantes.length != this.validaciones.INT_NUMBER_0) {
          for (let i = this.validaciones.INT_NUMBER_0; i < this.votantes.length; i++){
            for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
              for (let k = this.validaciones.INT_NUMBER_0; k < this.lider.length; k++) {
                for (let n = this.validaciones.INT_NUMBER_0; n < this.coordinador.length; n++) {
                  for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                    for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          
                        if (this.votantes[i].id_barrio == this.barrio[j].id_barrio) {
                          if (this.votantes[i].id_lider == this.lider[k].id_lider) {
                            if (this.votantes[i].id_usuario == this.coordinador[n].id_usuario) {
                              if (this.votantes[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.votantes[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.votantes[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.votantes[i].id_mesa == this.mesa[p].id_mesa) {
                                      this.addVotanteAux({
                                        id_votante:this.votantes[i].id_votante,
                                        ced_votante: this.votantes[i].ced_votante,
                                        nom_lider: this.lider[k].nom_lider,
                                        nom_votante: this.votantes[i].nom_votante,
                                        nom_lugar: this.lugar[o].nom_lugar,
                                        nom_mesa: this.mesa[p].nom_mesa,
                                        nom_barrio: this.barrio[j].nom_barrio,
                                        nom_usuario: this.coordinador[n].nom_usuario,
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
        } else if(this.addVotanteAux.length == this.validaciones.INT_NUMBER_0){
          alert('Nombre: ' + this.seletedVotanteBuscar.nom_votante + ' No Existe..');
        }

      },(err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    }

    if(this.seletedVotanteBuscar.ced_votante != this.validaciones.STR_LETTER_WITHOUT){
      this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
      this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
      this.seletedDigitadorBuscar.id_usuario = this.validaciones.NULL;
      this.seletedLiderBuscar.id_lider = this.validaciones.NULL;
      this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
      this.votanteService.findByIdVotanteCedula(this.seletedVotanteBuscar.ced_votante).then(resultado=>{
        this.votantes = resultado;
        if ( this.votantes.length != this.validaciones.INT_NUMBER_0) {
          for (let i = this.validaciones.INT_NUMBER_0; i < this.votantes.length; i++){
            for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
              for (let k = this.validaciones.INT_NUMBER_0; k < this.lider.length; k++) {
                for (let n = this.validaciones.INT_NUMBER_0; n < this.coordinador.length; n++) {
                  for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                    for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          
                        if (this.votantes[i].id_barrio == this.barrio[j].id_barrio) {
                          if (this.votantes[i].id_lider == this.lider[k].id_lider) {
                            if (this.votantes[i].id_usuario == this.coordinador[n].id_usuario) {
                              if (this.votantes[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.votantes[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.votantes[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.votantes[i].id_mesa == this.mesa[p].id_mesa) {
                                      this.addVotanteAux({
                                        id_votante:this.votantes[i].id_votante,
                                        ced_votante: this.votantes[i].ced_votante,
                                        nom_lider: this.lider[k].nom_lider,
                                        nom_votante: this.votantes[i].nom_votante,
                                        nom_lugar: this.lugar[o].nom_lugar,
                                        nom_mesa: this.mesa[p].nom_mesa,
                                        nom_barrio: this.barrio[j].nom_barrio,
                                        nom_usuario: this.coordinador[n].nom_usuario,
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
        } else if(this.votanteAux.length == this.validaciones.INT_NUMBER_0){
          alert('Cedula: ' + this.seletedVotanteBuscar.ced_votante + ' No Existe..');
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
      this.votanteService.findByIdVotanteLugar(this.seletedLugarBuscar.id_lugar).then(resultado=>{
        this.votantes = resultado;
        if ( this.votantes.length != this.validaciones.INT_NUMBER_0) {
        for (let i = this.validaciones.INT_NUMBER_0; i < this.votantes.length; i++){
          for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
            for (let k = this.validaciones.INT_NUMBER_0; k < this.lider.length; k++) {
              for (let n = this.validaciones.INT_NUMBER_0; n < this.coordinador.length; n++) {
                for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                  for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                    for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                      for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                        
                      if (this.votantes[i].id_barrio == this.barrio[j].id_barrio) {
                        if (this.votantes[i].id_lider == this.lider[k].id_lider) {
                          if (this.votantes[i].id_usuario == this.coordinador[n].id_usuario) {
                            if (this.votantes[i].id_comunaB == this.comuna[l].id_comuna) {
                              if (this.votantes[i].id_comunaL == this.comuna[m].id_comuna) {
                                if (this.votantes[i].id_lugar == this.lugar[o].id_lugar) {
                                  if (this.votantes[i].id_mesa == this.mesa[p].id_mesa) {
                                    this.addVotanteAux({
                                      id_votante:this.votantes[i].id_votante,
                                      ced_votante: this.votantes[i].ced_votante,
                                      nom_lider: this.lider[k].nom_lider,
                                      nom_votante: this.votantes[i].nom_votante,
                                      nom_lugar: this.lugar[o].nom_lugar,
                                      nom_mesa: this.mesa[p].nom_mesa,
                                      nom_barrio: this.barrio[j].nom_barrio,
                                      nom_usuario: this.coordinador[n].nom_usuario,
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
        } else if(this.addVotanteAux.length == this.validaciones.INT_NUMBER_0){
          alert('En este Lugar: ' + this.seletedLugarBuscar.nom_lugar + ' No Se a Registrado ningun votante..');
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
      this.votanteService.findAllVotanteBarrio(this.seletedBarrioBuscar.id_barrio).then(resultado=>{
        this.votantes = resultado;
        if ( this.votantes.length != this.validaciones.INT_NUMBER_0) {
          for (let i = this.validaciones.INT_NUMBER_0; i < this.votantes.length; i++){
            for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
              for (let k = this.validaciones.INT_NUMBER_0; k < this.lider.length; k++) {
                for (let n = this.validaciones.INT_NUMBER_0; n < this.coordinador.length; n++) {
                  for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                    for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          
                        if (this.votantes[i].id_barrio == this.barrio[j].id_barrio) {
                          if (this.votantes[i].id_lider == this.lider[k].id_lider) {
                            if (this.votantes[i].id_usuario == this.coordinador[n].id_usuario) {
                              if (this.votantes[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.votantes[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.votantes[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.votantes[i].id_mesa == this.mesa[p].id_mesa) {
                                      this.addVotanteAux({
                                        id_votante:this.votantes[i].id_votante,
                                        ced_votante: this.votantes[i].ced_votante,
                                        nom_lider: this.lider[k].nom_lider,
                                        nom_votante: this.votantes[i].nom_votante,
                                        nom_lugar: this.lugar[o].nom_lugar,
                                        nom_mesa: this.mesa[p].nom_mesa,
                                        nom_barrio: this.barrio[j].nom_barrio,
                                        nom_usuario: this.coordinador[n].nom_usuario,
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
        }else if (this.votanteAux.length == this.validaciones.INT_NUMBER_0){
          alert('En este Barrio: ' + this.seletedBarrioBuscar.nom_barrio + ' No Se a Registrado ningun votante..');
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
      this.votanteService.findAllVotanteUsuario(this.seletedCoordinadorBuscar.id_usuario).then(resultado=>{
        this.votantes = resultado;
        if ( this.votantes.length != this.validaciones.INT_NUMBER_0) {
          for (let i = this.validaciones.INT_NUMBER_0; i < this.votantes.length; i++){
            for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
              for (let k = this.validaciones.INT_NUMBER_0; k < this.lider.length; k++) {
                for (let n = this.validaciones.INT_NUMBER_0; n < this.coordinador.length; n++) {
                  for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                    for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          
                        if (this.votantes[i].id_barrio == this.barrio[j].id_barrio) {
                          if (this.votantes[i].id_lider == this.lider[k].id_lider) {
                            if (this.votantes[i].id_usuario == this.coordinador[n].id_usuario) {
                              if (this.votantes[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.votantes[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.votantes[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.votantes[i].id_mesa == this.mesa[p].id_mesa) {
                                      this.addVotanteAux({
                                        id_votante:this.votantes[i].id_votante,
                                        ced_votante: this.votantes[i].ced_votante,
                                        nom_lider: this.lider[k].nom_lider,
                                        nom_votante: this.votantes[i].nom_votante,
                                        nom_lugar: this.lugar[o].nom_lugar,
                                        nom_mesa: this.mesa[p].nom_mesa,
                                        nom_barrio: this.barrio[j].nom_barrio,
                                        nom_usuario: this.coordinador[n].nom_usuario,
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
        }else if(this.votanteAux.length == this.validaciones.INT_NUMBER_0){
          alert('El Coordinador: ' + this.seletedCoordinadorBuscar.nom_usuario + ' No Tiene Registrado ningun votante..');
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
      this.votanteService.findAllVotanteLider(this.seletedLiderBuscar.id_lider).then(resultado=>{
        this.votantes = resultado;
        if ( this.votantes.length != this.validaciones.INT_NUMBER_0) {
          for (let i = this.validaciones.INT_NUMBER_0; i < this.votantes.length; i++){
            for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
              for (let k = this.validaciones.INT_NUMBER_0; k < this.lider.length; k++) {
                for (let n = this.validaciones.INT_NUMBER_0; n < this.coordinador.length; n++) {
                  for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                    for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          
                        if (this.votantes[i].id_barrio == this.barrio[j].id_barrio) {
                          if (this.votantes[i].id_lider == this.lider[k].id_lider) {
                            if (this.votantes[i].id_usuario == this.coordinador[n].id_usuario) {
                              if (this.votantes[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.votantes[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.votantes[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.votantes[i].id_mesa == this.mesa[p].id_mesa) {
                                      this.addVotanteAux({
                                        id_votante:this.votantes[i].id_votante,
                                        ced_votante: this.votantes[i].ced_votante,
                                        nom_lider: this.lider[k].nom_lider,
                                        nom_votante: this.votantes[i].nom_votante,
                                        nom_lugar: this.lugar[o].nom_lugar,
                                        nom_mesa: this.mesa[p].nom_mesa,
                                        nom_barrio: this.barrio[j].nom_barrio,
                                        nom_usuario: this.coordinador[n].nom_usuario,
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
        }else if(this.votanteAux.length == this.validaciones.INT_NUMBER_0){
          alert('El Lider: ' + this.seletedLiderBuscar.nom_lider + ' No Tiene Registrado ningun votante..');
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
    this.seletedVotanteAgregar.ced_votante = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedVotanteAgregar.nom_votante = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedVotanteAgregar.municipio = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedVotanteAgregar.departamento = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedVotanteAgregar.tel_votante = this.validaciones.STR_LETTER_WITHOUT;
  }

  /* Funcion que elimina lo seleccionado en base de datos */
  eliminar(votante:Votante) {
    /* dialogo de confirmacion de eliminar los datos */
    if(confirm('estas seguro de querer eliminarlo id_votante: ' + votante.ced_votante + ' nombre votante: ' + votante.nom_votante)){
      /* se llama el servicio mesa la funcion eliminar */
      this.votanteService.deleteByIdVotante(votante.id_votante).subscribe((modificado) =>{
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

  actualizar(item:Votante){
    /* llena el objeto de comuna para actualizar */
    for(let i = 0; i < this.votante.length; i++) {
      if (this.votante[i].id_votante == item.id_votante) {
        this.seletedVotanteActualizar = this.votante[i];
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
          this.seletedVotanteActualizar.id_comunaL = this.lugar[i].id_comunaL;
        }
      }
      for (let j = 0; j < this.lugarMesa.length;j++) {
        if (this.lugarMesa[j].id_lugar == this.seletedVotanteActualizar.id_lugar) {
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
        this.seletedVotanteActualizar.id_usuario = this.lider[i].id_usuario;
      }
    }
  }
  
  SelectBarrioActualizar(id_barrio:Number){
    for(let i = 0; i < this.barrio.length; i++){
      if(id_barrio == this.barrio[i].id_barrio){
        this.seletedVotanteActualizar.id_comunaB = this.barrio[i].id_comunaB;
      }
    }
  }
  
  actualizacion() {
    /* Validacion de campos Obligatorios */
    if (this.validaciones.validaCampoObligatorio(
      this.seletedVotanteActualizar.ced_votante) == this.validaciones.TRUE) {
      alert('CEDULA Obligatoria..');
    } else if (this.validaciones.validaCampoObligatorio(
      this.seletedVotanteActualizar.nom_votante) == this.validaciones.TRUE) {
      alert('NOMBRE obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedVotanteActualizar.id_comunaL) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('COMUNA DE VOTACION obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedVotanteActualizar.id_lugar) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('LUGAR DE VOTACION obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedVotanteActualizar.id_comunaB) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('COMUNA BARRIO obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedVotanteActualizar.id_barrio) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('BARRIO obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedVotanteActualizar.id_lider) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('LIDER obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedVotanteActualizar.id_usuario) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('COORDINADOR obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedVotanteActualizar.id_mesa) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('MESA obligatotio..');
    } else if (this.validaciones.validaCampoObligatorio(
      this.seletedVotanteActualizar.tel_votante) == this.validaciones.TRUE) {
      alert('TELEFONO obligatotio..');
    }

    /* Validaciones de Rangos */
    else if (this.validaciones.validacionNumeros(
      this.seletedVotanteActualizar.ced_votante) == this.validaciones.TRUE) {
      alert('Cedula: ' + this.seletedVotanteActualizar.ced_votante + ' Invalida..');
      this.seletedVotanteActualizar.ced_votante = this.validaciones.STR_LETTER_WITHOUT;
    } else if (this.validaciones.validacionNombre(
      this.seletedVotanteActualizar.nom_votante) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('NOMBRE: ' + this.seletedVotanteActualizar.nom_votante + ' Invalido..');
      this.seletedVotanteActualizar.nom_votante = this.validaciones.STR_LETTER_WITHOUT;
    } else if (this.validaciones.validacionNumeros(
      this.seletedVotanteActualizar.tel_votante) == this.validaciones.TRUE) {
      alert('TELEFONO: ' + this.seletedVotanteActualizar.tel_votante + ' Invalido..')
    } else {
      this.digitadorService.findByIdDigitadorCedula(this.seletedVotanteActualizar.ced_votante).then(resultado =>{
        this.digitador = resultado;
        /* LLamo al servicio votante para buscar los digitadores existentes */
        this.votanteService.findByIdVotanteCedula(this.seletedVotanteActualizar.ced_votante).then(resultado =>{
          this.votante = resultado
          /* LLamo al servicio usuario para buscar los digitadores existentes */
          this.loginServi.findAllUsuarioCedula(this.seletedVotanteActualizar.ced_votante).then(resultado =>{
            this.usuario = resultado;
            /* LLamo al servicio lider para buscar los digitadores existentes */
            this.liderService.findByIdLiderCedula(this.seletedVotanteActualizar.ced_votante).then(resultado =>{
              this.lider = resultado;
              if (this.digitador.length == this.validaciones.INT_NUMBER_0 && 
                this.usuario.length == this.validaciones.INT_NUMBER_0 && 
                this.lider.length == this.validaciones.INT_NUMBER_0) {
                  if (this.votante.length == this.validaciones.INT_NUMBER_0) {
                    this.votanteService.updateVotante({
                      id_votante: this.seletedVotanteActualizar.id_votante,
                      ced_votante: this.seletedVotanteActualizar.ced_votante,
                      nom_votante: this.seletedVotanteActualizar.nom_votante,
                      id_comunaL: this.seletedVotanteActualizar.id_comunaL,
                      id_lugar: this.seletedVotanteActualizar.id_lugar,
                      id_barrio: this.seletedVotanteActualizar.id_barrio,
                      id_lider: this.seletedVotanteActualizar.id_lider,
                      id_usuario: this.seletedVotanteActualizar.id_usuario,
                      municipio: this.seletedVotanteActualizar.municipio,
                      departamento: this.seletedVotanteActualizar.departamento,
                      id_comunaB: this.seletedVotanteActualizar.id_comunaB,
                      id_mesa: this.seletedVotanteActualizar.id_mesa,
                      activo: this.seletedVotanteActualizar.activo,
                      tel_votante: this.seletedVotanteActualizar.tel_votante,
                    }).subscribe((modificado) => {
                      /* se limpia el input de actualizar */
                      this.seletedVotanteActualizar.id_votante = this.validaciones.NULL;
                      /* Se da respuesta Exitosa del servidor */
                      alert("Se actualizo el votante con exito");
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
                    for (let i = 0; i < this.votante.length; i++ ) {
                      if (this.seletedVotanteActualizar.id_votante == this.votante[i].id_votante &&
                          this.seletedVotanteActualizar.ced_votante == this.votante[i].ced_votante) {
                            encuentra = this.validaciones.TRUE;
                            id_number = i;
                      }
                    }
                    if (encuentra == this.validaciones.TRUE) {
                      this.votanteService.updateVotante({
                        id_votante: this.seletedVotanteActualizar.id_votante,
                        ced_votante: this.seletedVotanteActualizar.ced_votante,
                        nom_votante: this.seletedVotanteActualizar.nom_votante,
                        id_comunaL: this.seletedVotanteActualizar.id_comunaL,
                        id_lugar: this.seletedVotanteActualizar.id_lugar,
                        id_barrio: this.seletedVotanteActualizar.id_barrio,
                        id_lider: this.seletedVotanteActualizar.id_lider,
                        id_usuario: this.seletedVotanteActualizar.id_usuario,
                        municipio: this.seletedVotanteActualizar.municipio,
                        departamento: this.seletedVotanteActualizar.departamento,
                        id_comunaB: this.seletedVotanteActualizar.id_comunaB,
                        id_mesa: this.seletedVotanteActualizar.id_mesa,
                        activo: this.seletedVotanteActualizar.activo,
                        tel_votante: this.seletedVotanteActualizar.tel_votante,
                      }).subscribe((modificado) => {
                        /* se limpia el input de actualizar */
                        this.seletedVotanteActualizar.id_votante = this.validaciones.NULL;
                        /* Se da respuesta Exitosa del servidor */
                        alert("Se actualizo el votante con exito");
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
                      alert('la Cedula: ' + this.seletedVotanteActualizar.ced_votante +'\n' +
                            'esta registrada con el nombre: ' + this.votante[id_number].nom_votante 
                            + '\n\n'
                      );
                      /* se limpia el input de actualizar */
                      this.seletedVotanteActualizar.id_votante = this.validaciones.NULL;
                      /* Recargo la pagina */
                      this.ngOnInit();
                    }
                  }
              } else if (this.digitador.length != this.validaciones.INT_NUMBER_0) {
                alert("la cedula ya Existe en digitador: " + this.seletedVotanteActualizar.ced_votante);
                this.seletedVotanteActualizar.ced_votante = this.validaciones.STR_LETTER_WITHOUT;
              } else if (this.votante.length != this.validaciones.INT_NUMBER_0) {
                alert("la cedula ya Existe en votante: " + this.seletedVotanteActualizar.ced_votante);
                this.seletedVotanteActualizar.ced_votante = this.validaciones.STR_LETTER_WITHOUT;
              } else if (this.usuario.length != this.validaciones.INT_NUMBER_0) {
                alert("la cedula ya Existe en usuario: " + this.seletedVotanteActualizar.ced_votante);
                this.seletedVotanteActualizar.ced_votante = this.validaciones.STR_LETTER_WITHOUT;
              } else if (this.lider.length != this.validaciones.INT_NUMBER_0) {
                alert("la cedula ya Existe en lider: " + this.seletedVotanteActualizar.ced_votante);
                this.seletedVotanteActualizar.ced_votante = this.validaciones.STR_LETTER_WITHOUT;
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
    this.seletedVotanteActualizar.id_votante = this.validaciones.NULL;
    this.ngOnInit();
  }

}