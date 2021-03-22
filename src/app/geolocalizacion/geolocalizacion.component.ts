/** Servicios **/
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


/** clases **/
import { Validaciones } from '../modelos/validaciones';
import { LoginService } from '../servicios/login.service';
import { LugarService } from '../servicios/lugar.service';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { Lugar } from '../modelos/lugar';
import { Token } from '../modelos/token';
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { VotanteService } from '../servicios/votante.service';
import { LiderService } from '../servicios/lider.service';
import { Lider } from '../modelos/lider';
import { Votante } from '../modelos/votante';
import { Grolocalizacion } from '../modelos/grolocalizacion';
import { RegistraduriaService } from '../servicios/registraduria.service';
import { Registraduria } from '../modelos/registraduria';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.component.html',
  styleUrls: ['./geolocalizacion.component.css']
})
export class GeolocalizacionComponent implements OnInit {

   /* Llamo ala clase validaciones */
   validaciones = new Validaciones();

  /* Inicializo un arreglo del objeto Lugar */
  lugares:Lugar[] = [];

    /* Inicializo un arreglo del objeto Lugar */
    registraduria:Registraduria[] = [];

  
  numberActual:number = this.validaciones.INT_NUMBER_0;

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];

  /* Inicializamos un arreglo del objeto Digitador */
  digitador:DigitadorFindAll[] = [];

  lideres:Lider[] = [];

  /* Inicializo un arreglo del objeto Agenda */
  votantes:Votante[] = [];

  /* Token de verificacion de logueo */
  token:Token;

  /* Objeto con la info necesaria para el mapa */
  geolocalizacion:Grolocalizacion[] = [];

  /* Verificar la Autenticidad */
  encontrado:Boolean = this.validaciones.FALSE;

  /* Para bloquear desdel ts la viste del HTML dependiendo el tipo de usuario */
  vista:Number;

  iconMapAzul = {
    iconUrl:"https://res.cloudinary.com/dav1dm9fk/image/upload/v1615433516/mapmarkerflat_106000_cuboew.png",
    iconHeig:10
  }

  iconMapRed = {
    iconUrl:"https://res.cloudinary.com/dav1dm9fk/image/upload/v1615433539/map-marker-icon_34392_gcylhy.png",
    iconHeig:10
  }

  iconMapGreen = {
    iconUrl:"https://res.cloudinary.com/dav1dm9fk/image/upload/v1615433891/mapmarker_marker_outside_chartreuse_23006_iwd828.png",
    iconHeig:10
  }

  iconMapYellow = {
    iconUrl:"https://res.cloudinary.com/dav1dm9fk/image/upload/v1615433912/mapmarker_106655_qoj1bp.png",
    iconHeig:10
  }

  title = 'map';
  lat = 1.8198884;
  lng = -78.7529967;
  zoom = 14;

  constructor(private loginServi:LoginService, private lugarService:LugarService, 
              private liderService:LiderService, private votanteService:VotanteService, private registraduriaService:RegistraduriaService
              ) { this.geolocalizacion = [] }

  ngOnInit() {
    /* se vacia el arreglo */
    this.geolocalizacion = [];
     /* Consulto los Datos de la tabla usuario */
     this.loginServi.findAllUsuario().then(resultado => {
      /* Asigno los datos de la tabla usuario al arreglo usuario */
      this.usuario = resultado;
      /* Consulto los Datos de la tabla digitador */
      this.loginServi.findAllDigitador().then(resultado => {
        /* Asigno los datos de la tabla digitador al arreglo digitador */
        this.digitador = resultado;
        this.liderService.findAllLider().then(resultado => {
          /* Asigno al arreglo votantes todas las existenten en la tabla */
          this.lideres = resultado;
          this.votanteService.findAllVotante().then(resultado => {
            /* Asigno al arreglo votantes todas las existenten en la tabla */
            this.votantes = resultado;
            /* Consulto Los datos de la tabla Lugares */
            this.lugarService.findAllLugar().then(resultado => {
              /* Asigno al arreglo Lugares todas las existenten en la tabla */
              this.lugares = resultado;
              this.registraduriaService.findAllRegistraduria().then(resultado => {
                /* Registraduria */
                this.registraduria = resultado;
                for (let m = this.validaciones.INT_NUMBER_0; m < this.lugares.length; m++) {
                  this.numberActual = this.validaciones.INT_NUMBER_0;
                    for (let l = this.validaciones.INT_NUMBER_0; l < this.votantes.length; l++) {                        
                      if (this.votantes[l].id_lugar == this.lugares[m].id_lugar) {
                        this.numberActual = this.numberActual + this.validaciones.INT_NUMBER_1;
                      }
                    }

                    for (let k = this.validaciones.INT_NUMBER_0; k < this.lideres.length; k++) {
                      if (this.lideres[k].id_lugar == this.lugares[m].id_lugar) {
                        this.numberActual = this.numberActual + this.validaciones.INT_NUMBER_1;
                      }                     
                    }

                    for (let j = this.validaciones.INT_NUMBER_0; j < this.digitador.length; j++) {
                      if (this.digitador[j].id_lugar == this.lugares[m].id_lugar) {
                        this.numberActual = this.numberActual + this.validaciones.INT_NUMBER_1;
                      }
                    }
                    
                    for (let i = this.validaciones.INT_NUMBER_0; i < this.usuario.length; i++) {
                    if (this.usuario[i].id_lugar == this.lugares[m].id_lugar) {
                      this.numberActual = this.numberActual + this.validaciones.INT_NUMBER_1;
                    }

                  }
                for (let r = this.validaciones.INT_NUMBER_0; r < this.registraduria.length; r++) {
                  if (this.registraduria[r].id_lugar == this.lugares[m].id_lugar) {
                    this.addGeolocalizacionAux({
                      id_lugar: this.lugares[m].id_lugar,
                      nom_lugar: this.lugares[m].nom_lugar,
                      latitud: this.lugares[m].latitud,
                      longitud: this.lugares[m].longitud,
                      actual: this.numberActual,
                      total: this.registraduria[r].total
                    })
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
                  /* Se pregunta si el tipo de usuario logueado es tipo 1 */
                  if (this.usuario[i].login == this.token.user_usu && this.token.tipo_usuario == this.validaciones.INT_NUMBER_1) {
                  /* Si la encuentro cambio el estado a true */
                  this.encontrado = this.validaciones.TRUE;
                  }
                }
                /* Busco el digitador logueado */
                for (let i = this.validaciones.INT_NUMBER_0; i< this.digitador.length; i++) {
                  /* Se pregunta si el tipo de usuario logueado es tipo 4 */
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
  }

  addGeolocalizacionAux(item:Grolocalizacion) {
    this.geolocalizacion.push(item);
  }
}
