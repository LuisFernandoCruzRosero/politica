/*Servicios*/
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ComunaService } from '../servicios/comuna.service';
import { LugarService } from '../servicios/lugar.service';
import { LiderService } from '../servicios/lider.service';
import { BarrioService } from '../servicios/barrio.service';
import { MesaService } from '../servicios/mesa.service';
import { UsuarioService } from '../servicios/usuario.service';
import { VotanteService } from '../servicios/votante.service';

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
import { DigitadorService } from '../servicios/digitador.service';
import { LiderAux } from '../modelos/lider-aux';
import { Votante } from '../modelos/votante';

@Component({
  selector: 'app-lider',
  templateUrl: './lider.component.html',
  styleUrls: ['./lider.component.css']
})
export class LiderComponent implements OnInit {

  /* Llamo ala clase validaciones */
  validaciones = new Validaciones();

  /* Total de Agendas Ingresadas */
  totalLider:any = 0;

  /* Inicializo un arreglo del objeto Agenda */
  lideres:Lider[] = [];
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
  /* Inicializo un arreglo del objeto votante */
  votante:Votante[] = [];
  /* Inicializo un arreglo del objeto Lider */
  lider:Lider[] = [];
   /* Inicializo un arreglo del objeto Lider */
   liderAux:LiderAux[] = [];
  

  /* Inicializo un arreglo del objeto Agenda Para la busqueda*/
  lideresBuscar:Lider[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];

  /* Inicializamos un arreglo del objeto Digitador */
  digitador:DigitadorFindAll[] = [];

  /* Inicializo el objeto Agenda Para formulario Agregar*/
  seletedLiderAgregar:Lider = new Lider(this.validaciones.NULL, 
   this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, 
   this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,this.validaciones.NULL,this.validaciones.NULL,
   this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT,
   );

    /* Inicializo el objeto Agenda Para formulario listar*/
    seletedLiderListar:Lider = new Lider(this.validaciones.NULL, 
      this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, 
      this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,this.validaciones.NULL,this.validaciones.NULL,
      this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT,
      );
   
 
  /* Inicializo el objeto Agenda Para formulario Actualizar*/
  seletedLiderActualizar:Lider = new Lider(this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,this.validaciones.NULL,this.validaciones.NULL,
    this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT,
    );
 

