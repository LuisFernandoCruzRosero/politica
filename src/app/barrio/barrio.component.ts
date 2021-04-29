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
import { Validaciones } from '../modelos/validaciones';
import { Zona } from '../modelos/zona';

@Component({
  selector: 'app-barrio',
  templateUrl: './barrio.component.html',
  styleUrls: ['./barrio.component.css']
})
export class BarrioComponent implements OnInit {

  /* Llamo ala clase validaciones */
  validaciones = new Validaciones();

  /* Total de Barrios Ingresados */
  totalBarrio:Number = this.validaciones.INT_NUMBER_0;

  /* Inicializo un arreglo del objeto Barrio */
  barrios:Barrio[] = [];

  /* Inicializo un arreglo del objeto Barrio */
  barrio:Barrio[] = [];

  /* Si o No */
  zona:Zona[] = [
    {id_zona:this.validaciones.INT_NUMBER_2, name_zona:this.validaciones.STR_LETTER_SI}, 
    {id_zona:this.validaciones.INT_NUMBER_1, name_zona:this.validaciones.STR_LETTER_NO}
  ];

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
  seletedBarrioAgregar:Barrio = new Barrio(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.NULL);

  /* Inicializo el objeto barrio Para formulario Actualizar*/
  seletedBarrioActualizar:Barrio = new Barrio(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
     this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.NULL);

  /* Inicializo el objeto barrio Para formulario Buscar*/
  seletedBarrioBuscar:Barrio = new Barrio(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.NULL);

