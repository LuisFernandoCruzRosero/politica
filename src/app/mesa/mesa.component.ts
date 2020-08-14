/* Servicios */
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { MesaService } from '../servicios/mesa.service';
import { HttpErrorResponse } from '@angular/common/http';

/* Clases */
import { Mesa } from '../modelos/mesa';
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { Token } from '../modelos/token';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {

  /* Total de Mesas Ingresadas */
  totalMesa:Number = 0;

  /* Inicializo un arreglo del objeto Mesa */
  mesas:Mesa[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];

  /* Inicializamos un arreglo del objeto Digitador */
  digitador:DigitadorFindAll[] = [];

  /* Inicializo el objeto Mesa Vavio Para formulario Agregar*/
  seletedMesaAgregar:Mesa = new Mesa(null, '');

  /* Inicializo el objeto Mesa Vavio Para formulario Actualizar*/
  seletedMesaActualizar:Mesa = new Mesa(null, '');


  /* Verificar la Ayutenticidad */
  encontrado:Boolean = false;

  /* Para bloquear desdel ts la viste del HTML dependiendo el tipo de usuario */
  vista:Number;

  token:Token;

  /* Se llama a login service para verificar la autenticidad de usuario */
  /* Se llama a router para poder navegar del ts a un html deacuerdo ala autenticidad */
  /* Se llama a Mesa service para poder realizar la funciones del CRUD del modulo de las mesas */
  constructor(private loginServi:LoginService, private route:Router, private mesaService:MesaService) {}

  /* Funcion que se llama por defecto es la primera en ejecutarse */
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
        /* Consulto Los datos de la tabla Mesa */
        this.mesaService.findAllMesa().then(resultado => {
          /* Asigno al arreglo Mesas todas las existenten en la tabla */
          this.mesas = resultado;
          console.log(this.mesas);
          console.log(this.digitador);
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

  /* Funcion Guardar Mesa */
  guardar() {
    /* llama al Servicio de Mesa y la funcion de insertar mesa */
    this.mesaService.insertMesa({
      /* Agrega a los datos del objeto los que se ponen en la caja de testo de agregar */
      id_mesa: this.seletedMesaAgregar.id_mesa,
      nom_mesa: this.seletedMesaAgregar.nom_mesa,
    }).subscribe((resultado) =>{
      /* Se da respuesta Exitosa del servidor */
      alert("Se Agrego la Mesa");
      /* se llama la funcion inicial para que recargue la pagina */
      this.ngOnInit();
      /* se limpia el input de agregar */
      this.seletedMesaAgregar.nom_mesa = '';
    })
  }

  /* se llena el objeto actualizar de tipo mesa deacuerdo ala seleccionada en la lista */
  actualizar(mesa:Mesa){
    this.seletedMesaActualizar = mesa;
  }

  /* Funcion que actualiza lo seleccionado en base de datos */
  actualizacion(){
    /* se llama el servicio mesa la funcion Update mesa */
    this.mesaService.updateMesa({
      /* Agrega a los datos del objeto los que se ponen en la caja de testo de Actualizar  */
      id_mesa: this.seletedMesaActualizar.id_mesa,
      nom_mesa: this.seletedMesaActualizar.nom_mesa
    }).subscribe((modificado) =>{
      /* Se da respuesta Exitosa del servidor */
      alert("Se actualizo la mesa con exito");
      /* se llama la funcion inicial para que recargue la pagina */
      this.ngOnInit();
    },(err:HttpErrorResponse)=>{
      if(err.error instanceof Error){
        alert("a ocurrido un errror cliente");
      }else{
        alert("a ocurrido un errror servidor");
      }
   });
   /* se limpia el input de actualizar */
   this.seletedMesaActualizar.id_mesa = null;
  }

  /* Funcion que elimina lo seleccionado en base de datos */
  eliminar(mesa:Mesa){
    /* dialogo de confirmacion de eliminar los datos */
    if(confirm('estas seguro de querer eliminarlo id_mesa: ' + mesa.id_mesa + ' nombre mesa: ' + mesa.nom_mesa)){
      /* se llama el servicio mesa la funcion eliminar */
      this.mesaService.deleteByIdMesa(mesa.id_mesa).subscribe((modificado) =>{
        /* Se da respuesta Exitosa del servidor */
        alert('Registro Eliminado Exito');
        /* se llama la funcion inicial para que recargue la pagina */
        this.ngOnInit();
      },(err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    }
  }
}
