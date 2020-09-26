/* Servicios */
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LugarMesaService } from '../servicios/lugar-mesa.service';
import { LugarService } from '../servicios/lugar.service';
import { MesaService } from '../servicios/mesa.service';


/* Clases */
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { Token } from '../modelos/token';
import { Validaciones } from '../modelos/validaciones';
import { LugarMesa } from '../modelos/lugar-mesa';
import { Lugar } from '../modelos/lugar';
import { Mesa } from '../modelos/mesa';
import { LugarmesaAux } from '../modelos/lugarmesa-aux';


@Component({
  selector: 'app-lugar-mesa',
  templateUrl: './lugar-mesa.component.html',
  styleUrls: ['./lugar-mesa.component.css']
})
export class LugarMesaComponent implements OnInit {

   /* Llamo ala clase validaciones */
   validaciones = new Validaciones();

   /* Total de LugarMesa Ingresados */
   totalLugarMesa:Number = this.validaciones.INT_NUMBER_0;
 
   /* Inicializo un arreglo del objeto LugarMesa */
   lugarmesas:LugarMesa[] = [];
 
   /* Inicializo un arreglo del objeto LugarMesa */
   lugarmesa:LugarMesa[] = [];

   /* Inicializo un arreglo del objeto LugarMesa Para la busqueda*/
  lugarmesaBuscar:LugarMesa[] = [];

  /* Inicializo un arreglo del objeto LugarMesa Para la lista sin id */
  lugarmesasAux:LugarmesaAux[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];

  /* Inicializamos un arreglo del objeto Digitador */
  digitador:DigitadorFindAll[] = [];

  /* inicializamos un arreglo del objeto lugar */
  lugares:Lugar [] = [];

  /* inicializamos un arreglo del objeto mesa */
  mesas:Mesa [] = [];

  /* Inicializo el objeto Lugar Para formulario Actualizar*/
  seletedLugarActualizar:Lugar = new Lugar(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.NULL);

  /* Inicializo el objeto Mesa Para formulario Actualizar*/
  seletedMesaActualizar:Mesa = new Mesa(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT);

  /* Inicializo el objeto lugarMesa Para formulario Agregar*/
  seletedLugarMesaAgregar:LugarMesa = new LugarMesa(this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL);
 
  /* Inicializo el objeto lugarMesa Para formulario Buscar*/
  seletedLugarMesaBuscar:LugarMesa = new LugarMesa(this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL);

  /* Inicializo el objeto lugarMesa Para formulario Actualizar*/
  seletedLugarMesaActualizar:LugarMesa = new LugarMesa(this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL);
  
  /* Verificar la Autenticidad */
  encontrado:Boolean = this.validaciones.FALSE;

  /* Para bloquear desdel ts la viste del HTML dependiendo el tipo de usuario */
  vista:Number;

  /* Token de verificacion de logueo */
  token:Token;


  constructor(private loginServi:LoginService, private route:Router, private lugarmesaService:LugarMesaService, 
    private lugarService:LugarService, private mesaService:MesaService) { this.lugarmesasAux = [] }