  /* Inicializo el objeto barrio Para formulario Agregar Comuna*/
  seletedComunaAgregar:Comuna = new Comuna(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Inicializo objeto zona para formulario Agregar zona */
  seletedZonaAgregar:Zona = new Zona(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Inicializo objeto zona para formulario Buscar zona */
  seletedZonaBuscar:Zona = new Zona(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Inicializo objeto zona para formulario Actualizar zona */
  seletedZonaActualizar:Zona = new Zona(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Inicializo objeto zona para formulario Buscar Comuna */
  seletedComunaBuscar:Comuna = new Comuna(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Inicializo objeto zona para formulario Actualizar Comuna */
  seletedComunaActualizar:Comuna = new Comuna(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Verificar la Autenticidad */
  encontrado:Boolean = this.validaciones.FALSE;

  /* Para bloquear desdel ts la viste del HTML dependiendo el tipo de usuario */
  vista:Number;

  /* Token de verificacion de logueo */
  token:Token;

  /* Se llama a login service para verificar la autenticidad de usuario */
  /* Se llama a router para poder navegar del ts a un html deacuerdo ala autenticidad */
  /* Se llama a Barrio service para poder realizar la funciones del CRUD del modulo de las barrios */
  constructor(private loginServi:LoginService, private route:Router, private barrioService:BarrioService, 
              private comunaService:ComunaService) { this.barriosAux = [] }

  ngOnInit() {
    /* Se limpia arreglo auxiliar para volver a llenar */
    this.barriosAux = [];
     /* inicializo zona en html */
     this.seletedZonaAgregar.id_zona = this.validaciones.INT_NUMBER_1;
     /* inicializo zona en html */
     this.seletedBarrioAgregar.zona_roja = false;
     /* Consulto los Datos de la tabla usuario */
     this.loginServi.findAllUsuario().then(resultado => {
      /* Asigno los datos de la tabla usuario al arreglo usuario */
      this.usuario = resultado;
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
            this.barrioService.findByIdTotalBarrio().subscribe(resultado=>{
              /* Asingno a la variable totalComuna la cantidad de comunas existentes */
              this.totalBarrio = resultado;
            });
             //if (this.encontrado == true) {
              /* Se llena un arreglo auxiliar para listar correctamente los datos de la tabla barrio */
              for(let i = this.validaciones.INT_NUMBER_0; i < this.barrios.length; i++){
                for (let j = this.validaciones.INT_NUMBER_0; j < this.comunas.length; j++) {
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
              /* inicializa el select de la comuna para colocar valor por defecto */
              this.seletedComunaAgregar.id_comuna = this.validaciones.INT_NUMBER_1;
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

  /*  Funcion Guardar Barrio */
  guardar() {
    /* Validacion de Campos Obligatorios y invalidos */
    if (this.validaciones.validaCampoObligatorio(this.seletedBarrioAgregar.nom_barrio) == this.validaciones.TRUE) {
      alert('CAMPO NOMBRE BARRIO OBLIGATORIO..');
    } else if (this.validaciones.validacionNombre(this.seletedBarrioAgregar.nom_barrio) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO NOMBRE BARRIO INVALIDO: ' + this.seletedBarrioAgregar.nom_barrio);
    } else if (this.validaciones.validaCampoObligatorio(this.seletedBarrioAgregar.latitud) == this.validaciones.TRUE) {
      alert('CAMPO LATITUD OBLIGATORIO..');
    } else if (this.validaciones.validacionNumerico(this.seletedBarrioAgregar.latitud) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO LATITUD INVALIDO: ' + this.seletedBarrioAgregar.latitud);
    } else if (this.validaciones.validaCampoObligatorio(this.seletedBarrioAgregar.longitud) == this.validaciones.TRUE) {
      alert('CAMPO LONGITUD OBLIGATORIO..');
    } else if (this.validaciones.validacionNumerico(this.seletedBarrioAgregar.longitud) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO LONGITUD INVALIDO: ' + this.seletedBarrioAgregar.longitud);
    } else {
      /* PAra tomar valor Real numerico */
      this.seletedBarrioAgregar.latitud = (parseFloat(this.seletedBarrioAgregar.latitud.toString())).toString();
      /* PAra tomar valor Real numerico */
      this.seletedBarrioAgregar.longitud = (parseFloat(this.seletedBarrioAgregar.longitud.toString())).toString();
      /* LLamo al servicio barrio para buscar los barrios existentes */
      this.barrioService.findByIdBarrio(this.seletedBarrioAgregar.nom_barrio).then(resultado =>{
        /* Se llena el arreglo barrios con la data seleccionada en la busqueda */
        this.barrios = resultado;
        /* Se pregunta si barrios contiene datos */
        if (this.barrios.length == this.validaciones.INT_NUMBER_0) {
          /* llama el servicio de agregar un barrio en la tabla barrio */
          this.barrioService.insertBarrio({
            /* Se envia la data diligenciada en el formulario */
            id_barrio:this.seletedBarrioAgregar.id_barrio,
            nom_barrio: this.seletedBarrioAgregar.nom_barrio,
            latitud : this.seletedBarrioAgregar.latitud,
            longitud : this.seletedBarrioAgregar.longitud,
            zona_roja: this.seletedBarrioAgregar.zona_roja,
            id_comunaB: this.seletedComunaAgregar.id_comuna
          }).subscribe((resultado) => {
            /* Se da respuesta Exitosa del servidor */
            alert("Se Agrego el Barrio");
            /* se llama la funcion inicial para que recargue la pagina */
            this.ngOnInit();
            /* se limpia el input de agregar nombre de barrio */
            this.seletedBarrioAgregar.nom_barrio = this.validaciones.STR_LETTER_WITHOUT;
            /* se limpia el input de latitud */
            this.seletedBarrioAgregar.latitud = this.validaciones.STR_LETTER_WITHOUT;
              /* se limpia el input de longitud */
            this.seletedBarrioAgregar.longitud = this.validaciones.STR_LETTER_WITHOUT;
          });
        } else {
          /* Respuesta de barrio a agregado ya encontrado */
          alert('nombre del barrio :' + this.seletedBarrioAgregar.nom_barrio + ' Ya Existe');
        }
      });
    }    
  }

  /* Busqueda de Campos */
  buscar() {
    if (this.seletedBarrioBuscar.nom_barrio == this.validaciones.STR_LETTER_WITHOUT && 
      this.seletedZonaBuscar.id_zona == this.validaciones.NULL && this.seletedComunaBuscar.id_comuna == this.validaciones.NULL) {
        alert('los campos de Busqueda estan vacios..')
    } else {
      /* valida si el campo nombre del barrio del formulario buscar no esta vacio */
      if (this.validaciones.validaCampoObligatorio(this.seletedBarrioBuscar.nom_barrio) == this.validaciones.FALSE) {
        /* Limpia los otros campos de busqueda */
        this.seletedComunaBuscar.id_comuna = this.validaciones.NULL;
        this.seletedZonaBuscar.id_zona = this.validaciones.NULL;
        /* llama el servicio para buscar todos los nombres y redtificar de que si exite */
        this.barrioService.findByIdBarrio(this.seletedBarrioBuscar.nom_barrio).then(resultado => {
          /* Se llena el arreglo barrio cn la data de la busqueda */
          this.barrio = resultado;
          /* se pregunta si existen datos */
          if (this.barrio.length == this.validaciones.INT_NUMBER_0) {
            /* Se llimpia el formulario Buscar */
            this.seletedComunaBuscar.id_comuna = this.validaciones.NULL;
            this.seletedZonaBuscar.id_zona = this.validaciones.NULL;
            this.seletedBarrioBuscar.nom_barrio = this.validaciones.STR_LETTER_WITHOUT;
            /* Mensaje de alerta que no existe el dato */
            alert('no existe campo de la busqueda..');
            /* Se llama para recargar la pagina */
            this.ngOnInit();
          } else {
            /* inicializo arreglo que se muestra en el html para llenarlo de los datos de la busqueda */
            this.barriosAux = [];
            /* llena los datos del arreglo barrios con los de la busqueda */
            this.barrios = this.barrio;
            /* LLena el arreglo auxiliar para llenarlo con datos validos */
            for(let i = this.validaciones.INT_NUMBER_0; i < this.barrios.length; i++){
              for (let j = this.validaciones.INT_NUMBER_0; j < this.comunas.length; j++) {
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
          }
        }, (err:HttpErrorResponse) => {
          if (err.error instanceof Error) {
            alert("a ocurrido un errror cliente");
          } else {
            alert("a ocurrido un errror servidor");
          }
        });
         /* valida si el campo nombre del barrio del formulario buscar no esta vacio */
      } else if (this.seletedBarrioBuscar.id_comunaB != this.validaciones.NULL) {
        /* Limpia los otros campos de busqueda */
        this.seletedBarrioBuscar.nom_barrio = this.validaciones.STR_LETTER_WITHOUT;
        this.seletedBarrioBuscar.zona_roja = this.validaciones.NULL;
        /* llama el servicio para buscar todos los nombres y redtificar de que si exite */
        this.barrioService.findAllBarrioComuna(this.seletedBarrioBuscar.id_comunaB).then(resultado => {
          /* Se llena el arreglo barrio con la data de la busqueda */
          this.barrio = resultado;
          /* se pregunta si existen datos */
          if (this.barrio.length == this.validaciones.INT_NUMBER_0) {
            /* Se llimpia el formulario Buscar */
            this.seletedComunaBuscar.id_comuna = this.validaciones.NULL;
            this.seletedZonaBuscar.id_zona = this.validaciones.NULL;
            this.seletedBarrioBuscar.nom_barrio = this.validaciones.STR_LETTER_WITHOUT;
            /* Se muestra mensaje de alerta que no existe */
            alert('no existe campo de la busqueda..');
            /* Se llama funcion para recargar la pagina */
            this.ngOnInit();
          } else {
            /* inicializo arreglo que se muestra en el html para llenarlo de los datos de la busqueda */
            this.barriosAux = [];
            /* llena los datos del arreglo barrios con los de la busqueda */
            this.barrios = this.barrio;
            /* LLena el arreglo auxiliar para llenarlo con datos validos */
            for(let i = this.validaciones.INT_NUMBER_0; i < this.barrios.length; i++){
              for (let j = this.validaciones.INT_NUMBER_0; j < this.comunas.length; j++) {
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
          }
        }, (err:HttpErrorResponse) => {
          if (err.error instanceof Error) {
            alert("a ocurrido un errror cliente");
          } else {
            alert("a ocurrido un errror servidor");
          }
        });
        /* valida si el campo nombre del barrio del formulario buscar no esta vacio */
      } else if (this.seletedBarrioBuscar.zona_roja != this.validaciones.NULL) {
        /* Se llimpia el formulario Buscar */
        this.seletedComunaBuscar.id_comuna = this.validaciones.NULL;
        this.seletedBarrioBuscar.nom_barrio = this.validaciones.STR_LETTER_WITHOUT;
        /* llama el servicio para buscar todos los nombres y redtificar de que si exite */
        this.barrioService.findAllByIdBarrioZona(this.seletedBarrioBuscar.zona_roja).then(resultado => {
          /* Se llena el arreglo barrio con la data de la busqueda */
          this.barrio = resultado;
          /* se pregunta si existen datos */
          if (this.barrio.length == this.validaciones.INT_NUMBER_0) {
            /* Se llimpia el formulario Buscar */
            this.seletedComunaBuscar.id_comuna = this.validaciones.NULL;
            this.seletedZonaBuscar.id_zona = this.validaciones.NULL;
            this.seletedBarrioBuscar.nom_barrio = this.validaciones.STR_LETTER_WITHOUT;
            /* Se muestra mensaje de alerta */
            alert('no existe campo de la busqueda..');
            /* Se llama funcion para recargar la pagina */
            this.ngOnInit();
          } else {
            /* inicializo arreglo que se muestra en el html para llenarlo de los datos de la busqueda */
            this.barriosAux = [];
            /* llena los datos del arreglo barrios con los de la busqueda */
            this.barrios = this.barrio;
            /* LLena el arreglo auxiliar para llenarlo con datos validos */
            for(let i = this.validaciones.INT_NUMBER_0; i < this.barrios.length; i++){
              for (let j = this.validaciones.INT_NUMBER_0; j < this.comunas.length; j++) {
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

  listar() {
     /* Se llimpia el formulario Agregar */
     this.seletedBarrioAgregar.nom_barrio = this.validaciones.STR_LETTER_WITHOUT;
     this.seletedBarrioAgregar.latitud = this.validaciones.STR_LETTER_WITHOUT;
     this.seletedBarrioAgregar.longitud = this.validaciones.STR_LETTER_WITHOUT;
     
     /* Se llimpia el formulario Buscar */
     this.seletedComunaBuscar.id_comuna = this.validaciones.NULL;
     this.seletedZonaBuscar.id_zona = this.validaciones.NULL;
     this.seletedBarrioBuscar.nom_barrio = this.validaciones.STR_LETTER_WITHOUT;
     /* esta funcion llena los arreglos de la data de la base de datos */
     this.ngOnInit();
  }

  /* funcion de evento al seleccionar el select de si o no en html */
  selectZonaAgregar(item:Number){
    /* si es uno asigna true */
    if (item == this.validaciones.INT_NUMBER_2) {
      this.seletedBarrioAgregar.zona_roja = this.validaciones.TRUE;
    } else {
      /* si no es uno asigna false */
      this.seletedBarrioAgregar.zona_roja = this.validaciones.FALSE;
    }
  }

  /* Cuando se selecciona zona en el formulario buscar agrega el dato seleccionado en el objeto barrio en el campo zona_roja */
  selectZonaBuscar(item:Number) {
    /* Limpia los otros campos de busqueda */
    this.seletedBarrioBuscar.nom_barrio = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedComunaBuscar.id_comuna = this.validaciones.NULL;
    /* Asigna al formulario buscar la zona */
    /* si es dos asigna true */
    if (item == this.validaciones.INT_NUMBER_2) {
      this.seletedBarrioBuscar.zona_roja = this.validaciones.TRUE;
    } else {
      /* si no es uno asigna false */
      this.seletedBarrioBuscar.zona_roja = this.validaciones.FALSE;
    }
  }

  /* si selecciona un cambio en la zona */
  selectZonaActualizar(item:Number) {
    /* Se asigna de acuerdo al cambio */
    if (item == this.validaciones.INT_NUMBER_1) {
      this.seletedBarrioActualizar.zona_roja = this.validaciones.FALSE;
    } else {
      this.seletedBarrioActualizar.zona_roja = this.validaciones.TRUE;
    }
  }

  /* Cuando se selecciona comuna en el formulario buscar agrega el dato seleccionado en el objeto barrio en el campo comuna */
  selectComunaBuscar(item:Number) {
    /* Limpia los otros campos de busqueda */
    this.seletedBarrioBuscar.nom_barrio = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedZonaBuscar.id_zona = this.validaciones.NULL;
    /* Asigna el campo de la comuna al formulario buscar */
    this.seletedBarrioBuscar.id_comunaB = item;
  }

  /* Funcion que elimina lo seleccionado en base de datos */
  eliminar(barrio:Barrio){
    /* dialogo de confirmacion de eliminar los datos */
    if(confirm('estas seguro de querer eliminarlo id_barrio: ' + barrio.id_barrio + ' barrio: ' + barrio.nom_barrio)){
      /* se llama el servicio comuna la funcion eliminar */
      this.barrioService.deleteByIdBarrio(barrio.id_barrio).subscribe((modificado) =>{
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

  /* se llena el objeto actualizar de tipo comuna de acuerdo ala seleccionada en la lista */
  actualizar(barrio:Barrio){
    /* llena el objeto de comuna para actualizar */
    this.seletedBarrioActualizar = barrio;
    /* Asigna por defecto el valor que tiene en la tabla y se asigna 1 0 2 dependiendo del estado */
    if (this.seletedBarrioActualizar.zona_roja == this.validaciones.TRUE) {
      this.seletedZonaActualizar.id_zona = this.validaciones.INT_NUMBER_2;
    } else {
      this.seletedZonaActualizar.id_zona = this.validaciones.INT_NUMBER_1;
    }
    /* Se asigna valor por defecto de Comuna para mostrar nombre correcto */
    for (let i = this.validaciones.INT_NUMBER_0; i < this.comunas.length; i++) {
      for (let j = this.validaciones.INT_NUMBER_0; j < this.barrios.length; j++) {
        if (this.barrios[j].id_barrio == this.seletedBarrioActualizar.id_barrio && 
          this.barrios[j].id_comunaB == this.comunas[i].id_comuna) {
            this.seletedComunaActualizar.id_comuna = this.comunas[i].id_comuna;
        }
      }
    }
  }

  /* si selecciona un cambio en la zona */
  SelectComunaActualizar(item:Number) {
    this.seletedBarrioActualizar.id_comunaB = item;
  }

  /* Funcion que actualiza lo seleccionado en base de datos */
  actualizacion(){
    /* Validacion de Campos Obligatorios y invalidos */
    if (this.validaciones.validaCampoObligatorio(this.seletedBarrioActualizar.nom_barrio) == this.validaciones.TRUE) {
      /* se limpia el input de actualizar */
      this.seletedBarrioActualizar.id_barrio = this.validaciones.NULL;
      /* Alerta Para indicar obligatoriedad */
      alert('CAMPO NOMBRE BARRIO OBLIGATORIO..' + this.seletedBarrioActualizar.nom_barrio);
      /* se limpia el input de actualizar */
      this.ngOnInit();
    } else if (this.validaciones.validacionNombre(this.seletedBarrioActualizar.nom_barrio) == this.validaciones.STR_LETTER_WITHOUT) {
      /* se limpia el input de actualizar */
      this.seletedBarrioActualizar.id_barrio = this.validaciones.NULL;
      /* Alerta Para indicar obligatoriedad */
      alert('CAMPO NOMBRE BARRIO INVALIDO: ' + this.seletedBarrioActualizar.nom_barrio);
      /* se limpia el input de actualizar */
      this.ngOnInit();
    } else if (this.validaciones.validaCampoObligatorio(this.seletedBarrioActualizar.latitud) == this.validaciones.TRUE) {
      /* se limpia el input de actualizar */
      this.seletedBarrioActualizar.id_barrio = this.validaciones.NULL;
      /* Alerta Para indicar obligatoriedad */
      alert('CAMPO LATITUD OBLIGATORIO: ' + this.seletedBarrioActualizar.latitud);
      /* se limpia el input de actualizar */
      this.ngOnInit();
    } else if (this.validaciones.validacionNumerico(this.seletedBarrioActualizar.latitud) == this.validaciones.STR_LETTER_WITHOUT) {
       /* se limpia el input de actualizar */
       this.seletedBarrioActualizar.id_barrio = this.validaciones.NULL;
       /* Alerta Para indicar obligatoriedad */
       alert('CAMPO LATITUD INVALIDO: ' + this.seletedBarrioActualizar.latitud);
       /* se limpia el input de actualizar */
       this.ngOnInit();
    } else if (this.validaciones.validaCampoObligatorio(this.seletedBarrioActualizar.longitud) == this.validaciones.TRUE) {
      /* se limpia el input de actualizar */
      this.seletedBarrioActualizar.id_barrio = this.validaciones.NULL;
      /* Alerta Para indicar obligatoriedad */
      alert('CAMPO LONGITUD OBLIGATORIO: ' + this.seletedBarrioActualizar.longitud);
      /* se limpia el input de actualizar */
      this.ngOnInit();
    } else if (this.validaciones.validacionNumerico(this.seletedBarrioActualizar.longitud) == this.validaciones.STR_LETTER_WITHOUT) {
      /* se limpia el input de actualizar */
      this.seletedBarrioActualizar.id_barrio = this.validaciones.NULL;
      /* Alerta Para indicar obligatoriedad */
      alert('CAMPO LONGITUD INVALIDO: ' + this.seletedBarrioActualizar.longitud);
      /* se limpia el input de actualizar */
      this.ngOnInit();
    } else {
      this.barrioService.findByIdBarrio(this.seletedBarrioActualizar.nom_barrio).then(resultado =>{
        this.barrio = resultado;
        if (this.barrio.length == this.validaciones.INT_NUMBER_0) {
          /* se llama el servicio comuna la funcion Update comuna */
          this.barrioService.updateBarrio({
            /* Agrega a los datos del objeto los que se ponen en la caja de testo de Actualizar  */
            id_barrio : this.seletedBarrioActualizar.id_barrio,
            nom_barrio : this.seletedBarrioActualizar.nom_barrio,
            latitud : this.seletedBarrioActualizar.latitud,
            longitud : this.seletedBarrioActualizar.longitud,
            zona_roja : this.seletedBarrioActualizar.zona_roja,
            id_comunaB : this.seletedBarrioActualizar.id_comunaB,
          }).subscribe((modificado) => {
            /* se limpia el input de actualizar */
            this.seletedBarrioActualizar.id_barrio = this.validaciones.NULL;
            /* Se da respuesta Exitosa del servidor */
            alert("Se actualizo el Barrio con exito");
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
          /* en caso de que le actualice algun otro campo al seleccionado */
          let encuentra:Boolean = this.validaciones.FALSE
          for (let i = this.validaciones.INT_NUMBER_0; i < this.barrio.length; i++) {
            if (this.seletedBarrioActualizar.id_barrio == this.barrio[i].id_barrio && 
              this.seletedBarrioActualizar.nom_barrio == this.barrio[i].nom_barrio) {
               encuentra = this.validaciones.TRUE
            }
          }
          if (encuentra == this.validaciones.TRUE) {
            this.barrioService.updateBarrio({
              /* Agrega a los datos del objeto los que se ponen en la caja de testo de Actualizar  */
              id_barrio : this.seletedBarrioActualizar.id_barrio,
              nom_barrio : this.seletedBarrioActualizar.nom_barrio,
              latitud : this.seletedBarrioActualizar.latitud,
              longitud : this.seletedBarrioActualizar.longitud,
              zona_roja : this.seletedBarrioActualizar.zona_roja,
              id_comunaB : this.seletedBarrioActualizar.id_comunaB,
            }).subscribe((modificado) => {
              /* se limpia el input de actualizar */
              this.seletedBarrioActualizar.id_barrio = this.validaciones.NULL;
              /* Se da respuesta Exitosa del servidor */
              alert("Se actualizo el barrio con exito");
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
            /* Mensaje de respuesta de barrio ya existe */
            alert('Ya Existe barrio: ' + this.seletedBarrioActualizar.nom_barrio);
            /* se limpia el input de actualizar */
            this.seletedBarrioActualizar.id_barrio = this.validaciones.NULL;
            /* Recargo la pagina */
            this.ngOnInit();
          }
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

  cancelar() {
    this.seletedBarrioActualizar.id_barrio = this.validaciones.NULL;
    this.ngOnInit();
  }
}
