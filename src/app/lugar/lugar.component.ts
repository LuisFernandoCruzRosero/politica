/* Servicios */
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LugarService } from '../servicios/lugar.service';
import { ComunaService } from '../servicios/comuna.service';
import { MesaService } from '../servicios/mesa.service';

/* Clases */
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { Token } from '../modelos/token';
import { Comuna } from '../modelos/comuna';
import { Validaciones } from '../modelos/validaciones';
import { Zona } from '../modelos/zona';
import { Lugar } from '../modelos/lugar';
import { Mesa } from '../modelos/mesa';
import { LugarAux } from '../modelos/lugar-aux';


@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styleUrls: ['./lugar.component.css']
})
export class LugarComponent implements OnInit {

   /* Llamo ala clase validaciones */
   validaciones = new Validaciones();

   /* Total de Lugares Ingresados */
  totalLugar:Number = this.validaciones.INT_NUMBER_0;

  /* Inicializo un arreglo del objeto Lugar */
  lugares:Lugar[] = [];

  /* Inicializo un arreglo del objeto Lugar */
  lugar:Lugar[] = [];

    /* Si o No */
  zona:Zona[] = [
    {id_zona:this.validaciones.INT_NUMBER_2, name_zona:this.validaciones.STR_LETTER_SI}, 
    {id_zona:this.validaciones.INT_NUMBER_1, name_zona:this.validaciones.STR_LETTER_NO}
  ];

  /* Inicializo un arreglo del objeto Lugar Para la busqueda*/
  lugaresBuscar:Lugar[] = [];

  /* Inicializo un arreglo del objeto Lugar Para la lista sin id */
  lugaresAux:LugarAux[] = [];

   /* Inicializamos un arreglo del objeto Usuaio */
   usuario:UsuarioFindAll[] = [];

   /* Inicializamos un arreglo del objeto Digitador */
   digitador:DigitadorFindAll[] = [];
 
   /* inicializamos un arreglo del objeto Comuna */
   comunas:Comuna [] = [];

    /* Inicializo el objeto Lugar Para formulario Agregar*/
  seletedLugarAgregar:Lugar = new Lugar(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.NULL);

  /* Inicializo el objeto Lugar Para formulario Actualizar*/
  seletedLugarActualizar:Lugar = new Lugar(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
     this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.NULL);

  /* Inicializo el objeto Lugar Para formulario Buscar*/
  seletedLugarBuscar:Lugar = new Lugar(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.NULL);

  /* Inicializo el objeto Lugar Para formulario Agregar Comuna*/
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
  /* Se llama a Lugar service para poder realizar la funciones del CRUD del modulo de las mesas */
  


  constructor(private loginServi:LoginService,private mesaServi:MesaService, private route:Router, private lugarService:LugarService, 
    private comunaService:ComunaService) { this.lugaresAux = []  }

