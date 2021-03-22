import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ContabilidadService } from '../servicios/contabilidad.service';


/* Clases */
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { Token } from '../modelos/token';
import { Validaciones } from '../modelos/validaciones';
import { Contabilidad } from '../modelos/contabilidad';
import { ContabilidadAux } from '../modelos/contabilidad-aux';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.css']
})
export class ContabilidadComponent implements OnInit {
   /* Llamo ala clase validaciones */
   validaciones = new Validaciones();

   /* Inicializo un arreglo del objeto Agenda */
   contabis:Contabilidad[] = [];
 
   /* Inicializo un arreglo del objeto Agenda Para la busqueda*/
   contabilidadBuscar:Contabilidad[] = [];

   contabilidad:Contabilidad[]= [];

   totalContabilidad:any = 0;
 
   /* Inicializamos un arreglo del objeto Usuaio */
   usuario:UsuarioFindAll[] = [];
   coordinador:UsuarioFindAll[] = [];

   contabilidadAux:ContabilidadAux[] = [];
 
   /* Inicializamos un arreglo del objeto Digitador */
   digitador:DigitadorFindAll[] = [];
 
   /* Inicializo el objeto contabilida Para formulario Agregar*/
   seletedContabilidadAgregar:Contabilidad = new Contabilidad(this.validaciones.NULL,this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT);
 
   /* Inicializo el objeto contabilida Para formulario Actualizar*/
   seletedContabilidadActualizar:Contabilidad = new Contabilidad(this.validaciones.NULL,this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT);
 
