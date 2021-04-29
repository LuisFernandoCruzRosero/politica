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
import { Validaciones } from '../modelos/validaciones';


@Component({
  selector: 'app-comuna',
  templateUrl: './comuna.component.html',
  styleUrls: ['./comuna.component.css']
})
export class ComunaComponent implements OnInit {

  /* Llamo ala clase validaciones */
  validaciones = new Validaciones();

  /* Total de Comunas Ingresadas */
  totalComuna:Number = this.validaciones.INT_NUMBER_0;

  /* Inicializo un arreglo del objeto Comuna */
  comunas:Comuna[] = [];

  
  /* Inicializo un arreglo del objeto Comuna Para la busqueda*/
  comunasBuscar:Comuna[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];

  /* Inicializamos un arreglo del objeto Digitador */
  digitador:DigitadorFindAll[] = [];

  /* Inicializo el objeto Comuna Para formulario Agregar*/
  seletedComunaAgregar:Comuna = new Comuna(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Inicializo el objeto Comuna Para formulario Actualizar*/
  seletedComunaActualizar:Comuna = new Comuna(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Inicializo el objeto Comuna Para formulario Buscar*/
  seletedComunaBuscar:Comuna = new Comuna(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Verificar la Ayutenticidad */
  encontrado:Boolean = this.validaciones.FALSE;

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
            /* Asingno a la variable totalComuna la cantidad de comunas existentes */
            this.totalComuna = resultado;
          });
          try {
            /* Consulto Tokent de Autenticidad */
            this.token = this.loginServi.findAllToken();
            /* Agrego ala variable vista el valor de tipo de usuario para bloquear permisos */
            this.vista = this.token.tipo_usuario;
            /* Busco el usuario logueado */
            for (let i = this.validaciones.INT_NUMBER_0; i < this.usuario.length; i++) {
              if (this.usuario[i].login == this.token.user_usu && this.token.tipo_usuario == this.validaciones.INT_NUMBER_1) {
              /* Si la encuentro cambio el estado a true */
              this.encontrado = this.validaciones.TRUE;
              }
            }
            /* Busco el digitador logueado */
            for (let i = this.validaciones.INT_NUMBER_0; i< this.digitador.length; i++) {
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

  /* Funcion Guardar Comuna */
  guardar() {
    /* Para saber si lleno el campo de Agregar Comuna */
    if (this.validaciones.validaCampoObligatorio(this.seletedComunaAgregar.nom_comuna) == this.validaciones.TRUE) {
      alert('CAMPO NOMBRE COMUNA OBLIGATORIO..');
    } else if (this.validaciones.validacionNombre(this.seletedComunaAgregar.nom_comuna) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO NOMBRE COMUNA INVALIDO..');
    } else {
      /* Se llama al servicio buscar si el nombre de la comuna lla existe */
      this.comunaService.findByIdComuna(this.seletedComunaAgregar.nom_comuna).then(resultado => {
        /* Se asigna el resultado en el arreglo counas */
        this.comunas = resultado;
        /* Se pregunta si trajo datos dela consulta */
        if (this.comunas.length == this.validaciones.INT_NUMBER_0) {
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
          this.seletedComunaAgregar.nom_comuna = this.validaciones.STR_LETTER_WITHOUT;
          });
        } else {
          /* Respuesta de comuna a agregar ya encontrada */
          alert('Nombre de Comuna :' + this.seletedComunaAgregar.nom_comuna + ' Ya Existe');
        }
      },(err:HttpErrorResponse) => {
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    }
  }

  
  /* se llena el objeto actualizar de tipo comuna de acuerdo ala seleccionada en la lista */
  actualizar(comuna:Comuna){
    /* llena el objeto de comuna para actualizar */
    this.seletedComunaActualizar = comuna;
  }

   /* Funcion que actualiza lo seleccionado en base de datos */
   actualizacion(){
    if (this.validaciones.validaCampoObligatorio(this.seletedComunaActualizar.nom_comuna) == this.validaciones.TRUE) {
      /* se limpia el input de actualizar */
      this.seletedComunaActualizar.id_comuna = this.validaciones.NULL;
      /* Alerta Para indicar obligatoriedad */
      alert('CAMPO NOMBRE MESA OBLIGATORIO..' + this.seletedComunaActualizar.nom_comuna);
      /* se limpia el input de actualizar */
      this.ngOnInit();
    } else if (this.validaciones.validacionNombre(this.seletedComunaActualizar.nom_comuna)) {
      /* se limpia el input de actualizar */
      this.seletedComunaActualizar.id_comuna = this.validaciones.NULL;
      /* Alerta para indicar invalides */
      alert('CAMPO NOMBRE MESA INVALIDO..' + this.seletedComunaActualizar.id_comuna);
      /* se limpia el input de actualizar */
      this.ngOnInit();
    } else {
      /* LLama al servicio para buscar si la mesa en el input existe */
      this.comunaService.findByIdComuna(this.seletedComunaActualizar.nom_comuna).then(resultado => {
        /* Se Asigna al arreglo mesas el resultado de la busqueda */
        this.comunas = resultado;
        /* Valida si las comunas ya existe */
        if (this.comunas.length == this.validaciones.INT_NUMBER_0) {
          /* se llama el servicio comuna la funcion Update comuna */
          this.comunaService.updateComuna({
          /* Agrega a los datos del objeto los que se ponen en la caja de testo de Actualizar  */
          id_comuna: this.seletedComunaActualizar.id_comuna,
          nom_comuna: this.seletedComunaActualizar.nom_comuna
          }).subscribe((modificado) => {
            /* se limpia el input de actualizar */
            this.seletedComunaActualizar.id_comuna = this.validaciones.NULL;
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
        } else {
          /* se limpia el input de actualizar */
          this.seletedComunaActualizar.id_comuna = this.validaciones.NULL;
          /* ya existe el nuevo nombre */
          alert('Comuna a Actualizar ya existe...');
        }
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
    if (this.validaciones.validaCampoObligatorio(this.seletedComunaBuscar.nom_comuna) == this.validaciones.FALSE) {
      /* Se llama al servicio para bscar si el nombre escrito existe en la tabla */
      this.comunaService.findByIdComuna(this.seletedComunaBuscar.nom_comuna).then(resultado => {
        /* Se asigna la data en el arreglo comuna Buscar */
        this.comunasBuscar = resultado;
        /* Se pregunta si esta vacio el arreglo */
        if (this.comunasBuscar.length != this.validaciones.INT_NUMBER_0) {
          /* Asigna al arreglo comunas  el arreglo comuna buscar */
          this.comunas = this.comunasBuscar;
        } else {
          /* Mensaje de alerta indicando que no existe la comuna digitada */
          alert('la comuna :' + this.seletedComunaBuscar.nom_comuna + ' No Existe');
          /* Limpia el campo nombre comuna */
          this.seletedComunaBuscar.nom_comuna = this.validaciones.STR_LETTER_WITHOUT;
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
      alert('LLene el campo: NOMBRE DE COMUNA A BUSCAR');
    }
  }

  /* Para volver a listar la data existente en la tabla comuna */
  listar() {
    /* Se llimpia el formulario buscar */
    this.seletedComunaBuscar.nom_comuna = this.validaciones.STR_LETTER_WITHOUT;
    /* Se llimpia el formulario Agregar */
    this.seletedComunaAgregar.nom_comuna = this.validaciones.STR_LETTER_WITHOUT;
    /* Se llimpia el formulario Actualizar */
    this.seletedComunaActualizar.nom_comuna = this.validaciones.STR_LETTER_WITHOUT;
    /* esta funcion llena los arreglos de la data de la base de datos */
    this.ngOnInit();
  }

  cancelar() {
   this.seletedComunaActualizar.id_comuna = this.validaciones.NULL;
   this.ngOnInit();
  }
}
