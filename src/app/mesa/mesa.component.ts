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
import { Validaciones } from '../modelos/validaciones';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {

  /* Llamo ala clase validaciones */
  validaciones = new Validaciones();

  /* Total de Mesas Ingresadas */
  totalMesa:any = 0;

  /* Inicializo un arreglo del objeto Mesa */
  mesas:Mesa[] = [];

  /* Inicializo un arreglo del objeto Mesa Para la busqueda*/
  mesasBuscar:Mesa[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];

  /* Inicializamos un arreglo del objeto Digitador */
  digitador:DigitadorFindAll[] = [];

  /* Inicializo el objeto Mesa Para formulario Agregar*/
  seletedMesaAgregar:Mesa = new Mesa(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Inicializo el objeto Mesa Para formulario Actualizar*/
  seletedMesaActualizar:Mesa = new Mesa(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Inicializo el objeto Mesa Para formulario Buscar*/
  seletedMesaBuscar:Mesa = new Mesa(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Verificar la Ayutenticidad */
  encontrado:Boolean = this.validaciones.FALSE;

  /* Para bloquear desdel ts la viste del HTML dependiendo el tipo de usuario */
  vista:Number;

  /* Token de verificacion de logueo */
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
      /* Consulto los Datos de la tabla digitador */
      this.loginServi.findAllDigitador().then(resultado => {
        /* Asigno los datos de la tabla digitador al arreglo digitador */
        this.digitador = resultado;
        /* Consulto Los datos de la tabla Mesa */
        this.mesaService.findAllMesa().then(resultado => {
          /* Asigno al arreglo Mesas todas las existenten en la tabla */
          this.mesas = resultado;
          /* consulta la cantidad de mesas qque existen en el sistema */
          this.mesaService.findByIdTotalMesa().subscribe(resultado=>{
            this.totalMesa = resultado;
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

  /* Funcion Guardar Mesa */
  guardar() {
    /* Para saber si lleno el campo de Agregar Mesa */
    if (this.validaciones.validaCampoObligatorio(this.seletedMesaAgregar.nom_mesa) == this.validaciones.TRUE) {
      alert('CAMPO NOMBRE MESA OBLIGATORIO..');
    } else if (this.validaciones.validacionNumeros(this.seletedMesaAgregar.nom_mesa)) {
      alert('CAMPO NOMBRE MESA INVALIDO..');
    } else {
      /* Se llama al servicio para buscar una mesa en la tabla para asi insertar o no la mesa */
      this.mesaService.findByIdMesa(this.seletedMesaAgregar.nom_mesa).then(resultado => {
        /* Se Asigna al arreglo mesas el resultado de la busqueda */
        this.mesas = resultado;
        /* Se pregunta si mesas contiene datos */
        if (this.mesas.length == this.validaciones.INT_NUMBER_0) {
          /* llama al Servicio de Mesa y la funcion de insertar mesa */
          this.mesaService.insertMesa({
            /* Agrega a los datos del objeto los que se ponen en la caja de testo de agregar */
            id_mesa: this.seletedMesaAgregar.id_mesa,
            nom_mesa: this.seletedMesaAgregar.nom_mesa,
          }).subscribe((resultado) => {
          /* Se da respuesta Exitosa del servidor */
          alert("Se Agrego la Mesa");
          /* se llama la funcion inicial para que recargue la pagina */
          this.ngOnInit();
          /* se limpia el input de agregar */
          this.seletedMesaAgregar.nom_mesa = this.validaciones.STR_LETTER_WITHOUT;
          });
        } else {
          /* Respuesta de mesa a agregar ya encontrada */
          alert('numero de mesa :' + this.seletedMesaAgregar.nom_mesa + ' Ya Existe');
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

  /* se llena el objeto actualizar de tipo mesa deacuerdo ala seleccionada en la lista */
  actualizar(mesa:Mesa) {
    /* llena el objeto de mesa para actualizar */
    this.seletedMesaActualizar = mesa;
  }

  /* Funcion que actualiza lo seleccionado en base de datos */
  actualizacion() {
    if (this.validaciones.validaCampoObligatorio(this.seletedMesaActualizar.nom_mesa) == this.validaciones.TRUE) {
      /* se limpia el input de actualizar */
      this.seletedMesaActualizar.id_mesa = this.validaciones.NULL;
      alert('CAMPO NOMBRE MESA OBLIGATORIO..' + this.seletedMesaActualizar.nom_mesa);
      /* se limpia el input de actualizar */
      this.ngOnInit();
    } else if (this.validaciones.validacionNumeros(this.seletedMesaActualizar.nom_mesa)) {
      /* se limpia el input de actualizar */
      this.seletedMesaActualizar.id_mesa = this.validaciones.NULL;
      alert('CAMPO NOMBRE MESA INVALIDO..' + this.seletedMesaActualizar.nom_mesa);
      /* se limpia el input de actualizar */
      this.ngOnInit();
    } else {
      /* Se llama al servicio para buscar una mesa en la tabla para asi insertar o no la mesa */
      this.mesaService.findByIdMesa(this.seletedMesaActualizar.nom_mesa).then(resultado => {
        /* Se Asigna al arreglo mesas el resultado de la busqueda */
        this.mesas = resultado;
        /* Se pregunta si el arreglo mesas esta vacio */
        if (this.mesas.length == this.validaciones.INT_NUMBER_0) {
          /* se llama el servicio mesa la funcion Update mesa */
          this.mesaService.updateMesa({
            /* Agrega a los datos del objeto los que se ponen en la caja de testo de Actualizar  */
            id_mesa: this.seletedMesaActualizar.id_mesa,
            nom_mesa: this.seletedMesaActualizar.nom_mesa
          }).subscribe((modificado) => {
            /* se limpia el input de actualizar */
            this.seletedMesaActualizar.id_mesa = this.validaciones.NULL;
            /* Se da respuesta Exitosa del servidor */
            alert("Se actualizo la mesa con exito");
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
        this.seletedMesaActualizar.id_mesa = this.validaciones.NULL;
          /* ya existe el nuevo nombre */
          alert('Mesa a Actualizar ya existe...');
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
  eliminar(mesa:Mesa) {
    /* dialogo de confirmacion de eliminar los datos */
    if(confirm('estas seguro de querer eliminarlo id_mesa: ' + mesa.id_mesa + ' nombre mesa: ' + mesa.nom_mesa)){
      /* se llama el servicio mesa la funcion eliminar */
      this.mesaService.deleteByIdMesa(mesa.id_mesa).subscribe((modificado) =>{
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
    if (this.validaciones.validaCampoObligatorio(this.seletedMesaBuscar.nom_mesa) == this.validaciones.FALSE) {
      /* LLama al servicio para buscar si la mesa en el input existe */
      this.mesaService.findByIdMesa(this.seletedMesaBuscar.nom_mesa).then(resultado => {
        /* Se asigna la data en el arreglo mesasBuscar */
        this.mesasBuscar = resultado;
        /* Se pregunta si mesasBuscar contiene datos */
        if (this.mesasBuscar.length != this.validaciones.INT_NUMBER_0) {
          /* Se asigna al arreglo mesas los datos encontrados */
          this.mesas = this.mesasBuscar;
        } else {
          /* Se da mensaje de alerta que no existe el campo escrito */
          alert('la mesa :' + this.seletedMesaBuscar.nom_mesa + ' No Existe');
          /* Se limpia el campo */
          this.seletedMesaBuscar.nom_mesa = this.validaciones.STR_LETTER_WITHOUT;
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
    this.seletedMesaBuscar.nom_mesa = this.validaciones.STR_LETTER_WITHOUT;
    /* Se llimpia el formulario Agregar */
    this.seletedMesaAgregar.nom_mesa = this.validaciones.STR_LETTER_WITHOUT;
    /* Se llimpia el formulario Actualizar */
    this.seletedMesaActualizar.nom_mesa = this.validaciones.STR_LETTER_WITHOUT;
    /* esta funcion llena los arreglos de la data de la base de datos */
    this.ngOnInit();
  }

  cancelar() {
    this.seletedMesaActualizar.id_mesa = this.validaciones.NULL;
    this.ngOnInit();
  }
}
