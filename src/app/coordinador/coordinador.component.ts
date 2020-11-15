import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ComunaService } from '../servicios/comuna.service';
import { LugarService } from '../servicios/lugar.service';
import { BarrioService } from '../servicios/barrio.service';import { MesaService } from '../servicios/mesa.service';
import { UsuarioService } from '../servicios/usuario.service';
import { VotanteService } from '../servicios/votante.service';
import { DigitadorService } from '../servicios/digitador.service';
import { LiderService } from '../servicios/lider.service';

/* Clases */
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { Token } from '../modelos/token';
import { Validaciones } from '../modelos/validaciones';
import { Comuna } from '../modelos/comuna';
import { Lugar } from '../modelos/lugar';
import { Barrio } from '../modelos/barrio';
import { Mesa } from '../modelos/mesa';
import { Lider } from '../modelos/lider';
import { Votante } from '../modelos/votante';
import { CoordinadorAux } from '../modelos/coordinador-aux';





@Component({
  selector: 'app-coordinador',
  templateUrl: './coordinador.component.html',
  styleUrls: ['./coordinador.component.css']
})
export class CoordinadorComponent implements OnInit {

  /* Llamo ala clase validaciones */
  validaciones = new Validaciones();

  /* Total de Agendas Ingresadas */
  totalCoordinador:any = 0;

  /* Inicializo un arreglo del objeto coordinador */
  coordinadorAux:CoordinadorAux[] = [];
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
  
  /* Inicializo un arreglo del objeto Agenda */
  votantes:Votante[] = [];

  /* Inicializo un arreglo del objeto Agenda Para la busqueda*/
  lideresBuscar:Lider[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];
  /* Inicializamos un arreglo del objeto Usuaio para Coordinador */
  coordinadores:UsuarioFindAll[] = [];

  /* Inicializamos un arreglo del objeto Digitador */
  digitador:DigitadorFindAll[] = [];

