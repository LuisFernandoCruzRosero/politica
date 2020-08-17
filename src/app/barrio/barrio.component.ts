/* Servicios */
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BarrioService } from '../servicios/barrio.service';
import { ComunaService } from '../servicios/comuna.service';

/* Clases */
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { Token } from '../modelos/token';
import { Barrio } from '../modelos/barrio';
import { Comuna } from '../modelos/comuna';
import { BarrioAux } from '../modelos/barrio-aux';

@Component({
  selector: 'app-barrio',
  templateUrl: './barrio.component.html',
  styleUrls: ['./barrio.component.css']
})
export class BarrioComponent implements OnInit {

  /* Total de Barrios Ingresados */
  totalBarrio:any = 0;

  /* Inicializo un arreglo del objeto Barrio */
  barrios:Barrio[] = [];

  /* Inicializo un arreglo del objeto Barrio Para la busqueda*/
  barriosBuscar:Barrio[] = [];

  /* Inicializo un arreglo del objeto Barrio Para la lista sin id */
  barriosAux:BarrioAux[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];

  /* Inicializamos un arreglo del objeto Digitador */
  digitador:DigitadorFindAll[] = [];

  /* inicializamos un arreglo del objeto Comuna */
  comunas:Comuna [] = [];

  /* Inicializo el objeto Barrio Para formulario Agregar*/
  seletedBarrioAgregar:Barrio = new Barrio(null, '', '', '', '', null);

  /* Inicializo el objeto barrio Para formulario Actualizar*/
  seletedBarrioActualizar:Barrio = new Barrio(null, '', '', '', '', null);

  /* Inicializo el objeto barrio Para formulario Buscar*/
  seletedBarrioBuscar:Barrio = new Barrio(null, '', '', '', '', null);

  /* Inicializo el objeto barrio Para formulario Agregar Comuna*/
  seletedComunaAgregar:Comuna = new Comuna(null, '');

  /* Verificar la Ayutenticidad */
  encontrado:Boolean = false;

  /* Para bloquear desdel ts la viste del HTML dependiendo el tipo de usuario */
  vista:Number;

  /* Token de verificacion de logueo */
  token:Token;

  /* Se llama a login service para verificar la autenticidad de usuario */
  /* Se llama a router para poder navegar del ts a un html deacuerdo ala autenticidad */
  /* Se llama a Barrio service para poder realizar la funciones del CRUD del modulo de las mesas */
  constructor(private loginServi:LoginService, private route:Router, private barrioService:BarrioService, 
              private comunaService:ComunaService) { this.barriosAux = [] }

  ngOnInit() {
     /* Consulto los Datos de la tabla usuario */
     this.loginServi.findAllUsuario().then(resultado => {
      /* Asigno los datos de la tabla usuario al arreglo usuario */
      this.usuario = resultado;
      console.log(this.usuario);
      /* Consulto los Datos de la tabla digitador */
      this.loginServi.findAllDigitador().then(resultado => {
        /* Asigno los datos de la tabla digitador al arreglo digitador */
        this.digitador = resultado;
        /* Consulto Los datos de la tabla barrios */
        this.barrioService.findAllBarrio().then(resultado => {
          /* Asigno al arreglo Barrios todas las existenten en la tabla */
          this.barrios = resultado;
          /* Consulta los datos de la tabla comuna */
          this.comunaService.findAllComuna().then(resultado => {
            /* Asigno al arreglo Comunas todas las existenten en la tabla */
            this.comunas = resultado;
            /* consulta la cantidad de Barrio que existen en el sistema */
            this.barrioService.findByIdTotalBarrio().subscribe(resultado => { 
            this.totalBarrio = resultado;

             //if (this.encontrado == true) {
              for(let i = 0; i < this.barrios.length; i++){
                for (let j = 0; j < this.comunas.length; j++) {
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
            //}
            
            try {
              /* Consulto Tokent de Autenticidad */
              this.token=this.loginServi.findAllToken();
              /* Agrego ala variable vista el valor de tipo de usuario para bloquear permisos */
              this.vista = this.token.tipo_usuario;
              /* Busco el usuario logueado */
              for (let i = 0; i < this.usuario.length; i++) {
                if (this.usuario[i].login == this.token.user_usu && this.token.tipo_usuario == 1) {
                /* Si la encuentro cambio el estado a true */
                this.encontrado = true;
                }
              }
              /* Busco el digitador logueado */
              for (let i = 0; i< this.digitador.length; i++) {
                if (this.digitador[i].usu_digiador == this.token.user_usu && this.token.tipo_usuario == 4) {
                /* Si la encuentro cambio el estado a true */
                this.encontrado = true;
                }
              }
            } catch (e) {
              /* Si no encuentra el usuario */
              if(this.encontrado == false){
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
  }

  /* Agregar Barrio a Arreglo local par aquitar id */
  addBarrioAux(item:BarrioAux){
    this.barriosAux.push(item);
  }

}
