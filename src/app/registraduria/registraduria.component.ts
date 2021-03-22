import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LugarService } from '../servicios/lugar.service';

/* Clases */
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { Token } from '../modelos/token';
import { Lugar } from '../modelos/lugar';
import { Validaciones } from '../modelos/validaciones';
import { RegistraduriaService } from '../servicios/registraduria.service';
import { Registraduria } from '../modelos/registraduria';
import { RegistraduriaAux } from '../modelos/registraduria-aux';
import { timeStamp } from 'console';

@Component({
  selector: 'app-registraduria',
  templateUrl: './registraduria.component.html',
  styleUrls: ['./registraduria.component.css']
})
export class RegistraduriaComponent implements OnInit {

     /* Llamo ala clase validaciones */
     validaciones = new Validaciones();

   /* Inicializamos un arreglo del objeto Usuaio */
   usuario:UsuarioFindAll[] = [];

   /* Inicializamos un arreglo del objeto Digitador */
   digitador:DigitadorFindAll[] = [];

   /* Inicializo un arreglo del objeto Lugar */
   lugares:Lugar[] = [];
   lugar:Lugar[] = [];

    /* Inicializo un arreglo del objeto Lugar */
  registraduria:Registraduria[] = [];

  registraduriaAux:RegistraduriaAux[] = [];

   /* Verificar la Autenticidad */
  encontrado:Boolean = this.validaciones.FALSE;

  /* Inicializo el objeto Lugar Para formulario Agregar*/
  seletedRegistraduriaAgregar:Registraduria = new Registraduria(this.validaciones.NULL,this.validaciones.NULL, this.validaciones.NULL);

  /* Inicializo el objeto Lugar Para formulario Agregar*/
  seletedRegistraduriaBuscar:Registraduria = new Registraduria(this.validaciones.NULL,this.validaciones.NULL, this.validaciones.NULL);

  /* Inicializo el objeto Lugar Para formulario Agregar*/
  seletedRegistraduriaActualizar:Registraduria = new Registraduria(this.validaciones.NULL,this.validaciones.NULL, this.validaciones.NULL);

  /* Para bloquear desdel ts la viste del HTML dependiendo el tipo de usuario */
  vista:Number;

  /* Token de verificacion de logueo */
  token:Token;

  constructor(private loginServi:LoginService, private route:Router, private lugarService:LugarService, 
    private registraduriaService:RegistraduriaService) { this.registraduriaAux = [] }

