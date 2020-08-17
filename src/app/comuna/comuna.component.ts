/* Servicios */
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { ComunaService } from '../servicios/comuna.service';
import { HttpErrorResponse } from '@angular/common/http';

/* Clases */
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { Token } from '../modelos/token';
import { Comuna } from '../modelos/comuna';


@Component({
  selector: 'app-comuna',
  templateUrl: './comuna.component.html',
  styleUrls: ['./comuna.component.css']
})
export class ComunaComponent implements OnInit {
  /* Total de Comunas Ingresadas */
  totalComuna:Number = 0;

  /* Inicializo un arreglo del objeto Comuna */
  comunas:Comuna[] = [];

  
  /* Inicializo un arreglo del objeto Comuna Para la busqueda*/
  comunasBuscar:Comuna[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];

  /* Inicializamos un arreglo del objeto Digitador */
  digitador:DigitadorFindAll[] = [];

  /* Inicializo el objeto Comuna Para formulario Agregar*/
  seletedComunaAgregar:Comuna = new Comuna(null, '');

  /* Inicializo el objeto Comuna Para formulario Actualizar*/
  seletedComunaActualizar:Comuna = new Comuna(null, '');

  /* Inicializo el objeto Comuna Para formulario Buscar*/
  seletedComunaBuscar:Comuna = new Comuna(null, '');

  /* Verificar la Ayutenticidad */
  encontrado:Boolean = false;

  /* Para bloquear desdel ts la viste del HTML dependiendo el tipo de usuario */
  vista:Number;

  /* Token de verificacion de logueo */
  token:Token;

  /* Se llama a login service para verificar la autenticidad de usuario */
  /* Se llama a router para poder navegar del ts a un html deacuerdo ala autenticidad */
  /* Se llama a Comuna service para poder realizar la funciones del CRUD del modulo de las Comunas */

  constructor(private loginServi:LoginService, private route:Router, private comunaService:ComunaService) {}


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
        /* Consulto Los datos de la tabla Comuna */
        this.comunaService.findAllComuna().then(resultado => {
          /* Asigno al arreglo Comunas todas las existenten en la tabla */
          this.comunas = resultado;
          /* consulta la cantidad de Comunas qque existen en el sistema */
          this.comunaService.findByIdTotalComuna().subscribe(resultado=>{
            this.totalComuna = resultado;
          });
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
  
  }

  /* Funcion Guardar Comuna */
  guardar() {
    /* Para saber si lleno el campo de Agregar Comuna */
    if (this.seletedComunaAgregar.nom_comuna != '') {
      this.comunaService.findByIdComuna(this.seletedComunaAgregar.nom_comuna).then(resultado => {
        this.comunas = resultado;
        if (this.comunas.length == 0) {
          /* llama al Servicio de Comuna y la funcion de insertar comuna */
          this.comunaService.insertComuna({
            /* Agrega a los datos del objeto los que se ponen en la caja de testo de agregar */
            id_comuna: this.seletedComunaAgregar.id_comuna,
            nom_comuna: this.seletedComunaAgregar.nom_comuna,
          }).subscribe((resultado) => {
          /* Se da respuesta Exitosa del servidor */
          alert("Se Agrego la Comuna");
          /* se llama la funcion inicial para que recargue la pagina */
          this.ngOnInit();
          /* se limpia el input de agregar */
          this.seletedComunaAgregar.nom_comuna = '';
          });
        } else {
          /* Respuesta de comuna a agregar ya encontrada */
          alert('numero de Comuna :' + this.seletedComunaAgregar.nom_comuna + ' Ya Existe');
        }
      },(err:HttpErrorResponse) => {
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    } else {
      /* Respuesta en caso de no llenar el Campo de agregar Comuna */
      alert('LLene el campo: NUMERO DE COMUNA de Agregar');
    }
  }

  
  /* se llena el objeto actualizar de tipo comuna de acuerdo ala seleccionada en la lista */
  actualizar(comuna:Comuna){
    /* llena el objeto de comuna para actualizar */
    this.seletedComunaActualizar = comuna;
  }

   /* Funcion que actualiza lo seleccionado en base de datos */
   actualizacion(){
    /* se llama el servicio comuna la funcion Update comuna */
    this.comunaService.updateComuna({
      /* Agrega a los datos del objeto los que se ponen en la caja de testo de Actualizar  */
      id_comuna: this.seletedComunaActualizar.id_comuna,
      nom_comuna: this.seletedComunaActualizar.nom_comuna
    }).subscribe((modificado) => {
      /* Se da respuesta Exitosa del servidor */
      alert("Se actualizo la comuna con exito");
      /* se llama la funcion inicial para que recargue la pagina */
      this.ngOnInit();
    },(err:HttpErrorResponse) => {
      if(err.error instanceof Error){
        alert("a ocurrido un errror cliente");
      }else{
        alert("a ocurrido un errror servidor");
      }
   });
   /* se limpia el input de actualizar */
   this.seletedComunaActualizar.id_comuna = null;
  }

  /* Funcion que elimina lo seleccionado en base de datos */
  eliminar(comuna:Comuna){
    /* dialogo de confirmacion de eliminar los datos */
    if(confirm('estas seguro de querer eliminarlo id_comuna: ' + comuna.id_comuna + ' nombre comuna: ' + comuna.nom_comuna)){
      /* se llama el servicio comuna la funcion eliminar */
      this.comunaService.deleteByIdComuna(comuna.id_comuna).subscribe((modificado) =>{
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
/* Funcion que busca lo escrito en el formulario buscar */
  buscar(){
    /* Se pregunta si el umput de buscar no esta vacio */
    if (this.seletedComunaBuscar.nom_comuna != '') {
      this.comunaService.findByIdComuna(this.seletedComunaBuscar.nom_comuna).then(resultado => {
        this.comunasBuscar = resultado;
        if (this.comunasBuscar.length != 0) {
          this.comunas = this.comunasBuscar;
        } else {
          alert('la comuna :' + this.seletedComunaBuscar.nom_comuna + ' No Existe');
          this.seletedComunaBuscar.nom_comuna = '';
        }
      },(err:HttpErrorResponse) => {
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    } else {
      /* Respuesta en caso de no llenar el campo de buscar comuna */
      alert('LLene el campo: NUMERO DE COMUNA de Buscar');
    }
  }

  /* Para volver a listar la data existente en la tabla comuna */
  listar() {
    /* Se llimpia el formulario buscar */
    this.seletedComunaBuscar.nom_comuna = '';
    /* Se llimpia el formulario Agregar */
    this.seletedComunaAgregar.nom_comuna = '';
    /* esta funcion llena los arreglos de la data de la base de datos */
    this.ngOnInit();
  }
}
