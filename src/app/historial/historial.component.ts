import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { Historial } from '../modelos/historial';
import { Token } from '../modelos/token';
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { Validaciones } from '../modelos/validaciones';
import { DigitadorService } from '../servicios/digitador.service';
import { HistorialService } from '../servicios/historial.service';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  /* Llamo ala clase validaciones */
  validaciones = new Validaciones();

  /* Token de verificacion de logueo */
  token:Token;

  /* Verificar la Ayutenticidad */
  encontrado:Boolean = this.validaciones.FALSE;

  /* Para bloquear desdel ts la viste del HTML dependiendo el tipo de usuario */
  vista:Number;

  /* Inicializo un arreglo del objeto digitador */
  digitador:DigitadorFindAll[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  historial:Historial[] = [];

   /* Inicializo el objeto digitador Para formulario Agregar*/
   seletedHistorialAgregar:Historial = new Historial(this.validaciones.NULL, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT);

  /* Inicializo el objeto digitador Para formulario Agregar*/
  seletedHistorialActualizar:Historial = new Historial(this.validaciones.NULL, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT);

  /* Inicializo el objeto digitador Para formulario Agregar*/
  seletedHistorialBuscar:Historial = new Historial(this.validaciones.NULL, this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT);

  constructor(private loginServi:LoginService, private route:Router, private digitadorServi:DigitadorService,
              private historialServi:HistorialService){ }

  ngOnInit() {

    this.loginServi.findAllUsuario().then(resultado => {
      /* Asigno los datos de la tabla usuario al arreglo usuario */
      this.usuario = resultado;
      /* Consulto los Datos de la tabla digitador */
      this.loginServi.findAllDigitador().then(resultado => {
        /* Asigno los datos de la tabla digitador al arreglo digitador */
        this.digitador = resultado;
        this.historialServi.findAllHistorial().then(resultado => {
          this.historial = resultado;
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
              this.route.navigate(['/']);
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

  actualizar(item:Historial){
    /* llena el objeto de comuna para actualizar */
    for(let i = 0; i < this.historial.length; i++) {
      if (this.historial[i].id_historial == item.id_historial) {
        this.seletedHistorialActualizar = this.historial[i];
        this.seletedHistorialActualizar.fec_historial = this.historial[i].fec_historial.substring(0,10);;
      }
    }
  }

  /* Funcion que elimina lo seleccionado en base de datos */
  eliminar(historial:Historial) {
    /* dialogo de confirmacion de eliminar los datos */
    if(confirm('estas seguro de querer eliminarlo cedula: ' + historial.ced_candidato + ' nombre: ' + historial.nom_candidato)){
      /* se llama el servicio mesa la funcion eliminar */
      this.historialServi.deleteByIdHistorial(historial.id_historial).subscribe((modificado) =>{
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

  cancelar() {
    this.seletedHistorialActualizar.id_historial = this.validaciones.NULL;
    this.ngOnInit();
  }

  actualizacion() {
    /* Validacion de campos Obligatorios */
    if (this.validaciones.validaCampoObligatorio(
      this.seletedHistorialActualizar.ced_candidato) == this.validaciones.TRUE) {
      alert('CEDULA Obligatoria..');
    } else if (this.validaciones.validaCampoObligatorio(
      this.seletedHistorialActualizar.nom_candidato) == this.validaciones.TRUE) {
      alert('NOMBRE obligatotio..');
    } else if (this.validaciones.validaCampoObligatorio(
      this.seletedHistorialActualizar.total) == this.validaciones.TRUE) {
      alert('TOTAL obligatotio..');
    } else if (this.validaciones.validaCampoObligatorio(
      this.seletedHistorialActualizar.fec_historial) == this.validaciones.TRUE) {
      alert('Fecha obligatotio..');
    }
    
    /* Validaciones de Rangos */
    else if (this.validaciones.validacionNumeros(
      this.seletedHistorialActualizar.ced_candidato) == this.validaciones.TRUE) {
      alert('Cedula: ' + this.seletedHistorialActualizar.ced_candidato + ' Invalida..');
      this.seletedHistorialActualizar.ced_candidato = this.validaciones.STR_LETTER_WITHOUT;
    } else if (this.validaciones.validacionNombre(
      this.seletedHistorialActualizar.nom_candidato) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('NOMBRE: ' + this.seletedHistorialActualizar.nom_candidato + ' Invalido..');
      this.seletedHistorialActualizar.nom_candidato = this.validaciones.STR_LETTER_WITHOUT;
    } else if (this.validaciones.validacionNumeros(
      this.seletedHistorialActualizar.total) == this.validaciones.TRUE) {
      alert('TOTAL: ' + this.seletedHistorialActualizar.total + ' Invalido..')
    } else {
        this.historialServi.updateHistorial({
          id_historial: this.seletedHistorialActualizar.id_historial,
          ced_candidato: this.seletedHistorialActualizar.ced_candidato,
          nom_candidato: this.seletedHistorialActualizar.nom_candidato,
          total: this.seletedHistorialActualizar.total,
          fec_historial: this.seletedHistorialActualizar.fec_historial,
        }).subscribe((modificado) => {
          /* se limpia el input de actualizar */
          this.seletedHistorialActualizar.id_historial = this.validaciones.NULL;
          /* Se da respuesta Exitosa del servidor */
          alert("Se actualizo el historial con exito");
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

  guardar() {
     /* Validacion de campos Obligatorios */
     if (this.validaciones.validaCampoObligatorio(
      this.seletedHistorialAgregar.ced_candidato) == this.validaciones.TRUE) {
      alert('CEDULA Obligatoria..');
    } else if (this.validaciones.validaCampoObligatorio(
      this.seletedHistorialAgregar.nom_candidato) == this.validaciones.TRUE) {
      alert('NOMBRE obligatotio..');
    } else if (this.validaciones.validaCampoObligatorio(
      this.seletedHistorialAgregar.total) == this.validaciones.TRUE) {
      alert('TOTAL obligatotio..');
    } else if (this.validaciones.validaCampoObligatorio(
      this.seletedHistorialAgregar.fec_historial) == this.validaciones.TRUE) {
      alert('Fecha Obligatoria..');
    }
    
    /* Validaciones de Rangos */
    else if (this.validaciones.validacionNumeros(
      this.seletedHistorialAgregar.ced_candidato) == this.validaciones.TRUE) {
      alert('Cedula: ' + this.seletedHistorialAgregar.ced_candidato + ' Invalida..');
      this.seletedHistorialAgregar.ced_candidato = this.validaciones.STR_LETTER_WITHOUT;
    } else if (this.validaciones.validacionNombre(
      this.seletedHistorialAgregar.nom_candidato) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('NOMBRE: ' + this.seletedHistorialAgregar.nom_candidato + ' Invalido..');
      this.seletedHistorialAgregar.nom_candidato = this.validaciones.STR_LETTER_WITHOUT;
    } else if (this.validaciones.validacionNumeros(
      this.seletedHistorialAgregar.total) == this.validaciones.TRUE) {
      alert('TOTAL: ' + this.seletedHistorialAgregar.total + ' Invalido..')
    } else {
      this.historialServi.insertHistorial({
        id_historial: this.seletedHistorialAgregar.id_historial,
        ced_candidato: this.seletedHistorialAgregar.ced_candidato,
        nom_candidato: this.seletedHistorialAgregar.nom_candidato,
        total: this.seletedHistorialAgregar.total,
        fec_historial: this.seletedHistorialAgregar.fec_historial,
      }).subscribe((resultado) => {
        alert('Se agrego el historial..');
        this.ngOnInit();
        /* Se limpian los IMPUT */
        this.limpiar();
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
    this.seletedHistorialBuscar.id_historial = this.validaciones.NULL;
    this.seletedHistorialBuscar.ced_candidato = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedHistorialBuscar.nom_candidato = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedHistorialBuscar.fec_historial = this.validaciones.NULL;
    this.seletedHistorialBuscar.total = this.validaciones.STR_LETTER_WITHOUT;
    /* Se limpian los imput de Actualizar */
    this.seletedHistorialActualizar.id_historial = this.validaciones.NULL;
    this.seletedHistorialActualizar.ced_candidato = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedHistorialActualizar.nom_candidato = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedHistorialActualizar.fec_historial = this.validaciones.NULL;
    this.seletedHistorialActualizar.total = this.validaciones.STR_LETTER_WITHOUT;

    /* Se limpian los imput de Agregar */
    this.seletedHistorialAgregar.id_historial = this.validaciones.NULL;
    this.seletedHistorialAgregar.ced_candidato = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedHistorialAgregar.nom_candidato = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedHistorialAgregar.fec_historial = this.validaciones.NULL;
    this.seletedHistorialAgregar.total = this.validaciones.STR_LETTER_WITHOUT;
  }

   /* Busqueda de Campos */
   buscar() {
    if (this.seletedHistorialBuscar.ced_candidato == this.validaciones.STR_LETTER_WITHOUT && 
      this.seletedHistorialBuscar.nom_candidato == this.validaciones.STR_LETTER_WITHOUT && 
      this.seletedHistorialBuscar.fec_historial == this.validaciones.NULL) {
        alert('los campos de Busqueda estan vacios..')
    } else {
      /* valida si el campo nombre del barrio del formulario buscar no esta vacio */
      if (this.validaciones.validaCampoObligatorio(this.seletedHistorialBuscar.ced_candidato) == this.validaciones.FALSE) {
        /* Limpia los otros campos de busqueda */
        this.seletedHistorialBuscar.nom_candidato = this.validaciones.STR_LETTER_WITHOUT;
        this.seletedHistorialBuscar.fec_historial = this.validaciones.NULL;
        /* llama el servicio para buscar todos los nombres y redtificar de que si exite */
        this.historialServi.findByIdHistorialCedula(this.seletedHistorialBuscar.ced_candidato).then(resultado => {
          /* Se llena el arreglo barrio cn la data de la busqueda */
          this.historial = resultado;
          /* se pregunta si existen datos */
          if (this.historial.length == this.validaciones.INT_NUMBER_0) {
            /* Se llimpia el formulario Buscar */
            this.seletedHistorialBuscar.ced_candidato = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedHistorialBuscar.nom_candidato = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedHistorialBuscar.fec_historial = this.validaciones.NULL;
            /* Mensaje de alerta que no existe el dato */
            alert('no existe campo de la busqueda..');
            /* Se llama para recargar la pagina */
            this.ngOnInit();
          }
        }, (err:HttpErrorResponse) => {
          if (err.error instanceof Error) {
            alert("a ocurrido un errror cliente");
          } else {
            alert("a ocurrido un errror servidor");
          }
        });
         /* valida si el campo nombre del barrio del formulario buscar no esta vacio */
      } else if (this.seletedHistorialBuscar.nom_candidato != this.validaciones.STR_LETTER_WITHOUT) {
        /* Limpia los otros campos de busqueda */
        this.seletedHistorialBuscar.ced_candidato = this.validaciones.STR_LETTER_WITHOUT;
        this.seletedHistorialBuscar.fec_historial = this.validaciones.NULL;
        /* llama el servicio para buscar todos los nombres y redtificar de que si exite */
        this.historialServi.findByIdHistorialNombre(this.seletedHistorialBuscar.nom_candidato).then(resultado => {
          /* Se llena el arreglo barrio con la data de la busqueda */
          this.historial = resultado;
          /* se pregunta si existen datos */
          if (this.historial.length == this.validaciones.INT_NUMBER_0) {
            /* Se llimpia el formulario Buscar */
            this.seletedHistorialBuscar.ced_candidato = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedHistorialBuscar.fec_historial = this.validaciones.NULL;
            /* Se muestra mensaje de alerta que no existe */
            alert('no existe campo de la busqueda..');
            /* Se llama funcion para recargar la pagina */
            this.ngOnInit();
          }
        }, (err:HttpErrorResponse) => {
          if (err.error instanceof Error) {
            alert("a ocurrido un errror cliente");
          } else {
            alert("a ocurrido un errror servidor");
          }
        });
        /* valida si el campo nombre del barrio del formulario buscar no esta vacio */
      } else if (this.seletedHistorialBuscar.fec_historial != this.validaciones.NULL) {
        /* Se llimpia el formulario Buscar */
        this.seletedHistorialBuscar.ced_candidato = this.validaciones.NULL;
        this.seletedHistorialBuscar.nom_candidato = this.validaciones.STR_LETTER_WITHOUT;
        /* llama el servicio para buscar todos los nombres y redtificar de que si exite */
        this.historialServi.findByIdHistorialFecha(this.seletedHistorialBuscar.fec_historial).then(resultado => {
          /* Se llena el arreglo barrio con la data de la busqueda */
          this.historial = resultado;
          /* se pregunta si existen datos */
          if (this.historial.length == this.validaciones.INT_NUMBER_0) {
            /* Se llimpia el formulario Buscar */
            this.seletedHistorialBuscar.ced_candidato = this.validaciones.NULL;
            this.seletedHistorialBuscar.nom_candidato = this.validaciones.NULL;
            /* Se muestra mensaje de alerta */
            alert('no existe campo de la busqueda..');
            /* Se llama funcion para recargar la pagina */
            this.ngOnInit();
          }
        }, (err:HttpErrorResponse) => {
          if (err.error instanceof Error) {
            alert("a ocurrido un errror cliente");
          } else {
            alert("a ocurrido un errror servidor");
          }
        });
      }
    }
  }

}