  ngOnInit() {
    this.registraduriaAux = [] ;
    /* Consulto los Datos de la tabla usuario */
    this.loginServi.findAllUsuario().then(resultado => {
      /* Asigno los datos de la tabla usuario al arreglo usuario */
      this.usuario = resultado;
      /* Consulto los Datos de la tabla digitador */
      this.loginServi.findAllDigitador().then(resultado => {
        /* Asigno los datos de la tabla digitador al arreglo digitador */
        this.digitador = resultado;
        /* Consulto Los datos de la tabla Lugares */
        this.lugarService.findAllLugar().then(resultado => {
          /* Asigno al arreglo Lugares todas las existenten en la tabla */
          this.lugares = resultado;
          this.lugar = this.lugares;
          /* Consulto Los datos de la tabla Lugares */
          this.registraduriaService.findAllRegistraduria().then(resultado => {
            this.registraduria = resultado;
          //if (this.encontrado == true) {
              /* Se llena un arreglo auxiliar para listar correctamente los datos de la tabla lugar */
              for(let i = this.validaciones.INT_NUMBER_0; i < this.registraduria.length; i++){
                for (let j = this.validaciones.INT_NUMBER_0; j < this.lugares.length; j++) {
                  if (this.lugares[j].id_lugar == this.registraduria[i].id_lugar) {
                    this.addRegistraduriaAux({
                      id_registraduria:this.registraduria[i].id_registraduria,
                      nom_lugar:this.lugares[j].nom_lugar,
                      total:this.registraduria[i].total,
                    });
                  }
                }
              }
            //}
            
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
  }

  /*  Funcion Guardar Lugar */
  guardar() {
    /* Validacion de Campos Obligatorios y invalidos */
    if (this.validaciones.validaCampoObligatorio(this.seletedRegistraduriaAgregar.id_lugar.toString()) == this.validaciones.TRUE) {
      alert('CAMPO NOMBRE LUGAR OBLIGATORIO..');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedRegistraduriaAgregar.total.toString()) == this.validaciones.TRUE) {
      alert('CAMPO TOTAL OBLIGATORIO..');
    } else if (this.validaciones.validacionNumeros(this.seletedRegistraduriaAgregar.total.toString())) {
      alert('CAMPO TOTAL DEVE SER NUMERICO..');
    } else {
      /* LLamo al servicio lugar para buscar los Lugares existentes */
      this.registraduriaService.findByIdRegistraduriaLugar(this.seletedRegistraduriaAgregar.id_lugar).then(resultado =>{
        /* Se llena el arreglo Lugares con la data seleccionada en la busqueda */
        this.registraduria = resultado;
        console.log(this.registraduria.length);
        /* Se pregunta si Lugares contiene datos */
        if (this.registraduria.length == this.validaciones.INT_NUMBER_0) {
          /* llama el servivio de agregar un lugar en la tabla Lugar */
          this.registraduriaService.insertRegistraduria({
            /* Se envia la data diligenciada en el formulario */
            id_registraduria: this.seletedRegistraduriaAgregar.id_registraduria,
            id_lugar : this.seletedRegistraduriaAgregar.id_lugar,
            total : this.seletedRegistraduriaAgregar.total,
          }).subscribe((resultado) => {
            /* Se da respuesta Exitosa del servidor */
            alert("Se Agrego la Mesa");
            /* se llama la funcion inicial para que recargue la pagina */
            this.ngOnInit();
            /* se limpia el input de agregar nombre de Lugar */
            this.seletedRegistraduriaAgregar.id_lugar = this.validaciones.NULL;
            /* se limpia el input de latitud */
            this.seletedRegistraduriaAgregar.total = this.validaciones.NULL;
          });
        } else {
          /* Respuesta de mesa a agregar ya encontrada */
          alert('nombre del Lugar Ya Existe....');
        }
      });
    }    
  }

  /* Agregar Lugar a Arreglo local par aquitar id */
  addRegistraduriaAux(item:RegistraduriaAux){
    this.registraduriaAux.push(item);
  }

  /* Funcion que elimina lo seleccionado en base de datos */
  eliminar(registraduria:RegistraduriaAux) {
    /* dialogo de confirmacion de eliminar los datos */
    if(confirm('estas seguro de querer eliminarlo id_historial: ' + registraduria.id_registraduria)){
      /* se llama el servicio mesa la funcion eliminar */
      this.registraduriaService.deleteByIdRegistraduria(registraduria.id_registraduria).subscribe((modificado) =>{
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

  /* Busqueda de Campos */
  buscar() {
    if (this.seletedRegistraduriaBuscar.id_lugar == this.validaciones.NULL) {
        alert('los campos de Busqueda estan vacios..')
    } else {
      /* valida si el campo nombre del Lugar del formulario buscar no esta vacio */
      if (this.validaciones.validaCampoObligatorio(this.seletedRegistraduriaBuscar.id_lugar.toString()) == this.validaciones.FALSE) {
        /* llama el servicio para buscar todos los nombres y redtificar de que si exite */
        this.registraduriaService.findByIdRegistraduriaLugar(this.seletedRegistraduriaBuscar.id_lugar).then(resultado => {
          /* Se llena el arreglo Lugar con la data de la busqueda */
          this.registraduria = resultado;
          /* se pregunta si existen datos */
          if (this.registraduria.length == this.validaciones.INT_NUMBER_0) {
            /* Se llimpia el formulario Buscar */
            this.seletedRegistraduriaBuscar.id_lugar = this.validaciones.NULL;
            /* Mensaje de alerta que no existe el dato */
            alert('no existe campo de la busqueda..');
            /* Se llama para recargar la pagina */
            this.ngOnInit();
          } else {
            /* inicializo arreglo que se muestra en el html para llenarlo de los datos de la busqueda */
            this.registraduriaAux = [];
            /* llena los datos del arreglo Lugares con los de la busqueda */
            this.lugares = this.lugar;
            /* LLena el arreglo auxiliar para llenarlo con datos validos */
            for(let i = this.validaciones.INT_NUMBER_0; i < this.registraduria.length; i++){
              for (let j = this.validaciones.INT_NUMBER_0; j < this.lugares.length; j++) {
                if (this.lugares[j].id_lugar == this.registraduria[i].id_lugar) {
                  this.addRegistraduriaAux({
                    id_registraduria:this.registraduria[i].id_registraduria,
                    nom_lugar:this.lugares[j].nom_lugar,
                    total:this.registraduria[i].total,
                  });
                }
              }
            }
          }
        }, (err:HttpErrorResponse) => {
          if (err.error instanceof Error) {
            alert("a ocurrido un errror cliente");
          } else {
            alert("a ocurrido un errror servidor");
          }
        });
         /* valida si el campo nombre del lugar del formulario buscar no esta vacio */
      }
    }
  }

  listar() {
    this.seletedRegistraduriaBuscar.id_lugar = this.validaciones.NULL;
    this.ngOnInit();
  }

  /* se llena el objeto actualizar de tipo comuna de acuerdo ala seleccionada en la lista */
 actualizar(registraduria:RegistraduriaAux){
    /* llena el objeto de comuna para actualizar */
    for (let i = this.validaciones.INT_NUMBER_0; i < this.registraduria.length; i++) {
      if (this.registraduria[i].id_registraduria == registraduria.id_registraduria ) {
        this.seletedRegistraduriaActualizar = this.registraduria[i];
      }
    }
  }

  actualizacion(){
    if (this.validaciones.validacionNumerico(this.seletedRegistraduriaActualizar.total.toString()) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('debe ser numerico total del lugar');
    } else {
          /* se llama el servicio comuna la funcion Update comuna */
          this.registraduriaService.updateRegistraduria({
            /* Agrega a los datos del objeto los que se ponen en la caja de testo de Actualizar  */
            id_registraduria : this.seletedRegistraduriaActualizar.id_registraduria,
            id_lugar : this.seletedRegistraduriaActualizar.id_lugar,
            total : this.seletedRegistraduriaActualizar.total,
          }).subscribe((modificado) => {
            /* se limpia el input de actualizar */
            this.seletedRegistraduriaActualizar.id_registraduria = this.validaciones.NULL;
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
    }
  }

  cancelar(){
    this.seletedRegistraduriaActualizar.id_registraduria = this.validaciones.NULL;
  }
}