  ngOnInit() {

    /* Se limpia arreglo auxiliar para volver a llenar */
    this.lugarmesasAux = [];
     /* Consulto los Datos de la tabla usuario */
     this.loginServi.findAllUsuario().then(resultado => {
      /* Asigno los datos de la tabla usuario al arreglo usuario */
      this.usuario = resultado;
      /* Consulto los Datos de la tabla digitador */
      this.loginServi.findAllDigitador().then(resultado => {
        /* Asigno los datos de la tabla digitador al arreglo digitador */
        this.digitador = resultado;
        /* Consulto Los datos de la tabla LugarMesa */
        this.lugarmesaService.findAllLugarMesa().then(resultado => {
          /* Asigno al arreglo LugarMesa todas las existenten en la tabla */
          this.lugarmesas = resultado;
          /* Consulta los datos de la tabla mesa */
          this.mesaService.findAllMesa().then(resultado => {
            /* Asigno al arreglo mesas todas las existenten en la tabla */
            this.mesas = resultado;
            /* consulta la cantidad de LugarMesa que existen en el sistema */
            this.lugarmesaService.findByIdTotalLugarMesa().subscribe(resultado => { 
            this.totalLugarMesa = resultado;
           /* Consulta los datos de la tabla lugar */
            this.lugarService.findAllLugar().then(resultado=>{
              /* Asingno al arreglo lugares la cantidad de lugares existentes */
              this.lugares = resultado;
             //if (this.encontrado == true) {
              /* Se llena un arreglo auxiliar para listar correctamente los datos de la tabla barrio */
              for(let i = this.validaciones.INT_NUMBER_0; i < this.lugarmesas.length; i++){
                for (let j = this.validaciones.INT_NUMBER_0; j < this.mesas.length; j++) {
                  for(let k = this.validaciones.INT_NUMBER_0; k < this.lugares.length; k++) {
                    if (this.mesas[j].id_mesa == this.lugarmesas[i].id_mesa) {
                      if ( this.lugares[k].id_lugar == this.lugarmesas[i].id_lugar) {
                        this.addLugarMesaAux({
                          id_lugar_mesa:this.lugarmesas[i].id_lugar_mesa,
                          nom_lugar:this.lugares[k].nom_lugar,
                          nom_mesa:this.mesas[j].nom_mesa,
                        });

                      }
                      
                    }
                  }
                  
                }
              }
              /* inicializa el select de la mesa y lugar para colocar valor por defecto */
              this.seletedLugarMesaAgregar.id_mesa = this.validaciones.INT_NUMBER_1;
              this.seletedLugarMesaAgregar.id_lugar = this.validaciones.INT_NUMBER_1;
              this.seletedLugarMesaBuscar.id_lugar = this.validaciones.INT_NUMBER_1;
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
    }, (err:HttpErrorResponse) => {
      if (err.error instanceof Error) {
        alert("a ocurrido un errror cliente");
      } else {
        alert("a ocurrido un errror servidor");
      }
    });
  }

  /* Agregar Barrio a Arreglo local par aquitar id */
  addLugarMesaAux(item:LugarmesaAux){
    this.lugarmesasAux.push(item);
  }

   /*  Funcion Guardar LugarMesa */
   guardar() {
  this.lugarmesaService.findByIdLugarMesa(this.seletedLugarMesaAgregar.id_lugar, this.seletedLugarMesaAgregar.id_mesa).then(resultado =>{
        /* Se llena el arreglo barrios con la data seleccionada en la busqueda */
        this.lugarmesas = resultado;
        /* Se pregunta si barrios contiene datos */
        if (this.lugarmesas.length == this.validaciones.INT_NUMBER_0) {
          /* llama el servicio de agregar un barrio en la tabla barrio */
          this.lugarmesaService.insertLugarMesa({
            /* Se envia la data diligenciada en el formulario */
            id_lugar_mesa:this.seletedLugarMesaAgregar.id_lugar_mesa,
            id_lugar: this.seletedLugarMesaAgregar.id_lugar,
            id_mesa: this.seletedLugarMesaAgregar.id_mesa,
            
          }).subscribe((resultado) => {
            /* Se da respuesta Exitosa del servidor */
            alert("Se Agrego la Mesa");
            /* se llama la funcion inicial para que recargue la pagina */
            this.ngOnInit();
            /* se limpia el input de agregar de lugar */
            this.seletedLugarMesaAgregar.id_lugar = this.validaciones.INT_NUMBER_1;
            /* se limpia el input de mesa */
            this.seletedLugarMesaAgregar.id_mesa = this.validaciones.INT_NUMBER_1;
          });
        } else {
          /* Respuesta de mesa a agregar ya encontrada */
          alert('nombre del barrio :' + this.seletedLugarMesaAgregar.id_lugar_mesa + ' Ya Existe');
        }
      });
    } 
   /* Busqueda de Campos */
   buscar() {
     console.log(this.seletedLugarMesaBuscar.id_lugar);
      /* valida si el campo nombre del lugarmesa del formulario buscar no esta vacio */
        /* llama el servicio para buscar todos los nombres y redtificar de que si exite */
        this.lugarmesaService.findAllByIdLugarMesa(this.seletedLugarMesaBuscar.id_lugar).then(resultado => {
          /* Se llena el arreglo barrio cn la data de la busqueda */
          this.lugarmesas = resultado;
          /* se pregunta si existen datos */
          if (this.lugarmesas.length == this.validaciones.INT_NUMBER_0) {
            /* Se llimpia el formulario Buscar */
            this.seletedLugarMesaBuscar.id_lugar = this.validaciones.NULL;
            this.seletedLugarMesaBuscar.id_mesa = this.validaciones.NULL;
            /* Mensaje de alerta que no existe el dato */
            alert('no existe campo de la busqueda..');
            /* Se llama para recargar la pagina */
            this.ngOnInit();
          } else {
            /* inicializo arreglo que se muestra en el html para llenarlo de los datos de la busqueda */
            this.lugarmesasAux = [];
            /* llena los datos del arreglo barrios con los de la busqueda */
            this.lugarmesa = this.lugarmesas;
            /* LLena el arreglo auxiliar para llenarlo con datos validos */
            for(let i = this.validaciones.INT_NUMBER_0; i < this.lugarmesas.length; i++){
              for (let j = this.validaciones.INT_NUMBER_0; j < this.mesas.length; j++) {
                for(let k = this.validaciones.INT_NUMBER_0; k < this.lugares.length; k++) {
                  if (this.mesas[j].id_mesa == this.lugarmesas[i].id_mesa) {
                    if ( this.lugares[k].id_lugar == this.lugarmesas[i].id_lugar) {
                      this.addLugarMesaAux({
                        id_lugar_mesa:this.lugarmesas[i].id_lugar_mesa,
                        nom_lugar:this.lugares[k].nom_lugar,
                        nom_mesa:this.mesas[j].nom_mesa,
                      });

                    }
                  }
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
      
      listar() {
        /* Se llimpia el formulario Agregar */
        this.seletedLugarMesaAgregar.id_lugar = this.validaciones.INT_NUMBER_1;
        this.seletedLugarMesaAgregar.id_mesa = this.validaciones.INT_NUMBER_1;
        
        /* Se llimpia el formulario Buscar */
        this.seletedLugarMesaBuscar.id_lugar = this.validaciones.NULL;
        /* esta funcion llena los arreglos de la data de la base de datos */
        this.ngOnInit();
     }
      
     /* Cuando se selecciona comuna en el formulario buscar agrega el dato seleccionado en el objeto barrio en el campo comuna */
     selectLugarMesaBuscar(item:Number) {
       /* Asigna el campo de la comuna al formulario buscar */
       this.seletedLugarMesaBuscar.id_lugar = item;
      }
      
      /* Funcion que elimina lo seleccionado en base de datos */
      eliminar(lugarmesa:LugarMesa){
      /* dialogo de confirmacion de eliminar los datos */
      if(confirm('estas seguro de querer eliminarlo id_lugar_mesa: ' + lugarmesa.id_lugar_mesa + ' lugar_mesa: ' + lugarmesa.id_lugar_mesa)){
      /* se llama el servicio lugar_mesa a  la funcion eliminar */
      this.lugarmesaService.deleteByIdLugarMesa(lugarmesa.id_lugar_mesa).subscribe((modificado) =>{
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

  /* se llena el objeto actualizar de tipo lugar_mesa de acuerdo ala seleccionada en la lista */
  actualizar(lugarmesa:LugarMesa){
    /* llena el objeto de comuna para actualizar */
    this.seletedLugarMesaActualizar = lugarmesa;
    console.log(this.seletedLugarMesaActualizar);
    console.log(this.lugarmesas);
    console.log(this.mesas);
    console.log(this.lugares);
    /* Se asigna valor por defecto de Comuna para mostrar nombre correcto */
    for (let i = this.validaciones.INT_NUMBER_0; i < this.mesas.length; i++) {
      for (let k = this.validaciones.INT_NUMBER_0; k < this.lugares.length; k++) {
        for (let j = this.validaciones.INT_NUMBER_0; j < this.lugarmesas.length; j++){
          if (this.lugarmesas[j].id_lugar_mesa == this.seletedLugarMesaActualizar.id_lugar_mesa && 
            this.lugarmesas[j].id_mesa == this.mesas[i].id_mesa &&  this.lugarmesas[j].id_lugar == this.lugares[k].id_lugar) {
              this.seletedMesaActualizar.id_mesa = this.mesas[i].id_mesa;
              this.seletedLugarActualizar.id_lugar = this.lugares[k].id_lugar;
          }
        }
      }
    }
  }

  /* si selecciona un cambio en la mesa */
  SelectMesaActualizar(item:Number) {
    this.seletedLugarMesaActualizar.id_mesa = item;
  }

  /* si selecciona un cambio en la lugar */
  SelectLugarActualizar(item:Number) {
    this.seletedLugarMesaActualizar.id_lugar = item;
  }

  /* Funcion que actualiza lo seleccionado en base de datos */
  actualizacion() {
    this.seletedLugarMesaActualizar.id_lugar  = this.seletedLugarActualizar.id_lugar;
    this.seletedLugarMesaActualizar.id_mesa = this.seletedMesaActualizar.id_mesa;
    this.lugarmesaService.findByIdLugarMesa(this.seletedLugarMesaActualizar.id_lugar, this.seletedLugarMesaActualizar.id_mesa).then(resultado =>{
      this.lugarmesa = resultado
      if (this.lugarmesa.length == this.validaciones.INT_NUMBER_0) {
        this.lugarmesaService.updateLugarMesa({
          id_lugar_mesa : this.seletedLugarMesaActualizar.id_lugar_mesa,
          id_lugar : this.seletedLugarMesaActualizar.id_lugar,
          id_mesa : this.seletedLugarMesaActualizar.id_mesa
        }).subscribe((modificado) => {
          this.seletedLugarMesaActualizar.id_lugar_mesa = this.validaciones.NULL;
          /* Se da respuesta Exitosa del servidor */
          alert("Se actualizo la mesa y el lugar con exito");
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
        this.seletedLugarMesaActualizar.id_lugar_mesa = this.validaciones.NULL;
        /* Mensaje de respuesta de barrio ya existe */
        alert('Ya Existe Mesa: ' + this.seletedLugarMesaActualizar.id_mesa + ' en Lugar: '+ this.seletedLugarMesaActualizar.id_lugar);
        /* Recargo la pagina */
        this.ngOnInit();
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


  