  /* Inicializo el objeto Mesa Para formulario Buscar*/
  seletedLiderBuscar:Lider = new Lider(this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,this.validaciones.NULL,this.validaciones.NULL,
    this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT,
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

  constructor(private loginServi:LoginService, private route:Router, private comunaService:ComunaService, private lugarService:LugarService, private barrioService:BarrioService,
    private mesaService:MesaService, private liderService:LiderService,private votanteService:VotanteService, private digitadorService:DigitadorService) { this.liderAux = [] }

  /* Funcion que se llama por defecto es la primera en ejecutarse */
 

  ngOnInit() {

    /*se limpia arreglo aux para volver a llenar*/
    this.liderAux = [];
    /* Consulto los Datos de la tabla usuario */
    this.loginServi.findAllUsuario().then(resultado => {
      /* Asigno los datos de la tabla usuario al arreglo usuario */
      this.usuario = resultado;
      /* Consulto los Datos de la tabla digitador */
      this.loginServi.findAllDigitador().then(resultado => {
        /* Asigno los datos de la tabla digitador al arreglo digitador */
        this.digitador = resultado;
        /* Consulto Los datos de la tabla votante */
        this.liderService.findAllLider().then(resultado => {
          /* Asigno al arreglo votantes todas las existenten en la tabla */
          this.lideres = resultado;
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
          this.liderService.findByIdTotalLider().subscribe(resultado=>{
            this.totalLider = resultado;
          });

          for (let i = this.validaciones.INT_NUMBER_0; i < this.lideres.length; i++){
            for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
                for (let n = this.validaciones.INT_NUMBER_0; n < this.usuario.length; n++) {
                  for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                    for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          
                        if (this.lideres[i].id_barrio == this.barrio[j].id_barrio) {
                            if (this.lideres[i].id_usuario == this.usuario[n].id_usuario) {
                              if (this.lideres[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.lideres[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.lideres[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.lideres[i].id_mesa == this.mesa[p].id_mesa) {
                                      console.log('entro');
                                      this.addLiderAux({
                                        id_lider:this.lideres[i].id_lider,
                                        ced_lider: this.lideres[i].ced_lider,
                                        nom_lider: this.lideres[i].nom_lider,
                                        nom_lugar: this.lugar[o].nom_lugar,
                                        nom_mesa: this.mesa[p].nom_mesa,
                                        nom_barrio: this.barrio[j].nom_barrio,
                                        nom_usuario: this.usuario[n].nom_usuario,
                                        tel_lider : this.lideres[i].tel_lider,
                                        activo : this.validaciones.TRUE,
                                        comuna_lugar: this.comuna[m].nom_comuna,
                                        comuna_barrio: this.comuna[l].nom_comuna,
                                        municipio: this.lideres[i].municipio,
                                        departamento: this.lideres[i].departamento
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
    if (this.validaciones.validaCampoObligatorio(this.seletedLiderAgregar.nom_lider) == this.validaciones.TRUE) {
      alert('CAMPO NOMBRE VOTANTE OBLIGATORIO..');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedLiderAgregar.ced_lider) == this.validaciones.TRUE) {
      alert('CAMPO CEDULA VOTANTE OBLIGATORIO.. ');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedLiderAgregar.municipio) == this.validaciones.TRUE) {
      alert('CAMPO MUNICIPIO VOTANTE OBLIGATORIO.. ');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedLiderAgregar.departamento) == this.validaciones.TRUE) {
      alert('CAMPO DEPARTAMENTO VOTANTE OBLIGATORIO.. ');
    } else if (this.validaciones.validacionNombre(this.seletedLiderAgregar.nom_lider) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO NOMBRE INVALIDO: ' + this.seletedLiderAgregar.nom_lider);
    } else if (this.validaciones.validacionNombre(this.seletedLiderAgregar.municipio) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO MUNICIPIO INVALIDO: ' + this.seletedLiderAgregar.municipio);
    } else if (this.validaciones.validacionNombre(this.seletedLiderAgregar.departamento) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO DEPARTAMENTO INVALIDO: ' + this.seletedLiderAgregar.departamento);
    } else if (this.validaciones.validacionNumerico(this.seletedLiderAgregar.ced_lider) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO CEDULA INVALIDO: ' + this.seletedLiderAgregar.ced_lider);
    } else if (this.validaciones.validacionNumerico(this.seletedLiderAgregar.tel_lider) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO TELEFONO INVALIDO: ' + this.seletedLiderAgregar.tel_lider);
    } else {
      /* LLamo al servicio votante para buscar los votantes existentes */
      this.votanteService.findByIdVotanteCedula(this.seletedLiderAgregar.ced_lider).then(resultado =>{
        /* Se llena el arreglo votantes con la data seleccionada en la busqueda */
        this.votantes = resultado;
      /* LLamo al servicio digitador para buscar los votantes existentes */
      this.digitadorService.findByIdDigitadorCedula(this.seletedLiderAgregar.ced_lider).then(resultado =>{
        /* Se llena el arreglo digitador con la data seleccionada en la busqueda */
        this.digitador = resultado;
        /* LLamo al servicio lider para buscar los votantes existentes */
      this.liderService.findByIdLiderCedula(this.seletedLiderAgregar.ced_lider).then(resultado =>{
        /* Se llena el arreglo lider con la data seleccionada en la busqueda */
        this.lider = resultado;
        /* LLamo al servicio Usuario para buscar los votantes existentes */
      this.loginServi.findAllUsuarioCedula(this.seletedLiderAgregar.ced_lider).then(resultado =>{
        /* Se llena el arreglo Usuario con la data seleccionada en la busqueda */
        this.usuario = resultado;
         /* Se pregunta si barrios contiene datos */
        if (this.lideres.length == this.validaciones.INT_NUMBER_0 && this.digitador.length == this.validaciones.INT_NUMBER_0 &&
          this.usuario.length == this.validaciones.INT_NUMBER_0 && this.lider.length == this.validaciones.INT_NUMBER_0 ) {
          /* llama el servicio de agregar un barrio en la tabla barrio */
          this.liderService.insertLider({
            /* Se envia la data diligenciada en el formulario */
            id_lider:this.seletedLiderAgregar.id_lider,
            ced_lider: this.seletedLiderAgregar.ced_lider,
            nom_lider: this.seletedLiderAgregar.nom_lider,
            id_lugar: this.seletedLiderAgregar.id_lugar,
            id_mesa: this.seletedLiderAgregar.id_mesa,
            id_barrio: this.seletedLiderAgregar.id_barrio,
            id_usuario: this.seletedLiderAgregar.id_usuario,
            tel_lider : this.seletedLiderAgregar.tel_lider,
            activo : this.validaciones.TRUE,
            id_comunaL: this.seletedLiderAgregar.id_comunaL,
            id_comunaB: this.seletedLiderAgregar.id_comunaB,
            municipio: this.seletedLiderAgregar.municipio,
            departamento: this.seletedLiderAgregar.departamento
          }).subscribe((resultado) => {
            /* Se da respuesta Exitosa del servidor */
            alert("Se Agrego EL LIDER");
            /* se llama la funcion inicial para que recargue la pagina */
            this.ngOnInit();
            /* se limpia el input de agregar */
            this.seletedLiderAgregar.nom_lider = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedLiderAgregar.ced_lider = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedLiderAgregar.tel_lider = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedLiderAgregar.municipio = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedLiderAgregar.departamento = this.validaciones.STR_LETTER_WITHOUT;
          });
        } else if (this.lideres.length != this.validaciones.INT_NUMBER_0) { 
          alert("la cedula ya exite en votante: " + this.seletedLiderAgregar.ced_lider);
        } else if (this.digitador.length != this.validaciones.INT_NUMBER_0) {
          alert("la cedula ya exite en digitador: " + this.seletedLiderAgregar.ced_lider);
        } else if (this.usuario.length != this.validaciones.INT_NUMBER_0) {
          alert("la cedula ya exite en usuario: " + this.seletedLiderAgregar.ced_lider);
        } else if (this.lider.length != this.validaciones.INT_NUMBER_0) {
          alert("la cedula ya exite en lider: " + this.seletedLiderAgregar.ced_lider);
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
 
  addLiderAux(item:LiderAux) {
    this.liderAux.push(item);
  }
}