   /* Inicializo el objeto contabilida Para formulario Buscar*/
   seletedContabilidadBuscar:Contabilidad = new Contabilidad(this.validaciones.NULL,this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, 
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


  constructor(private loginServi:LoginService, private route:Router,private contabilidadService:ContabilidadService) {this.contabilidadAux=[];
  }

  ngOnInit() {
    this.contabilidadAux=[];

    /* Consulto los Datos de la tabla usuario */
    this.loginServi.findAllUsuario().then(resultado => {
      /* Asigno los datos de la tabla usuario al arreglo usuario */
      this.usuario = resultado;
      this.loginServi.findAllUsuarioCoordinador().then(resultado => {
        this.coordinador = resultado;
        
        
        /* Consulto los Datos de la tabla digitador */
        this.loginServi.findAllDigitador().then(resultado => {
          /* Asigno los datos de la tabla digitador al arreglo digitador */
          this.digitador = resultado;

          /* Consulto Los datos de la tabla Agenda */
          this.contabilidadService.findAllContabilidad().then(resultado => {
            /* Asigno al arreglo Agendas todas las existenten en la tabla */
            this.contabilidad = resultado;
             this.contabis=this.contabilidad;
              
              for(let i=this.validaciones.INT_NUMBER_0; i<this.contabis.length; i++){
                for(let j=this.validaciones.INT_NUMBER_0; j<this.coordinador.length; j++){
                  if(this.coordinador[j].id_usuario==this.contabis[i].id_usuario){
                    this.addContabilidadAux({
                      id_contabilidad:this.contabis[i].id_contabilidad,
                      nom_usuario:this.coordinador[j].nom_usuario,
                      valor:this.contabis[i].valor,
                      descripcion:this.contabis[i].descripcion,
                      identificacion:this.contabis[i].identificacion, 
                      nombre:this.contabis[i].nombre,
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
  }

   /* Funcion Guardar contabilidad */
   guardar() {
    /* Para saber si lleno el campo de Agregar Agenda */
    if (this.validaciones.validaCampoObligatorio(this.seletedContabilidadAgregar.descripcion) == this.validaciones.TRUE) {
      alert('CAMPO DESCRIPCION DE AGENDA OBLIGATORIO..');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedContabilidadAgregar.descripcion) == this.validaciones.TRUE) {
      alert('CAMPO DESCRIPCION DE AGENDA OBLIGATORIO..');
    
    } else {
      console.log(this.seletedContabilidadAgregar)
      /* Se llama al servicio para buscar una Agenda en la tabla para asi insertar o no la Agenda */
      /*---this.agendaService.findByIdAgenda(this.seletedAgendaAgregar.descripcion).then(resultado => {
        /* Se Asigna al arreglo Agendas el resultado de la busqueda */
       /*--- this.agendas = resultado;
        /* Se pregunta si Agenda contiene datos */
        /*---if (this.agendas.length == this.validaciones.INT_NUMBER_0) {
          /* llama al Servicio de Agenda y la funcion de insertar agenda */
          this.contabilidadService.insertContabilidad({
            /* Agrega a los datos del objeto los que se ponen en la caja de testo de agregar */
            
            id_contabilidad:this.seletedContabilidadAgregar.id_contabilidad,
            id_usuario: this.seletedContabilidadAgregar.id_usuario,
            descripcion: this.seletedContabilidadAgregar.descripcion,
            valor: this.seletedContabilidadAgregar.valor,
            nombre: this.seletedContabilidadAgregar.nombre,
            identificacion: this.seletedContabilidadAgregar.identificacion,
            
          }).subscribe((resultado) => {
          /* Se da respuesta Exitosa del servidor */
          alert("Se Agrego correctamente");
          /* se llama la funcion inicial para que recargue la pagina */
          this.ngOnInit();
          /* se limpia el input de agregar */
          this.seletedContabilidadAgregar.descripcion = this.validaciones.STR_LETTER_WITHOUT;
          });
       
    }
  }

  /* se llena el objeto actualizar de tipo mesa deacuerdo ala seleccionada en la lista */
  actualizar(contabilidad:Contabilidad) {
  /* llena el objeto de agenda para actualizar */
  this.seletedContabilidadActualizar = contabilidad;
  console.log(this.seletedContabilidadActualizar)
  }

  /* Funcion que actualiza lo seleccionado en base de datos */
  actualizacion() {
    if (this.validaciones.validaCampoObligatorio(this.seletedContabilidadActualizar.descripcion) == this.validaciones.TRUE) {
      /* se limpia el input de actualizar */
      this.seletedContabilidadActualizar.id_usuario = this.validaciones.NULL;
      alert('CAMPO NOMBRE AGENDA OBLIGATORIO..' + this.seletedContabilidadActualizar.descripcion);
      /* se limpia el input de actualizar */
      this.ngOnInit();
      /* se limpia el input de actualizar */
      this.seletedContabilidadActualizar.id_usuario = this.validaciones.NULL;
      alert('CAMPO NOMBRE AGENDA INVALIDO..' + this.seletedContabilidadActualizar.descripcion);
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
          this.contabilidadService.updateContabilidad({
            /* Agrega a los datos del objeto los que se ponen en la caja de texto de Actualizar  */
            id_contabilidad:this.seletedContabilidadActualizar.id_contabilidad,
            id_usuario: this.seletedContabilidadActualizar.id_usuario,
            descripcion: this.seletedContabilidadActualizar.descripcion,
            valor: this.seletedContabilidadActualizar.valor,
            nombre: this.seletedContabilidadActualizar.nombre,
            identificacion: this.seletedContabilidadActualizar.identificacion,
            
          }).subscribe((modificado) => {
            /* se limpia el input de actualizar */
            this.seletedContabilidadActualizar.id_usuario = this.validaciones.NULL;
            /* Se da respuesta Exitosa del servidor */
            alert("Se actualizo la agenda con exito");
            /* se llama la funcion inicial para que recargue la pagina */
            this.seletedContabilidadActualizar.id_contabilidad = this.validaciones.NULL;
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
  eliminar(contabilidad:Contabilidad) {
    /* dialogo de confirmacion de eliminar los datos */
    if(confirm('estas seguro de querer eliminarlo id_contabilidad: ' + contabilidad.id_contabilidad + ' contabilidad: ' + contabilidad.descripcion)){
      /* se llama el servicio mesa la funcion eliminar */
      this.contabilidadService.deleteByIdContabilidad(contabilidad.id_contabilidad).subscribe((modificado) =>{
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
    this.contabilidadAux=[];
    /* Se pregunta si el umput de buscar no esta vacio */
    if (this.validaciones.validaCampoObligatorio(this.seletedContabilidadBuscar.identificacion) == this.validaciones.FALSE) {
      /* LLama al servicio para buscar si la mesa en el input existe */
      this.contabilidadService.findAllContabilidadIdentificacion(this.seletedContabilidadBuscar.identificacion).then(resultado => {
        /* Se asigna la data en el arreglo mesasBuscar */
        this.contabis = resultado;
        /* Se pregunta si mesasBuscar contiene datos */
        if (this.contabis.length != this.validaciones.INT_NUMBER_0) {
          /* Se asigna al arreglo mesas los datos encontrados */
          for(let i=this.validaciones.INT_NUMBER_0; i<this.contabis.length; i++){
            for(let j=this.validaciones.INT_NUMBER_0; j<this.coordinador.length; j++){
              if(this.coordinador[j].id_usuario==this.contabis[i].id_usuario){
                this.addContabilidadAux({
                  id_contabilidad:this.contabis[i].id_contabilidad,
                  nom_usuario:this.coordinador[j].nom_usuario,
                  valor:this.contabis[i].valor,
                  descripcion:this.contabis[i].descripcion,
                  identificacion:this.contabis[i].identificacion, 
                  nombre:this.contabis[i].nombre,
                })
              } 
            }
          }
    } else {
          /* Se da mensaje de alerta que no existe el campo escrito */
          alert('El dato :' + this.seletedContabilidadBuscar.identificacion + ' No Existe');
          /* Se limpia el campo */
          this.seletedContabilidadBuscar.identificacion = this.validaciones.STR_LETTER_WITHOUT;
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
      alert('LLene el campo a Buscar');
    }
  }
  /* Para volver a listar la data existente en la tabla mesa */
  listar() {
    /* Se llimpia el formulario buscar */
    this.seletedContabilidadBuscar.descripcion = this.validaciones.STR_LETTER_WITHOUT;
    /* Se llimpia el formulario Agregar */
    this.seletedContabilidadBuscar.descripcion = this.validaciones.STR_LETTER_WITHOUT;
    /* Se llimpia el formulario Actualizar */
    this.seletedContabilidadBuscar.descripcion = this.validaciones.STR_LETTER_WITHOUT;
    /* esta funcion llena los arreglos de la data de la base de datos */
    this.ngOnInit();
  }

  /* Agregar Barrio a Arreglo local par aquitar id */
  addContabilidadAux(item:ContabilidadAux){
    this.contabilidadAux.push(item);
  }

}
