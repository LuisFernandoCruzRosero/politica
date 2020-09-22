/* Servicios */
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AgendaService } from '../servicios/agenda.service';


/* Clases */
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { Token } from '../modelos/token';
import { Validaciones } from '../modelos/validaciones';
import { Agenda } from '../modelos/agenda';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
   /* Llamo ala clase validaciones */
   validaciones = new Validaciones();

   /* Total de Agendas Ingresadas */
   totalAgenda:any = 0;
 
   /* Inicializo un arreglo del objeto Agenda */
   agendas:Agenda[] = [];
 
   /* Inicializo un arreglo del objeto Agenda Para la busqueda*/
   agendasBuscar:Agenda[] = [];
 
   /* Inicializamos un arreglo del objeto Usuaio */
   usuario:UsuarioFindAll[] = [];
 
   /* Inicializamos un arreglo del objeto Digitador */
   digitador:DigitadorFindAll[] = [];
 
   /* Inicializo el objeto Agenda Para formulario Agregar*/
   seletedAgendaAgregar:Agenda = new Agenda(this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL);
 
   /* Inicializo el objeto Agenda Para formulario Actualizar*/
   seletedAgendaActualizar:Agenda = new Agenda(this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL);
 
   /* Inicializo el objeto Mesa Para formulario Buscar*/
   seletedAgendaBuscar:Agenda = new Agenda(this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL);
 
   /* Verificar la Ayutenticidad */
   encontrado:Boolean = this.validaciones.FALSE;
 
   /* Para bloquear desdel ts la viste del HTML dependiendo el tipo de usuario */
   vista:Number;
 
   /* Token de verificacion de logueo */
   token:Token;
 
   /* Se llama a login service para verificar la autenticidad de usuario */
   /* Se llama a router para poder navegar del ts a un html deacuerdo ala autenticidad */
   /* Se llama a Mesa service para poder realizar la funciones del CRUD del modulo de las mesas */
 

  constructor(private loginServi:LoginService, private route:Router, private agendaService:AgendaService) {}

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
        /* Consulto Los datos de la tabla Agenda */
        this.agendaService.findAllAgenda().then(resultado => {
          /* Asigno al arreglo Agendas todas las existenten en la tabla */
          this.agendas = resultado;
          /* consulta la cantidad de Agendas que existen en el sistema */
          this.agendaService.findByIdTotalAgenda().subscribe(resultado=>{
            this.totalAgenda = resultado;
          });
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
  }

   /* Funcion Guardar Agenda */
   guardar() {
    /* Para saber si lleno el campo de Agregar Agenda */
    if (this.validaciones.validaCampoObligatorio(this.seletedAgendaAgregar.descripcion) == this.validaciones.TRUE) {
      alert('CAMPO DESCRIPCION DE AGENDA OBLIGATORIO..');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedAgendaAgregar.descripcion) == this.validaciones.TRUE) {
      alert('CAMPO DESCRIPCION DE AGENDA OBLIGATORIO..');
    
    } else {
      console.log(this.seletedAgendaAgregar)
      /* Se llama al servicio para buscar una Agenda en la tabla para asi insertar o no la Agenda */
      /*---this.agendaService.findByIdAgenda(this.seletedAgendaAgregar.descripcion).then(resultado => {
        /* Se Asigna al arreglo Agendas el resultado de la busqueda */
       /*--- this.agendas = resultado;
        /* Se pregunta si Agenda contiene datos */
        /*---if (this.agendas.length == this.validaciones.INT_NUMBER_0) {
          /* llama al Servicio de Agenda y la funcion de insertar agenda */
          this.agendaService.insertAgenda({
            /* Agrega a los datos del objeto los que se ponen en la caja de testo de agregar */
            id_agenda: this.seletedAgendaAgregar.id_agenda,
            id_usuario: this.seletedAgendaAgregar.id_usuario,
            descripcion: this.seletedAgendaAgregar.descripcion,
            fecha: this.seletedAgendaAgregar.fecha,
            lugar: this.seletedAgendaAgregar.lugar,
            hora: this.seletedAgendaAgregar.hora,
            
          }).subscribe((resultado) => {
          /* Se da respuesta Exitosa del servidor */
          alert("Se Agrego la agenda");
          /* se llama la funcion inicial para que recargue la pagina */
          this.ngOnInit();
          /* se limpia el input de agregar */
          this.seletedAgendaAgregar.descripcion = this.validaciones.STR_LETTER_WITHOUT;
          });
       
    }
  }

  /* se llena el objeto actualizar de tipo mesa deacuerdo ala seleccionada en la lista */
  actualizar(agenda:Agenda) {
  /* llena el objeto de agenda para actualizar */
  this.seletedAgendaActualizar = agenda;
  console.log(this.seletedAgendaActualizar)
  }

  /* Funcion que actualiza lo seleccionado en base de datos */
  actualizacion() {
    if (this.validaciones.validaCampoObligatorio(this.seletedAgendaActualizar.descripcion) == this.validaciones.TRUE) {
      /* se limpia el input de actualizar */
      this.seletedAgendaActualizar.id_agenda = this.validaciones.NULL;
      alert('CAMPO NOMBRE AGENDA OBLIGATORIO..' + this.seletedAgendaActualizar.descripcion);
      /* se limpia el input de actualizar */
      this.ngOnInit();
      /* se limpia el input de actualizar */
      this.seletedAgendaActualizar.id_agenda = this.validaciones.NULL;
      alert('CAMPO NOMBRE AGENDA INVALIDO..' + this.seletedAgendaActualizar.descripcion);
      /* se limpia el input de actualizar */
      this.ngOnInit();
    } else {
      /* Se llama al servicio para buscar una mesa en la tabla para asi insertar o no la mesa */
      /*--.agendaService.findByIdAgenda(this.seletedAgendaActualizar.descripcion).then(resultado => {
        /* Se Asigna al arreglo mesas el resultado de la busqueda */
       /*  this.agendas = resultado;
        /* Se pregunta si el arreglo mesas esta vacio */
       /*--- if (this.agendas.length == this.validaciones.INT_NUMBER_0) {
          /* se llama el servicio mesa la funcion Update mesa */
          this.agendaService.updateAgenda({
            /* Agrega a los datos del objeto los que se ponen en la caja de texto de Actualizar  */
            id_agenda: this.seletedAgendaActualizar.id_agenda,
            id_usuario: this.seletedAgendaActualizar.id_usuario,
            descripcion: this.seletedAgendaActualizar.descripcion,
            fecha: this.seletedAgendaActualizar.fecha,
            hora: this.seletedAgendaActualizar.hora,
            lugar: this.seletedAgendaActualizar.lugar,
            
          }).subscribe((modificado) => {
            /* se limpia el input de actualizar */
            this.seletedAgendaActualizar.id_agenda = this.validaciones.NULL;
            /* Se da respuesta Exitosa del servidor */
            alert("Se actualizo la agenda con exito");
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
  /* Funcion que elimina lo seleccionado en base de datos */
  eliminar(agenda:Agenda) {
    /* dialogo de confirmacion de eliminar los datos */
    if(confirm('estas seguro de querer eliminarlo id_agenda: ' + agenda.id_agenda + ' nombre agenda: ' + agenda.descripcion)){
      /* se llama el servicio mesa la funcion eliminar */
      this.agendaService.deleteByIdAgenda(agenda.id_agenda).subscribe((modificado) =>{
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
    if (this.validaciones.validaCampoObligatorio(this.seletedAgendaBuscar.descripcion) == this.validaciones.FALSE) {
      /* LLama al servicio para buscar si la mesa en el input existe */
      this.agendaService.findByIdAgenda(this.seletedAgendaBuscar.descripcion).then(resultado => {
        /* Se asigna la data en el arreglo mesasBuscar */
        this.agendasBuscar = resultado;
        /* Se pregunta si mesasBuscar contiene datos */
        if (this.agendasBuscar.length != this.validaciones.INT_NUMBER_0) {
          /* Se asigna al arreglo mesas los datos encontrados */
          this.agendas = this.agendasBuscar;
        } else {
          /* Se da mensaje de alerta que no existe el campo escrito */
          alert('la agenda :' + this.seletedAgendaBuscar.descripcion + ' No Existe');
          /* Se limpia el campo */
          this.seletedAgendaBuscar.descripcion = this.validaciones.STR_LETTER_WITHOUT;
        }
      },(err:HttpErrorResponse) => {
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    } else {
      /* Respuesta en caso de no llenar el campo de buscar mesa */
      alert('LLene el campo: NUMERO DE MESA de Buscar');
    }
  }
  /* Para volver a listar la data existente en la tabla mesa */
  listar() {
    /* Se llimpia el formulario buscar */
    this.seletedAgendaBuscar.descripcion = this.validaciones.STR_LETTER_WITHOUT;
    /* Se llimpia el formulario Agregar */
    this.seletedAgendaAgregar.descripcion = this.validaciones.STR_LETTER_WITHOUT;
    /* Se llimpia el formulario Actualizar */
    this.seletedAgendaActualizar.descripcion = this.validaciones.STR_LETTER_WITHOUT;
    /* esta funcion llena los arreglos de la data de la base de datos */
    this.ngOnInit();
  }
}