  /* Inicializo el objeto Agenda Para formulario Agregar*/
  seletedCoordinadorAgregar:UsuarioFindAll = new UsuarioFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
   this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, 
   this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT,
   this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,
   this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,
   this.validaciones.STR_LETTER_WITHOUT,
   );

    /* Inicializo el objeto Agenda Para formulario listar*/
    seletedCoordinadorListar:UsuarioFindAll = new UsuarioFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
      this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, 
      this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT,
      this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,
      this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,
      this.validaciones.STR_LETTER_WITHOUT,
      );
   
 
  /* Inicializo el objeto Agenda Para formulario Actualizar*/
  seletedCoordinadorActualizar:UsuarioFindAll = new UsuarioFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,
    this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT,
    );
 

  /* Inicializo el objeto Mesa Para formulario Buscar*/
  seletedCoordinadorBuscar:UsuarioFindAll = new UsuarioFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,
    this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT,
    );
 
 

  /* Verificar la Ayutenticidad */
  encontrado:Boolean = this.validaciones.FALSE;

  /* Para bloquear desdel ts la viste del HTML dependiendo el tipo de usuario */
  vista:Number;

  /* Token de verificacion de logueo */
  token:Token;

  /* Se llama a login service para verificar la autenticidad de usuario */
  /* Se llama a router para poder navegar del ts a un html deacuerdo ala autenticidad */
  /* Se llama a Mesa service para poder realizar la funciones del CRUD del modulo de las mesas */

  constructor(private loginServi:LoginService, private route:Router, private comunaService:ComunaService, 
    private lugarService:LugarService, private barrioService:BarrioService, private mesaService:MesaService,
    private usuarioService:UsuarioService, private votanteService:VotanteService, private digitadorService:DigitadorService,
    private liderService:LiderService,) { }

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
        /* Consulto Los datos de la tabla votante */
        this.loginServi.findAllUsuarioCoordinador().then(resultado => {
          /* Asigno al arreglo votantes todas las existenten en la tabla */
          this.coordinadores = resultado;
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
          /* consulta la cantidad de Agendas que existen en el sistema */
          this.loginServi.findByIdTotalUsuarioCoordinador().subscribe(resultado=>{
            this.totalCoordinador = resultado;
          });

          for (let i = this.validaciones.INT_NUMBER_0; i < this.coordinadores.length; i++){
            for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
                for (let n = this.validaciones.INT_NUMBER_0; n < this.usuario.length; n++) {
                  for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                    for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          
                        if (this.coordinadores[i].id_barrio == this.barrio[j].id_barrio) {
                            if (this.coordinadores[i].id_usuario == this.usuario[n].id_usuario) {
                              if (this.coordinadores[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.coordinadores[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.coordinadores[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.coordinadores[i].id_mesa == this.mesa[p].id_mesa) {
                                      console.log('entro');
                                      this.addCoordinadorAux({
                                        id_usuario:this.coordinadores[i].id_usuario,
                                        ced_usuario: this.coordinadores[i].ced_usuario,
                                        nom_usuario: this.coordinadores[i].nom_usuario,
                                        nom_lugar: this.lugar[o].nom_lugar,
                                        nom_mesa: this.mesa[p].nom_mesa,
                                        nom_barrio: this.barrio[j].nom_barrio,
                                        login:this.coordinadores[i].login,
                                        contrasena:this.coordinadores[i].contrasena,
                                        id_tipo_usuario:this.coordinadores[i].id_tipo_usuario,
                                        tel_usuario : this.coordinadores[i].tel_usuario,
                                        activo : this.validaciones.TRUE,
                                        nom_comunaB: this.comuna[m].nom_comuna,
                                        nom_comunaL: this.comuna[l].nom_comuna,
                                        municipio: this.coordinadores[i].municipio,
                                        departamento: this.coordinadores[i].departamento
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

  /*  Funcion Guardar Votante */
  guardar() {
    /* Validacion de Campos Obligatorios y invalidos */
    if (this.validaciones.validaCampoObligatorio(this.seletedCoordinadorAgregar.nom_usuario) == this.validaciones.TRUE) {
      alert('CAMPO NOMBRE VOTANTE OBLIGATORIO..');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedCoordinadorAgregar.ced_usuario) == this.validaciones.TRUE) {
      alert('CAMPO CEDULA VOTANTE OBLIGATORIO.. ');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedCoordinadorAgregar.municipio) == this.validaciones.TRUE) {
      alert('CAMPO MUNICIPIO VOTANTE OBLIGATORIO.. ');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedCoordinadorAgregar.departamento) == this.validaciones.TRUE) {
      alert('CAMPO DEPARTAMENTO VOTANTE OBLIGATORIO.. ');
    } else if (this.validaciones.validacionNombre(this.seletedCoordinadorAgregar.nom_usuario) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO NOMBRE INVALIDO: ' + this.seletedCoordinadorAgregar.nom_usuario);
    } else if (this.validaciones.validacionNombre(this.seletedCoordinadorAgregar.municipio) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO MUNICIPIO INVALIDO: ' + this.seletedCoordinadorAgregar.municipio);
    } else if (this.validaciones.validacionNombre(this.seletedCoordinadorAgregar.departamento) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO DEPARTAMENTO INVALIDO: ' + this.seletedCoordinadorAgregar.departamento);
    } else if (this.validaciones.validacionNumerico(this.seletedCoordinadorAgregar.ced_usuario) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO CEDULA INVALIDO: ' + this.seletedCoordinadorAgregar.ced_usuario);
    } else if (this.validaciones.validacionNumerico(this.seletedCoordinadorAgregar.tel_usuario) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO TELEFONO INVALIDO: ' + this.seletedCoordinadorAgregar.tel_usuario);
    } else {
     /* LLamo al servicio votante para buscar los votantes existentes */
     this.votanteService.findByIdVotanteCedula(this.seletedCoordinadorAgregar.ced_usuario).then(resultado =>{
      /* Se llena el arreglo votantes con la data seleccionada en la busqueda */
      this.votantes = resultado;
      /* LLamo al servicio digitador para buscar los votantes existentes */
      this.digitadorService.findByIdDigitadorCedula(this.seletedCoordinadorAgregar.ced_usuario).then(resultado =>{
        /* Se llena el arreglo digitador con la data seleccionada en la busqueda */
        this.digitador = resultado;
        /* LLamo al servicio lider para buscar los votantes existentes */
      this.liderService.findByIdLiderCedula(this.seletedCoordinadorAgregar.ced_usuario).then(resultado =>{
        /* Se llena el arreglo lider con la data seleccionada en la busqueda */
        this.lider = resultado;
        /* LLamo al servicio Usuario para buscar los votantes existentes */
      this.loginServi.findAllUsuarioCedula(this.seletedCoordinadorAgregar.ced_usuario).then(resultado =>{
        /* Se llena el arreglo Usuario con la data seleccionada en la busqueda */
        this.usuario = resultado;
         /* Se pregunta si barrios contiene datos */
        if (this.coordinadores.length == this.validaciones.INT_NUMBER_0 && this.digitador.length == this.validaciones.INT_NUMBER_0 &&
          this.usuario.length == this.validaciones.INT_NUMBER_0 && this.lider.length == this.validaciones.INT_NUMBER_0 ) {
          /* llama el servicio de agregar un barrio en la tabla barrio */
          this.loginServi.insertCoordinador({
            /* Se envia la data diligenciada en el formulario */
            id_usuario:this.seletedCoordinadorAgregar.id_usuario,
            ced_usuario: this.seletedCoordinadorAgregar.ced_usuario,
            nom_usuario: this.seletedCoordinadorAgregar.nom_usuario,
            id_lugar: this.seletedCoordinadorAgregar.id_lugar,
            id_mesa: this.seletedCoordinadorAgregar.id_mesa,
            id_barrio: this.seletedCoordinadorAgregar.id_barrio,
            login: this.seletedCoordinadorAgregar.login,
            contrasena: this.seletedCoordinadorAgregar.contrasena,
            id_tipo_usuario:3,
            tel_usuario : this.seletedCoordinadorAgregar.tel_usuario,
            activo : this.validaciones.TRUE,
            id_comunaL: this.seletedCoordinadorAgregar.id_comunaL,
            id_comunaB: this.seletedCoordinadorAgregar.id_comunaB,
            municipio: this.seletedCoordinadorAgregar.municipio,
            departamento: this.seletedCoordinadorAgregar.departamento
          }).subscribe((resultado) => {
            /* Se da respuesta Exitosa del servidor */
            alert("Se Agrego EL LIDER");
            /* se llama la funcion inicial para que recargue la pagina */
            this.ngOnInit();
            /* se limpia el input de agregar */
            this.seletedCoordinadorAgregar.nom_usuario = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedCoordinadorAgregar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedCoordinadorAgregar.tel_usuario = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedCoordinadorAgregar.municipio = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedCoordinadorAgregar.departamento = this.validaciones.STR_LETTER_WITHOUT;
          });
        } else if (this.coordinadores.length != this.validaciones.INT_NUMBER_0) { 
          alert("la cedula ya exite en votante: " + this.seletedCoordinadorAgregar.ced_usuario);
        } else if (this.digitador.length != this.validaciones.INT_NUMBER_0) {
          alert("la cedula ya exite en digitador: " + this.seletedCoordinadorAgregar.ced_usuario);
        } else if (this.usuario.length != this.validaciones.INT_NUMBER_0) {
          alert("la cedula ya exite en usuario: " + this.seletedCoordinadorAgregar.ced_usuario);
        } else if (this.lider.length != this.validaciones.INT_NUMBER_0) {
          alert("la cedula ya exite en lider: " + this.seletedCoordinadorAgregar.ced_usuario);
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
 
  addCoordinadorAux(item:CoordinadorAux) {
    this.coordinadorAux.push(item);

  }
}