  ngOnInit() {

     /* Se limpia arreglo auxiliar para volver a llenar */
     this.lugaresAux = [];
     /* inicializo zona en html */
     this.seletedZonaAgregar.id_zona = this.validaciones.INT_NUMBER_1;
     /* inicializo zona en html */
     /*this.seletedLugarAgregar.zona_roja = false;

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
          /* Consulta los datos de la tabla comuna */
          this.comunaService.findAllComuna().then(resultado => {
            /* Asigno al arreglo Comunas todas las existenten en la tabla */
            this.comunas = resultado;
            /* consulta la cantidad de Lugares que existen en el sistema */
            this.lugarService.findByIdTotalLugar().subscribe(resultado => { 
            this.totalLugar = resultado;
            this.lugarService.findByIdTotalLugar().subscribe(resultado=>{
              /* Asingno a la variable totalComuna la cantidad de comunas existentes */
              this.totalLugar = resultado;
            });
            //if (this.encontrado == true) {
              /* Se llena un arreglo auxiliar para listar correctamente los datos de la tabla lugar */
              for(let i = this.validaciones.INT_NUMBER_0; i < this.lugares.length; i++){
                for (let j = this.validaciones.INT_NUMBER_0; j < this.comunas.length; j++) {
                  if (this.comunas[j].id_comuna == this.lugares[i].id_comunaL) {
                    this.addLugarAux({
                      id_lugar:this.lugares[i].id_lugar,
                      nom_lugar:this.lugares[i].nom_lugar,
                      latitud:this.lugares[i].latitud,
                      longitud:this.lugares[i].longitud,
                      zona_roja:this.lugares[i].zona_roja,
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

  /* Agregar Lugar a Arreglo local par aquitar id */
  addLugarAux(item:LugarAux){
    this.lugaresAux.push(item);
  }

  
  /*  Funcion Guardar Lugar */
  guardar() {
    /* Validacion de Campos Obligatorios y invalidos */
    if (this.validaciones.validaCampoObligatorio(this.seletedLugarAgregar.nom_lugar) == this.validaciones.TRUE) {
      alert('CAMPO NOMBRE LUGAR OBLIGATORIO..');
    } else if (this.validaciones.validacionNombre(this.seletedLugarAgregar.nom_lugar) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO NOMBRE LUGAR INVALIDO: ' + this.seletedLugarAgregar.nom_lugar);
    } else if (this.validaciones.validaCampoObligatorio(this.seletedLugarAgregar.latitud) == this.validaciones.TRUE) {
      alert('CAMPO LATITUD OBLIGATORIO..');
    } else if (this.validaciones.validacionNumerico(this.seletedLugarAgregar.latitud) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO LATITUD INVALIDO: ' + this.seletedLugarAgregar.latitud);
    } else if (this.validaciones.validaCampoObligatorio(this.seletedLugarAgregar.longitud) == this.validaciones.TRUE) {
      alert('CAMPO LONGITUD OBLIGATORIO..');
    } else if (this.validaciones.validacionNumerico(this.seletedLugarAgregar.longitud) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO LONGITUD INVALIDO: ' + this.seletedLugarAgregar.longitud);
    } else {
      /* PAra tomar valor Real numerico */
      this.seletedLugarAgregar.latitud = (parseFloat(this.seletedLugarAgregar.latitud.toString())).toString();
      /* PAra tomar valor Real numerico */
      this.seletedLugarAgregar.longitud = (parseFloat(this.seletedLugarAgregar.longitud.toString())).toString();
      /* LLamo al servicio lugar para buscar los Lugares existentes */
      this.lugarService.findByIdLugar(this.seletedLugarAgregar.nom_lugar).then(resultado =>{
        /* Se llena el arreglo Lugares con la data seleccionada en la busqueda */
        this.lugares = resultado;
        /* Se pregunta si Lugares contiene datos */
        if (this.lugares.length == this.validaciones.INT_NUMBER_0) {
          /* llama el servivio de agregar un lugar en la tabla Lugar */
          this.lugarService.insertLugar({
            /* Se envia la data diligenciada en el formulario */
            id_lugar:this.seletedLugarAgregar.id_lugar,
            nom_lugar: this.seletedLugarAgregar.nom_lugar,
            latitud : this.seletedLugarAgregar.latitud,
            longitud : this.seletedLugarAgregar.longitud,
            zona_roja: this.seletedLugarAgregar.zona_roja,
            id_comunaL: this.seletedComunaAgregar.id_comuna
          }).subscribe((resultado) => {
            /* Se da respuesta Exitosa del servidor */
            alert("Se Agrego la Mesa");
            /* se llama la funcion inicial para que recargue la pagina */
            this.ngOnInit();
            /* se limpia el input de agregar nombre de Lugar */
            this.seletedLugarAgregar.nom_lugar = this.validaciones.STR_LETTER_WITHOUT;
            /* se limpia el input de latitud */
            this.seletedLugarAgregar.latitud = this.validaciones.STR_LETTER_WITHOUT;
              /* se limpia el input de longitud */
            this.seletedLugarAgregar.longitud = this.validaciones.STR_LETTER_WITHOUT;
          });
        } else {
          /* Respuesta de mesa a agregar ya encontrada */
          alert('nombre del Lugar :' + this.seletedLugarAgregar.nom_lugar + ' Ya Existe');
        }
      });
    }    
  }


  /* Busqueda de Campos */
  buscar() {
    if (this.seletedLugarBuscar.nom_lugar == this.validaciones.STR_LETTER_WITHOUT && 
      this.seletedZonaBuscar.id_zona == this.validaciones.NULL && this.seletedComunaBuscar.id_comuna == this.validaciones.NULL) {
        alert('los campos de Busqueda estan vacios..')
    } else {
      /* valida si el campo nombre del Lugar del formulario buscar no esta vacio */
      if (this.validaciones.validaCampoObligatorio(this.seletedLugarBuscar.nom_lugar) == this.validaciones.FALSE) {
        /* Limpia los otros campos de busqueda */
        this.seletedComunaBuscar.id_comuna = this.validaciones.NULL;
        this.seletedZonaBuscar.id_zona = this.validaciones.NULL;
        /* llama el servicio para buscar todos los nombres y redtificar de que si exite */
        this.lugarService.findByIdLugar(this.seletedLugarBuscar.nom_lugar).then(resultado => {
          /* Se llena el arreglo Lugar con la data de la busqueda */
          this.lugar = resultado;
          /* se pregunta si existen datos */
          if (this.lugar.length == this.validaciones.INT_NUMBER_0) {
            /* Se llimpia el formulario Buscar */
            this.seletedComunaBuscar.id_comuna = this.validaciones.NULL;
            this.seletedZonaBuscar.id_zona = this.validaciones.NULL;
            this.seletedLugarBuscar.nom_lugar = this.validaciones.STR_LETTER_WITHOUT;
            /* Mensaje de alerta que no existe el dato */
            alert('no existe campo de la busqueda..');
            /* Se llama para recargar la pagina */
            this.ngOnInit();
          } else {
            /* inicializo arreglo que se muestra en el html para llenarlo de los datos de la busqueda */
            this.lugaresAux = [];
            /* llena los datos del arreglo Lugares con los de la busqueda */
            this.lugares = this.lugar;
            console.log('nombre: '+this.lugares)
            /* LLena el arreglo auxiliar para llenarlo con datos validos */
            for(let i = this.validaciones.INT_NUMBER_0; i < this.lugares.length; i++){
              for (let j = this.validaciones.INT_NUMBER_0; j < this.comunas.length; j++) {
                if (this.comunas[j].id_comuna == this.lugares[i].id_comunaL) {
                  this.addLugarAux({
                    id_lugar:this.lugares[i].id_lugar,
                    nom_lugar:this.lugares[i].nom_lugar,
                    latitud:this.lugares[i].latitud,
                    longitud:this.lugares[i].longitud,
                    zona_roja:this.lugares[i].zona_roja,
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
         /* valida si el campo nombre del lugar del formulario buscar no esta vacio */
      } else if (this.seletedLugarBuscar.id_comunaL != this.validaciones.NULL) {
        /* Limpia los otros campos de busqueda */
        this.seletedLugarBuscar.nom_lugar = this.validaciones.STR_LETTER_WITHOUT;
        this.seletedLugarBuscar.zona_roja = this.validaciones.NULL;
        /* llama el servicio para buscar todos los nombres y redtificar de que si exite */
        this.lugarService.findAllLugarComuna(this.seletedLugarBuscar.id_comunaL).then(resultado => {
          /* Se llena el arreglo lugar con la data de la busqueda */
          this.lugar = resultado;
          /* se pregunta si existen datos */
          if (this.lugar.length == this.validaciones.INT_NUMBER_0) {
            /* Se llimpia el formulario Buscar */
            this.seletedComunaBuscar.id_comuna = this.validaciones.NULL;
            this.seletedZonaBuscar.id_zona = this.validaciones.NULL;
            this.seletedLugarBuscar.nom_lugar = this.validaciones.STR_LETTER_WITHOUT;
            /* Se muestra mensaje de alerta que no existe */
            alert('no existe campo de la busqueda..');
            /* Se llama funcion para recargar la pagina */
            this.ngOnInit();
          } else {
            /* inicializo arreglo que se muestra en el html para llenarlo de los datos de la busqueda */
            this.lugaresAux = [];
            /* llena los datos del arreglo Lugares con los de la busqueda */
            this.lugares = this.lugar;
            console.log('Comuna: '+this.lugares)
            /* LLena el arreglo auxiliar para llenarlo con datos validos */
            for(let i = this.validaciones.INT_NUMBER_0; i < this.lugares.length; i++){
              for (let j = this.validaciones.INT_NUMBER_0; j < this.comunas.length; j++) {
                if (this.comunas[j].id_comuna == this.lugares[i].id_comunaL) {
                  this.addLugarAux({
                    id_lugar:this.lugares[i].id_lugar,
                    nom_lugar:this.lugares[i].nom_lugar,
                    latitud:this.lugares[i].latitud,
                    longitud:this.lugares[i].longitud,
                    zona_roja:this.lugares[i].zona_roja,
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
        /* valida si el campo nombre del lugar del formulario buscar no esta vacio */
      } else if (this.seletedLugarBuscar.zona_roja != this.validaciones.NULL) {
        /* Se llimpia el formulario Buscar */
        this.seletedComunaBuscar.id_comuna = this.validaciones.NULL;
        this.seletedLugarBuscar.nom_lugar = this.validaciones.STR_LETTER_WITHOUT;
        /* llama el servicio para buscar todos los nombres y redtificar de que si exite */
        this.lugarService.findAllByIdLugarZona(this.seletedLugarBuscar.zona_roja).then(resultado => {
          /* Se llena el arreglo lugar con la data de la busqueda */
          this.lugar = resultado;
          /* se pregunta si existen datos */
          if (this.lugar.length == this.validaciones.INT_NUMBER_0) {
            /* Se llimpia el formulario Buscar */
            this.seletedComunaBuscar.id_comuna = this.validaciones.NULL;
            this.seletedZonaBuscar.id_zona = this.validaciones.NULL;
            this.seletedLugarBuscar.nom_lugar = this.validaciones.STR_LETTER_WITHOUT;
            /* Se muestra mensaje de alerta */
            alert('no existe campo de la busqueda..');
            /* Se llama funcion para recargar la pagina */
            this.ngOnInit();
          } else {
            /* inicializo arreglo que se muestra en el html para llenarlo de los datos de la busqueda */
            this.lugaresAux = [];
            /* llena los datos del arreglo lugares con los de la busqueda */
            this.lugares = this.lugar;
            console.log('zona: '+this.lugares)
            /* LLena el arreglo auxiliar para llenarlo con datos validos */
            for(let i = this.validaciones.INT_NUMBER_0; i < this.lugares.length; i++){
              for (let j = this.validaciones.INT_NUMBER_0; j < this.comunas.length; j++) {
                if (this.comunas[j].id_comuna == this.lugares[i].id_comunaL) {
                  this.addLugarAux({
                    id_lugar:this.lugares[i].id_lugar,
                    nom_lugar:this.lugares[i].nom_lugar,
                    latitud:this.lugares[i].latitud,
                    longitud:this.lugares[i].longitud,
                    zona_roja:this.lugares[i].zona_roja,
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
    this.seletedLugarAgregar.nom_lugar = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedLugarAgregar.latitud = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedLugarAgregar.longitud = this.validaciones.STR_LETTER_WITHOUT;
    
    /* Se llimpia el formulario Buscar */
    this.seletedComunaBuscar.id_comuna = this.validaciones.NULL;
    this.seletedZonaBuscar.id_zona = this.validaciones.NULL;
    this.seletedLugarBuscar.nom_lugar = this.validaciones.STR_LETTER_WITHOUT;
    /* esta funcion llena los arreglos de la data de la base de datos */
    this.ngOnInit();
 }

 /* funcion de evento al seleccionar el select de si o no en html */
 selectZonaAgregar(item:Number){
   /* si es uno asigna true */
   if (item == this.validaciones.INT_NUMBER_2) {
     this.seletedLugarAgregar.zona_roja = this.validaciones.TRUE;
   } else {
     /* si no es uno asigna false */
     this.seletedLugarAgregar.zona_roja = this.validaciones.FALSE;
   }
 }

 /* Cuando se selecciona zona en el formulario buscar agrega el dato seleccionado en el objeto lugar en el campo zona_roja */
 selectZonaBuscar(item:Number) {
   /* Limpia los otros campos de busqueda */
   this.seletedLugarBuscar.nom_lugar = this.validaciones.STR_LETTER_WITHOUT;
   this.seletedComunaBuscar.id_comuna = this.validaciones.NULL;
   /* Asigna al formulario buscar la zona */
   /* si es dos asigna true */
   if (item == this.validaciones.INT_NUMBER_2) {
     this.seletedLugarBuscar.zona_roja = this.validaciones.TRUE;
   } else {
     /* si no es uno asigna false */
     this.seletedLugarBuscar.zona_roja = this.validaciones.FALSE;
   }
 }

 /* si selecciona un cambio en la zona */
 selectZonaActualizar(item:Number) {
   /* Se asigna de acuerdo al cambio */
   if (item == this.validaciones.INT_NUMBER_1) {
     this.seletedLugarActualizar.zona_roja = this.validaciones.FALSE;
   } else {
     this.seletedLugarActualizar.zona_roja = this.validaciones.TRUE;
   }
 }

 /* Cuando se selecciona comuna en el formulario buscar agrega el dato seleccionado en el objeto lugar en el campo comuna */
 selectComunaBuscar(item:Number) {
   /* Limpia los otros campos de busqueda */
   this.seletedLugarBuscar.nom_lugar = this.validaciones.STR_LETTER_WITHOUT;
   this.seletedZonaBuscar.id_zona = this.validaciones.NULL;
   /* Asigna el campo de la comuna al formulario buscar */
   this.seletedLugarBuscar.id_comunaL = item;
 }

 /* Funcion que elimina lo seleccionado en base de datos */
 eliminar(lugar:Lugar){
   /* dialogo de confirmacion de eliminar los datos */
   if(confirm('estas seguro de querer eliminarlo id_lugar: ' + lugar.id_lugar + ' lugar: ' + lugar.nom_lugar)){
     /* se llama el servicio comuna la funcion eliminar */
     this.lugarService.deleteByIdLugar(lugar.id_lugar).subscribe((modificado) =>{
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
 actualizar(lugar:Lugar){
   /* llena el objeto de comuna para actualizar */
   this.seletedLugarActualizar = lugar;
   /* Asigna por defecto el valor que tiene en la tabla y se asigna 1 0 2 dependiendo del estado */
   if (this.seletedLugarActualizar.zona_roja == this.validaciones.TRUE) {
     this.seletedZonaActualizar.id_zona = this.validaciones.INT_NUMBER_2;
   } else {
     this.seletedZonaActualizar.id_zona = this.validaciones.INT_NUMBER_1;
   }
   /* Se asigna valor por defecto de Comuna para mostrar nombre correcto */
   for (let i = this.validaciones.INT_NUMBER_0; i < this.comunas.length; i++) {
     for (let j = this.validaciones.INT_NUMBER_0; j < this.lugares.length; j++) {
       if (this.lugares[j].id_lugar == this.seletedLugarActualizar.id_lugar && 
         this.lugares[j].id_comunaL == this.comunas[i].id_comuna) {
           this.seletedComunaActualizar.id_comuna = this.comunas[i].id_comuna;
       }
     }
   }
 }

 /* si selecciona un cambio en la zona */
 SelectComunaActualizar(item:Number) {
   this.seletedLugarActualizar.id_comunaL = item;
 }


   /* Funcion que actualiza lo seleccionado en base de datos */
   actualizacion(){
    /* Validacion de Campos Obligatorios y invalidos */
    if (this.validaciones.validaCampoObligatorio(this.seletedLugarActualizar.nom_lugar) == this.validaciones.TRUE) {
      /* se limpia el input de actualizar */
      this.seletedLugarActualizar.id_lugar = this.validaciones.NULL;
      /* Alerta Para indicar obligatoriedad */
      alert('CAMPO NOMBRE MESA OBLIGATORIO..' + this.seletedLugarActualizar.nom_lugar);
      /* se limpia el input de actualizar */
      this.ngOnInit();
    } else if (this.validaciones.validacionNombre(this.seletedLugarActualizar.nom_lugar) == this.validaciones.STR_LETTER_WITHOUT) {
      /* se limpia el input de actualizar */
      this.seletedLugarActualizar.id_lugar = this.validaciones.NULL;
      /* Alerta Para indicar obligatoriedad */
      alert('CAMPO NOMBRE LUGAR INVALIDO: ' + this.seletedLugarActualizar.nom_lugar);
      /* se limpia el input de actualizar */
      this.ngOnInit();
    } else if (this.validaciones.validaCampoObligatorio(this.seletedLugarActualizar.latitud) == this.validaciones.TRUE) {
      /* se limpia el input de actualizar */
      this.seletedLugarActualizar.id_lugar = this.validaciones.NULL;
      /* Alerta Para indicar obligatoriedad */
      alert('CAMPO LATITUD OBLIGATORIO: ' + this.seletedLugarActualizar.latitud);
      /* se limpia el input de actualizar */
      this.ngOnInit();
    } else if (this.validaciones.validacionNumerico(this.seletedLugarActualizar.latitud) == this.validaciones.STR_LETTER_WITHOUT) {
       /* se limpia el input de actualizar */
       this.seletedLugarActualizar.id_lugar = this.validaciones.NULL;
       /* Alerta Para indicar obligatoriedad */
       alert('CAMPO LATITUD INVALIDO: ' + this.seletedLugarActualizar.latitud);
       /* se limpia el input de actualizar */
       this.ngOnInit();
    } else if (this.validaciones.validaCampoObligatorio(this.seletedLugarActualizar.longitud) == this.validaciones.TRUE) {
      /* se limpia el input de actualizar */
      this.seletedLugarActualizar.id_lugar = this.validaciones.NULL;
      /* Alerta Para indicar obligatoriedad */
      alert('CAMPO LONGITUD OBLIGATORIO: ' + this.seletedLugarActualizar.longitud);
      /* se limpia el input de actualizar */
      this.ngOnInit();
    } else if (this.validaciones.validacionNumerico(this.seletedLugarActualizar.longitud) == this.validaciones.STR_LETTER_WITHOUT) {
      /* se limpia el input de actualizar */
      this.seletedLugarActualizar.id_lugar = this.validaciones.NULL;
      /* Alerta Para indicar obligatoriedad */
      alert('CAMPO LONGITUD INVALIDO: ' + this.seletedLugarActualizar.longitud);
      /* se limpia el input de actualizar */
      this.ngOnInit();
    } else {
      this.lugarService.findByIdLugar(this.seletedLugarActualizar.nom_lugar).then(resultado =>{
        this.lugar = resultado;
        if (this.lugar.length == this.validaciones.INT_NUMBER_0) {
          /* se llama el servicio comuna la funcion Update comuna */
          this.lugarService.updateLugar({
            /* Agrega a los datos del objeto los que se ponen en la caja de testo de Actualizar  */
            id_lugar : this.seletedLugarActualizar.id_lugar,
            nom_lugar : this.seletedLugarActualizar.nom_lugar,
            latitud : this.seletedLugarActualizar.latitud,
            longitud : this.seletedLugarActualizar.longitud,
            zona_roja : this.seletedLugarActualizar.zona_roja,
            id_comunaL : this.seletedLugarActualizar.id_comunaL,
          }).subscribe((modificado) => {
            /* se limpia el input de actualizar */
            this.seletedLugarActualizar.id_lugar = this.validaciones.NULL;
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
          /* en caso de que le actualice algun otro campo al seleccionado */
          let encuentra:Boolean = this.validaciones.FALSE
          for (let i = this.validaciones.INT_NUMBER_0; i < this.lugar.length; i++) {
            if (this.seletedLugarActualizar.id_lugar == this.lugar[i].id_lugar && 
              this.seletedLugarActualizar.nom_lugar == this.lugar[i].nom_lugar) {
               encuentra = this.validaciones.TRUE
            }
          }
          if (encuentra == this.validaciones.TRUE) {
            this.lugarService.updateLugar({
              /* Agrega a los datos del objeto los que se ponen en la caja de testo de Actualizar  */
              id_lugar : this.seletedLugarActualizar.id_lugar,
              nom_lugar : this.seletedLugarActualizar.nom_lugar,
              latitud : this.seletedLugarActualizar.latitud,
              longitud : this.seletedLugarActualizar.longitud,
              zona_roja : this.seletedLugarActualizar.zona_roja,
              id_comunaL : this.seletedLugarActualizar.id_comunaL,
            }).subscribe((modificado) => {
              /* se limpia el input de actualizar */
              this.seletedLugarActualizar.id_lugar = this.validaciones.NULL;
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
            /* Mensaje de respuesta de lugar ya existe */
            alert('Ya Existe Lugar: ' + this.seletedLugarActualizar.nom_lugar);
            /* se limpia el input de actualizar */
            this.seletedLugarActualizar.id_lugar = this.validaciones.NULL;
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
}