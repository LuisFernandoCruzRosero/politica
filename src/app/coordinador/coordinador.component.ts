import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ComunaService } from '../servicios/comuna.service';
import { LugarService } from '../servicios/lugar.service';
import { BarrioService } from '../servicios/barrio.service';
import { MesaService } from '../servicios/mesa.service';
import { UsuarioService } from '../servicios/usuario.service';
import { VotanteService } from '../servicios/votante.service';
import { DigitadorService } from '../servicios/digitador.service';
import { LiderService } from '../servicios/lider.service';
import { LugarMesaService } from '../servicios/lugar-mesa.service';


/* Clases */
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { Token } from '../modelos/token';
import { Validaciones } from '../modelos/validaciones';
import { Comuna } from '../modelos/comuna';
import { Lugar } from '../modelos/lugar';
import { Barrio } from '../modelos/barrio';
import { Mesa } from '../modelos/mesa';
import { Lider } from '../modelos/lider';
import { Votante } from '../modelos/votante';
import { CoordinadorAux } from '../modelos/coordinador-aux';
import { LugarMesa } from '../modelos/lugar-mesa';






@Component({
  selector: 'app-coordinador',
  templateUrl: './coordinador.component.html',
  styleUrls: ['./coordinador.component.css']
})
export class CoordinadorComponent implements OnInit {

  /* Llamo ala clase validaciones */
  validaciones = new Validaciones();

  /* Total de Agendas Ingresadas */
  totalCoordinador:any = 0;

  /* Inicializo un arreglo del objeto coordinador */
  coordinadorAux:CoordinadorAux[] = [];
  
  /* Inicializo un arreglo del objeto Barrio */
  barrio:Barrio[] = [];
  barrioAux:Barrio[] = [];
  /* Inicializo un arreglo del objeto Comuna */
  comuna:Comuna[] = [];
  comunaLAux:Comuna[] = [];
  comunaBAux:Comuna[] = [];

  /* Inicializo un arreglo del objeto Lugar */
  lugar:Lugar[] = [];
  lugarAux:Lugar[] = [];

  /* Mesa Lugar */
  lugarMesa:LugarMesa[] = [];
  lugarMesaAux:LugarMesa[] = [];

  /* Inicializo un arreglo del objeto Mesa */
  mesa:Mesa[] = [];
  mesaAux:Mesa[] = [];
  /* Inicializo un arreglo del objeto Lider */
  lider:Lider[] = [];
  liderAux:Lider[] = [];
  
  /* Inicializo un arreglo del objeto Agenda */
  votantes:Votante[] = [];

  /* Inicializo un arreglo del objeto Agenda Para la busqueda*/
  lideresBuscar:Lider[] = [];

  /* Inicializamos un arreglo del objeto Usuaio */
  usuario:UsuarioFindAll[] = [];
  usuarios:UsuarioFindAll[] = [];
  /* Inicializamos un arreglo del objeto Usuaio para Coordinador */
  coordinadores:UsuarioFindAll[] = [];

  /* Inicializamos un arreglo del objeto Digitador */
  digitador:DigitadorFindAll[] = [];

  votante:Votante[] = [];

  /* Inicializo el objeto Agenda Para formulario Agregar*/
  seletedCoordinadorAgregar:UsuarioFindAll = new UsuarioFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
   this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, 
   this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT,
   this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,
   this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,
   this.validaciones.STR_LETTER_WITHOUT,
   );

    /* Inicializo el objeto Agenda Para formulario listar*/
    seletedCoordinadorListar:UsuarioFindAll = new UsuarioFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
      this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, 
      this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT,
      this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,
      this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,
      this.validaciones.STR_LETTER_WITHOUT,
      );
   
 
  /* Inicializo el objeto Agenda Para formulario Actualizar*/
  seletedCoordinadorActualizar:UsuarioFindAll = new UsuarioFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,
    this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT,
    );
 

  /* Inicializo el objeto Mesa Para formulario Buscar*/
  seletedCoordinadorBuscar:UsuarioFindAll = new UsuarioFindAll(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,
    this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,
    this.validaciones.STR_LETTER_WITHOUT,
    );

    /* Inicializo el objeto Lugar Para formulario Buscar*/
  seletedLugarBuscar:Lugar = new Lugar(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.NULL);

  /* Inicializo el objeto barrio Para formulario Buscar*/
  seletedBarrioBuscar:Barrio = new Barrio(this.validaciones.NULL, this.validaciones.STR_LETTER_WITHOUT, 
    this.validaciones.STR_LETTER_WITHOUT, this.validaciones.STR_LETTER_WITHOUT, this.validaciones.NULL, this.validaciones.NULL);

  /* Inicializo el objeto Lider Para formulario Buscar*/
  seletedLiderBuscar:Lider = new Lider(this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL, this.validaciones.NULL, this.validaciones.NULL, 
    this.validaciones.STR_LETTER_WITHOUT,this.validaciones.NULL,this.validaciones.NULL,this.validaciones.NULL,
    this.validaciones.NULL,this.validaciones.NULL,this.validaciones.STR_LETTER_WITHOUT,this.validaciones.STR_LETTER_WITHOUT);
  
  /* Verificar la Ayutenticidad */
  encontrado:Boolean = this.validaciones.FALSE;

  /* Para bloquear desdel ts la viste del HTML dependiendo el tipo de usuario */
  vista:Number;

  /* Token de verificacion de logueo */
  token:Token;

  /* Se llama a login service para verificar la autenticidad de usuario */
  /* Se llama a router para poder navegar del ts a un html deacuerdo ala autenticidad */
  /* Se llama a Mesa service para poder realizar la funciones del CRUD del modulo de las mesas */

  constructor(private loginServi:LoginService, private route:Router, private comunaService:ComunaService, 
    private lugarService:LugarService, private lugarmesaService:LugarMesaService, private barrioService:BarrioService,
    private mesaService:MesaService,private votanteService:VotanteService, private digitadorService:DigitadorService,
    private liderService:LiderService,) { this.coordinadorAux = [] }

  /* Funcion que se llama por defecto es la primera en ejecutarse */
 


  ngOnInit() {
    /* se quema el departamento y el municipio */
    this.seletedCoordinadorAgregar.departamento = 'NARIÑO';
    this.seletedCoordinadorAgregar.municipio = 'TUMACO';
    /* Se limpia arreglo auxiliar para volver a llenar */
    this.coordinadorAux = [];
    /* Consulto los Datos de la tabla usuario */
    this.loginServi.findAllUsuario().then(resultado => {
      /* Asigno los datos de la tabla usuario al arreglo usuario */
      this.usuario = resultado;
      this.usuarios = this.usuario;
      /* Consulto los Datos de la tabla digitador */
      this.loginServi.findAllDigitador().then(resultado => {
        /* Asigno los datos de la tabla digitador al arreglo digitador */
        this.digitador = resultado;
        /* Consulto Los datos de la tabla votante */
        this.loginServi.findAllUsuarioCoordinador().then(resultado => {
          /* Asigno al arreglo votantes todas las existenten en la tabla */
          this.coordinadores = resultado;
        /* Consulto Los datos de la tabla Comuna */
        this.comunaService.findAllComuna().then(resultado => {
          /* Asigno al arreglo Agendas todas las existenten en la tabla */
          this.comuna = resultado;
          this.comunaBAux = this.comuna;
          this.comunaLAux = this.comuna;
          /* Consulto Los datos de la tabla barrio */
        this.barrioService.findAllBarrio().then(resultado => {
          /* Asigno al arreglo barrio todas las existenten en la tabla */
          this.barrio = resultado;
          this.barrioAux = this.barrio;
          /* Consulto Los datos de la tabla lugar */
        this.lugarService.findAllLugar().then(resultado => {
          /* Asigno al arreglo lugar todas las existenten en la tabla */
          this.lugar = resultado;
          this.lugarAux = this.lugar;
          /* Consulto Los datos de la tabla mesa */
        this.mesaService.findAllMesa().then(resultado => {
          /* Asigno al arreglo Agendas todas las existenten en la tabla */
        this.mesa = resultado;
        this.mesaAux = this.mesa;
          
      console.log("mesa:1" + this.mesa)
          /* consulta la cantidad de Agendas que existen en el sistema */
          this.loginServi.findByIdTotalUsuarioCoordinador().subscribe(resultado=>{
            this.totalCoordinador = resultado;
          });

          for (let i = this.validaciones.INT_NUMBER_0; i < this.coordinadores.length; i++){
            for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
                for (let n = this.validaciones.INT_NUMBER_0; n < this.usuario.length; n++) {
                  for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                    for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          
                        if (this.coordinadores[i].id_barrio == this.barrio[j].id_barrio) {
                            if (this.coordinadores[i].id_usuario == this.usuario[n].id_usuario) {
                              if (this.coordinadores[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.coordinadores[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.coordinadores[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.coordinadores[i].id_mesa == this.mesa[p].id_mesa) {
                                      console.log('entro');
                                      this.addCoordinadorAux({
                                        id_usuario:this.coordinadores[i].id_usuario,
                                        ced_usuario: this.coordinadores[i].ced_usuario,
                                        nom_usuario: this.coordinadores[i].nom_usuario,
                                        nom_lugar: this.lugar[o].nom_lugar,
                                        nom_mesa: this.mesa[p].nom_mesa,
                                        nom_barrio: this.barrio[j].nom_barrio,
                                        login:this.coordinadores[i].login,
                                        contrasena:this.coordinadores[i].contrasena,
                                        id_tipo_usuario:this.coordinadores[i].id_tipo_usuario,
                                        tel_usuario : this.coordinadores[i].tel_usuario,
                                        activo : this.validaciones.TRUE,
                                        nom_comunaB: this.comuna[m].nom_comuna,
                                        nom_comunaL: this.comuna[l].nom_comuna,
                                        municipio: this.coordinadores[i].municipio,
                                        departamento: this.coordinadores[i].departamento
                                      })
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
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

  /*  Funcion Guardar Votante */
  guardar() {
    /* Validacion de Campos Obligatorios y invalidos */
    if (this.validaciones.validaCampoObligatorio(this.seletedCoordinadorAgregar.nom_usuario) == this.validaciones.TRUE) {
      alert('CAMPO NOMBRE VOTANTE OBLIGATORIO..');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedCoordinadorAgregar.ced_usuario) == this.validaciones.TRUE) {
      alert('CAMPO CEDULA VOTANTE OBLIGATORIO.. ');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedCoordinadorAgregar.municipio) == this.validaciones.TRUE) {
      alert('CAMPO MUNICIPIO VOTANTE OBLIGATORIO.. ');
    } else if (this.validaciones.validaCampoObligatorio(this.seletedCoordinadorAgregar.departamento) == this.validaciones.TRUE) {
      alert('CAMPO DEPARTAMENTO VOTANTE OBLIGATORIO.. ');
    } else if (this.validaciones.validacionNombre(this.seletedCoordinadorAgregar.nom_usuario) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO NOMBRE INVALIDO: ' + this.seletedCoordinadorAgregar.nom_usuario);
    } else if (this.validaciones.validacionNombre(this.seletedCoordinadorAgregar.municipio) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO MUNICIPIO INVALIDO: ' + this.seletedCoordinadorAgregar.municipio);
    } else if (this.validaciones.validacionNombre(this.seletedCoordinadorAgregar.departamento) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO DEPARTAMENTO INVALIDO: ' + this.seletedCoordinadorAgregar.departamento);
    } else if (this.validaciones.validacionNumerico(this.seletedCoordinadorAgregar.ced_usuario) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO CEDULA INVALIDO: ' + this.seletedCoordinadorAgregar.ced_usuario);
    } else if (this.validaciones.validacionNumerico(this.seletedCoordinadorAgregar.tel_usuario) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('CAMPO TELEFONO INVALIDO: ' + this.seletedCoordinadorAgregar.tel_usuario);
    } else {
     /* LLamo al servicio votante para buscar los votantes existentes */
     this.votanteService.findByIdVotanteCedula(this.seletedCoordinadorAgregar.ced_usuario).then(resultado =>{
      /* Se llena el arreglo votantes con la data seleccionada en la busqueda */
      this.votantes = resultado;
      /* LLamo al servicio digitador para buscar los votantes existentes */
      this.digitadorService.findByIdDigitadorCedula(this.seletedCoordinadorAgregar.ced_usuario).then(resultado =>{
        /* Se llena el arreglo digitador con la data seleccionada en la busqueda */
        this.digitador = resultado;
        /* LLamo al servicio lider para buscar los votantes existentes */
      this.liderService.findByIdLiderCedula(this.seletedCoordinadorAgregar.ced_usuario).then(resultado =>{
        /* Se llena el arreglo lider con la data seleccionada en la busqueda */
        this.lider = resultado;
        /* LLamo al servicio Usuario para buscar los votantes existentes */
      this.loginServi.findAllUsuarioCedula(this.seletedCoordinadorAgregar.ced_usuario).then(resultado =>{
        /* Se llena el arreglo Usuario con la data seleccionada en la busqueda */
        this.usuario = resultado;
         /* Se pregunta si barrios contiene datos */
        if (this.usuario.length == this.validaciones.INT_NUMBER_0 && this.votantes.length == this.validaciones.INT_NUMBER_0 &&
           this.digitador.length == this.validaciones.INT_NUMBER_0 && this.lider.length == this.validaciones.INT_NUMBER_0 ) {
          /* llama el servicio de agregar un barrio en la tabla barrio */
          this.loginServi.insertCoordinador({
            /* Se envia la data diligenciada en el formulario */
            id_usuario:this.seletedCoordinadorAgregar.id_usuario,
            ced_usuario: this.seletedCoordinadorAgregar.ced_usuario,
            nom_usuario: this.seletedCoordinadorAgregar.nom_usuario,
            id_lugar: this.seletedCoordinadorAgregar.id_lugar,
            id_mesa: this.seletedCoordinadorAgregar.id_mesa,
            id_barrio: this.seletedCoordinadorAgregar.id_barrio,
            login: this.seletedCoordinadorAgregar.login,
            contrasena: this.seletedCoordinadorAgregar.contrasena,
            id_tipo_usuario:3,
            tel_usuario : this.seletedCoordinadorAgregar.tel_usuario,
            activo : this.validaciones.TRUE,
            id_comunaL: this.seletedCoordinadorAgregar.id_comunaL,
            id_comunaB: this.seletedCoordinadorAgregar.id_comunaB,
            municipio: this.seletedCoordinadorAgregar.municipio,
            departamento: this.seletedCoordinadorAgregar.departamento
          }).subscribe((resultado) => {
            /* Se da respuesta Exitosa del servidor */
            alert("Se Agrego EL LIDER");
            /* se llama la funcion inicial para que recargue la pagina */
            this.ngOnInit();
            /* se limpia el input de agregar */
            this.seletedCoordinadorAgregar.nom_usuario = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedCoordinadorAgregar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedCoordinadorAgregar.tel_usuario = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedCoordinadorAgregar.municipio = this.validaciones.STR_LETTER_WITHOUT;
            this.seletedCoordinadorAgregar.departamento = this.validaciones.STR_LETTER_WITHOUT;
          });
        } else if (this.votantes.length != this.validaciones.INT_NUMBER_0) { 
          alert("la cedula ya exite en votante: " + this.seletedCoordinadorAgregar.ced_usuario);
        } else if (this.digitador.length != this.validaciones.INT_NUMBER_0) {
          alert("la cedula ya exite en digitador: " + this.seletedCoordinadorAgregar.ced_usuario);
        } else if (this.usuario.length != this.validaciones.INT_NUMBER_0) {
          alert("la cedula ya exite en usuario: " + this.seletedCoordinadorAgregar.ced_usuario);
        } else if (this.lider.length != this.validaciones.INT_NUMBER_0) {
          alert("la cedula ya exite en lider: " + this.seletedCoordinadorAgregar.ced_usuario);
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
  }
 
  addCoordinadorAux(item:CoordinadorAux) {
    this.coordinadorAux.push(item);
   }

   SelectComunaBAgregar(id_comunaB:Number){
    this.barrioAux = [];
    let j = 0;
    for(let i = 0; i < this.barrio.length; i++){
      if(id_comunaB == this.barrio[i].id_comunaB){
        this.barrioAux[j] = this.barrio[i];
        j++;
      }
    }
  }

  SelectBarrioAgregar(id_barrio:Number){
    for(let i = 0; i < this.barrio.length; i++){
      if(id_barrio == this.barrio[i].id_barrio){
        this.seletedCoordinadorAgregar.id_comunaB = this.barrio[i].id_comunaB;
      }
    }
  }

  SelectComunaLAgregar(id_comunaL:Number){
    this.lugarAux = [];
    let j = 0;
    for(let i = 0; i < this.lugar.length; i++){
      if(id_comunaL == this.lugar[i].id_comunaL){
        this.lugarAux[j] = this.lugar[i];
        j++;
      }
    }
  }

  SelectLugarAgregar(id_lugar:Number){
    let l = 0;
    this.lugarMesa = [];
    this.mesaAux = [];
    this.lugarMesaAux = [];
    this.lugarmesaService.findAllLugarMesa().then(resultado =>{
      this.lugarMesa = resultado;
      console.log("mesaa:" + this.lugarMesa)
      for(let i = 0; i < this.lugar.length; i++){
        if(id_lugar == this.lugar[i].id_lugar){
          console.log("entro:123"  )
          this.seletedCoordinadorAgregar.id_comunaL = this.lugar[i].id_comunaL;
        }
      }
      for (let j = 0; j < this.lugarMesa.length;j++) {
        console.log("entro:123456"  )
        if (this.lugarMesa[j].id_lugar == this.seletedCoordinadorAgregar.id_lugar) {
            this.lugarMesaAux[l] = this.lugarMesa[j];
           l++;
        }
      }
      let h = 0;
      for (let k = 0; k < this.lugarMesaAux.length ;k++) {
       for (let m = 0; m < this.mesa.length; m++) {
          if (this.mesa[m].id_mesa == this.lugarMesaAux[k].id_mesa) {
            this.mesaAux[h] = this.mesa[m];
            h++;
          }
       }
      }
    });
  }

  SelectLiderAgregar(id_lider:Number) {
    for(let i = 0; i < this.lider.length; i++){
      if(id_lider == this.lider[i].id_lider){
        this.seletedCoordinadorAgregar.id_usuario = this.lider[i].id_usuario;
      }
    }
  }

  SelectCoordinadorAgregar(id_coordinador:Number) {
    this.liderAux = [];
    let j = 0;
    for(let i = 0; i < this.lider.length; i++){
      if(id_coordinador == this.lider[i].id_usuario){
        this.liderAux[j] = this.lider[i];
        j++;
      }
    }
  }

  selectLugarBuscar(id_lugar:Number) {
    this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
    this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
    this.seletedCoordinadorBuscar.ced_usuario= this.validaciones.STR_LETTER_WITHOUT;
    this.seletedLugarBuscar.id_lugar = id_lugar;
    
  }

  selectBarriorBuscar(id_barrio:Number) {
    this.seletedBarrioBuscar.id_barrio = id_barrio;
    this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
    this.seletedCoordinadorBuscar.ced_usuario= this.validaciones.STR_LETTER_WITHOUT;
    this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;;
    
  }

  
  selectCoordinadorBuscar(id_coordinador:Number) {
    this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
    this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;;
    this.seletedCoordinadorBuscar.ced_usuario= this.validaciones.STR_LETTER_WITHOUT;
    this.seletedCoordinadorBuscar.id_usuario = id_coordinador;
  }

  selectCoordinadorBuscarCedula(ced_usuario:String) {
    this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
    this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
    this.seletedCoordinadorBuscar.ced_usuario = ced_usuario;
    this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
  }

  buscar() {
    this.coordinadorAux = [];


    if(this.seletedCoordinadorBuscar.id_usuario != this.validaciones.NULL){
      this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
      this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
      this.seletedCoordinadorBuscar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
      this.loginServi.findByIdUsuarioCoordinador(this.seletedCoordinadorBuscar.id_usuario).then(resultado=>{
        this.coordinadores = resultado;
        if ( this.coordinadores != this.validaciones.NULL) {
          for (let i = this.validaciones.INT_NUMBER_0; i < this.coordinadores.length; i++){
            for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
                for (let n = this.validaciones.INT_NUMBER_0; n < this.usuario.length; n++) {
                  for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                    for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          
                        if (this.coordinadores[i].id_barrio == this.barrio[j].id_barrio) {
                            if (this.coordinadores[i].id_usuario == this.usuario[n].id_usuario) {
                              if (this.coordinadores[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.coordinadores[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.coordinadores[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.coordinadores[i].id_mesa == this.mesa[p].id_mesa) {
                                      console.log('entro');
                                      this.addCoordinadorAux({
                                        id_usuario:this.coordinadores[i].id_usuario,
                                        ced_usuario: this.coordinadores[i].ced_usuario,
                                        nom_usuario: this.coordinadores[i].nom_usuario,
                                        nom_lugar: this.lugar[o].nom_lugar,
                                        nom_mesa: this.mesa[p].nom_mesa,
                                        nom_barrio: this.barrio[j].nom_barrio,
                                        login:this.coordinadores[i].login,
                                        contrasena:this.coordinadores[i].contrasena,
                                        id_tipo_usuario:this.coordinadores[i].id_tipo_usuario,
                                        tel_usuario : this.coordinadores[i].tel_usuario,
                                        activo : this.validaciones.TRUE,
                                        nom_comunaB: this.comuna[m].nom_comuna,
                                        nom_comunaL: this.comuna[l].nom_comuna,
                                        municipio: this.coordinadores[i].municipio,
                                        departamento: this.coordinadores[i].departamento
                                      })
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
        } else if(this.coordinadorAux.length == this.validaciones.INT_NUMBER_0){
          alert('Nombre: ' + this.seletedCoordinadorBuscar.nom_usuario + ' No Existe..');
        }

      },(err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    }




    if(this.seletedCoordinadorBuscar.ced_usuario != this.validaciones.STR_LETTER_WITHOUT){
      this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
      this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
      this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
      this.loginServi.findAllUsuarioCoordinadorCedula(this.seletedCoordinadorBuscar.ced_usuario).then(resultado=>{
        this.coordinadores = resultado;
        if ( this.coordinadores != this.validaciones.NULL) {
          for (let i = this.validaciones.INT_NUMBER_0; i < this.coordinadores.length; i++){
            for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
                for (let n = this.validaciones.INT_NUMBER_0; n < this.usuario.length; n++) {
                  for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                    for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          
                        if (this.coordinadores[i].id_barrio == this.barrio[j].id_barrio) {
                            if (this.coordinadores[i].id_usuario == this.usuario[n].id_usuario) {
                              if (this.coordinadores[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.coordinadores[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.coordinadores[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.coordinadores[i].id_mesa == this.mesa[p].id_mesa) {
                                      console.log('entro');
                                      this.addCoordinadorAux({
                                        id_usuario:this.coordinadores[i].id_usuario,
                                        ced_usuario: this.coordinadores[i].ced_usuario,
                                        nom_usuario: this.coordinadores[i].nom_usuario,
                                        nom_lugar: this.lugar[o].nom_lugar,
                                        nom_mesa: this.mesa[p].nom_mesa,
                                        nom_barrio: this.barrio[j].nom_barrio,
                                        login:this.coordinadores[i].login,
                                        contrasena:this.coordinadores[i].contrasena,
                                        id_tipo_usuario:this.coordinadores[i].id_tipo_usuario,
                                        tel_usuario : this.coordinadores[i].tel_usuario,
                                        activo : this.validaciones.TRUE,
                                        nom_comunaB: this.comuna[m].nom_comuna,
                                        nom_comunaL: this.comuna[l].nom_comuna,
                                        municipio: this.coordinadores[i].municipio,
                                        departamento: this.coordinadores[i].departamento
                                      })
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
        } else if(this.coordinadorAux.length == this.validaciones.INT_NUMBER_0){
          alert('Cedula: ' + this.seletedCoordinadorBuscar.ced_usuario + ' No Existe..');
        }

      },(err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    }

    if(this.seletedLugarBuscar.id_lugar != this.validaciones.NULL) {
      this.seletedCoordinadorBuscar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
      this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
      this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
      this.loginServi.findAllUsuarioCoordinadorLugar(this.seletedLugarBuscar.id_lugar).then(resultado=>{
        this.coordinadores = resultado;
        if ( this.coordinadores != this.validaciones.NULL) {
          for (let i = this.validaciones.INT_NUMBER_0; i < this.coordinadores.length; i++){
            for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
                for (let n = this.validaciones.INT_NUMBER_0; n < this.usuario.length; n++) {
                  for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                    for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          
                        if (this.coordinadores[i].id_barrio == this.barrio[j].id_barrio) {
                            if (this.coordinadores[i].id_usuario == this.usuario[n].id_usuario) {
                              if (this.coordinadores[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.coordinadores[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.coordinadores[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.coordinadores[i].id_mesa == this.mesa[p].id_mesa) {
                                      console.log('entro');
                                      this.addCoordinadorAux({
                                        id_usuario:this.coordinadores[i].id_usuario,
                                        ced_usuario: this.coordinadores[i].ced_usuario,
                                        nom_usuario: this.coordinadores[i].nom_usuario,
                                        nom_lugar: this.lugar[o].nom_lugar,
                                        nom_mesa: this.mesa[p].nom_mesa,
                                        nom_barrio: this.barrio[j].nom_barrio,
                                        login:this.coordinadores[i].login,
                                        contrasena:this.coordinadores[i].contrasena,
                                        id_tipo_usuario:this.coordinadores[i].id_tipo_usuario,
                                        tel_usuario : this.coordinadores[i].tel_usuario,
                                        activo : this.validaciones.TRUE,
                                        nom_comunaB: this.comuna[m].nom_comuna,
                                        nom_comunaL: this.comuna[l].nom_comuna,
                                        municipio: this.coordinadores[i].municipio,
                                        departamento: this.coordinadores[i].departamento
                                      })
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
        } else if(this.coordinadorAux.length == this.validaciones.INT_NUMBER_0){
          alert('el lugar: ' + this.seletedCoordinadorBuscar.id_lugar + ' No tinen registrado ningun coordinador..');
        }
      },(err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          alert("a ocurrido un errror cliente");
        }else{
          alert("a ocurrido un errror servidor");
        }
      });
    }

    if(this.seletedBarrioBuscar.id_barrio != this.validaciones.NULL) {
      this.seletedCoordinadorBuscar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
      this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
      this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
      this.loginServi.findAllUsuarioCoordinadorBarrio(this.seletedBarrioBuscar.id_barrio).then(resultado=>{
        this.coordinadores = resultado;
        if ( this.coordinadores != this.validaciones.NULL) {
          for (let i = this.validaciones.INT_NUMBER_0; i < this.coordinadores.length; i++){
            for (let j = this.validaciones.INT_NUMBER_0; j < this.barrio.length; j++) {
                for (let n = this.validaciones.INT_NUMBER_0; n < this.usuario.length; n++) {
                  for (let l = this.validaciones.INT_NUMBER_0; l < this.comuna.length; l++) {
                    for (let m = this.validaciones.INT_NUMBER_0; m < this.comuna.length; m++)
                      for (let o = this.validaciones.INT_NUMBER_0; o < this.lugar.length; o++) {
                        for (let p = this.validaciones.INT_NUMBER_0; p < this.mesa.length; p++) {
                          
                        if (this.coordinadores[i].id_barrio == this.barrio[j].id_barrio) {
                            if (this.coordinadores[i].id_usuario == this.usuario[n].id_usuario) {
                              if (this.coordinadores[i].id_comunaB == this.comuna[l].id_comuna) {
                                if (this.coordinadores[i].id_comunaL == this.comuna[m].id_comuna) {
                                  if (this.coordinadores[i].id_lugar == this.lugar[o].id_lugar) {
                                    if (this.coordinadores[i].id_mesa == this.mesa[p].id_mesa) {
                                      console.log('entro');
                                      this.addCoordinadorAux({
                                        id_usuario:this.coordinadores[i].id_usuario,
                                        ced_usuario: this.coordinadores[i].ced_usuario,
                                        nom_usuario: this.coordinadores[i].nom_usuario,
                                        nom_lugar: this.lugar[o].nom_lugar,
                                        nom_mesa: this.mesa[p].nom_mesa,
                                        nom_barrio: this.barrio[j].nom_barrio,
                                        login:this.coordinadores[i].login,
                                        contrasena:this.coordinadores[i].contrasena,
                                        id_tipo_usuario:this.coordinadores[i].id_tipo_usuario,
                                        tel_usuario : this.coordinadores[i].tel_usuario,
                                        activo : this.validaciones.TRUE,
                                        nom_comunaB: this.comuna[m].nom_comuna,
                                        nom_comunaL: this.comuna[l].nom_comuna,
                                        municipio: this.coordinadores[i].municipio,
                                        departamento: this.coordinadores[i].departamento
                                      })
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
        } else if(this.coordinadorAux.length == this.validaciones.INT_NUMBER_0){
          alert('el barrio: ' + this.seletedCoordinadorBuscar.id_barrio + ' No tinen registrado ningun coordinador..');
        }
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
    this.seletedBarrioBuscar.id_barrio = this.validaciones.NULL;
    this.seletedCoordinadorBuscar.id_usuario = this.validaciones.NULL;
    this.seletedLugarBuscar.id_lugar = this.validaciones.NULL;
    /* selimpian los imput de Agregar  */
    this.seletedCoordinadorAgregar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedCoordinadorAgregar.nom_usuario = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedCoordinadorAgregar.municipio = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedCoordinadorAgregar.departamento = this.validaciones.STR_LETTER_WITHOUT;
    this.seletedCoordinadorAgregar.tel_usuario = this.validaciones.STR_LETTER_WITHOUT;
  }

   /* Funcion que elimina lo seleccionado en base de datos */
  eliminar(coordinador:UsuarioFindAll) {
    /* dialogo de confirmacion de eliminar los datos */
    if(confirm('estas seguro de querer eliminarlo ced_usuario: ' + coordinador.ced_usuario + ' nombre coordinador: ' + coordinador.nom_usuario)){
      /* se llama el servicio mesa la funcion eliminar */
      this.loginServi.deleteByIdCoordinador(coordinador.id_usuario).subscribe((modificado) =>{
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

  actualizar(item:UsuarioFindAll){
    console.log("item:UsuarioFindAll" + item.id_usuario);
    /* llena el objeto de comuna para actualizar */
    for(let i = 0; i < this.coordinadores.length; i++) {
        if (this.coordinadores[i].id_usuario == item.id_usuario) {
          console.log("123entrohhhh");
        this.seletedCoordinadorActualizar = this.coordinadores[i];
      }
    }
  }
  
  SelectComunaLActualizar(id_comunaL:number) {
        this.lugarAux = [];
        let j = 0;
        for(let i = 0; i < this.lugar.length; i++){
          if(id_comunaL == this.lugar[i].id_comunaL){
            this.lugarAux[j] = this.lugar[i];
            j++;
          }
        }
    console.log("comunaLugar: " + id_comunaL);
  }
  
  SelectComunaBActualizar(id_comunaB:Number) {
    this.barrioAux = [];
    let j = 0;
    for(let i = 0; i < this.barrio.length; i++){
      if(id_comunaB == this.barrio[i].id_comunaB){
        this.barrioAux[j] = this.barrio[i];
        j++;
      }
    }
    console.log("comunaBarrio: " + id_comunaB);
  }
  
  SelectLugarActualizar(id_lugar:Number){
    let l = 0;
    this.lugarMesa = [];
    this.mesaAux = [];
    this.lugarMesaAux = [];
    this.lugarmesaService.findAllLugarMesa().then(resultado =>{
      this.lugarMesa = resultado;
      console.log("mesaa:" + this.lugarMesa) 
      for(let i = 0; i < this.lugar.length; i++){
        if(id_lugar == this.lugar[i].id_lugar){
          this.seletedCoordinadorActualizar.id_comunaL = this.lugar[i].id_comunaL;
        }
      }
      for (let j = 0; j < this.lugarMesa.length;j++) {
        if (this.lugarMesa[j].id_lugar == this.seletedCoordinadorActualizar.id_lugar) {
          console.log("entro:123456"  ) 
          this.lugarMesaAux[l] = this.lugarMesa[j];
           l++;
        }
      }
      let h = 0;
      for (let k = 0; k < this.lugarMesaAux.length ;k++) {
       for (let m = 0; m < this.mesa.length; m++) {
          if (this.mesa[m].id_mesa == this.lugarMesaAux[k].id_mesa) {
            this.mesaAux[h] = this.mesa[m];
            h++;
          }
       }
      }
    });
    console.log("Lugar: " + id_lugar);
  }
  
  SelectCoordinadorActualizar(id_coordinador:Number){
    this.liderAux = [];
    let j = 0;
    for(let i = 0; i < this.lider.length; i++){
      if(id_coordinador == this.lider[i].id_usuario){
        this.liderAux[j] = this.lider[i];
        j++;
      }
    }
    console.log("Coordinador: " + id_coordinador);
  }
  
  SelectLiderActualizar(id_lider:Number){
    for(let i = 0; i < this.lider.length; i++){
      if(id_lider == this.lider[i].id_lider){
        this.seletedCoordinadorActualizar.id_usuario = this.lider[i].id_usuario;
      }
    }
    console.log("Lider: " + id_lider);
  }
  
  SelectBarrioActualizar(id_barrio:Number){
    for(let i = 0; i < this.barrio.length; i++){
      if(id_barrio == this.barrio[i].id_barrio){
        this.seletedCoordinadorActualizar.id_comunaB = this.barrio[i].id_comunaB;
      }
    }
    console.log("Barrio: " + id_barrio);
  }

  actualizacion() {
    /* Validacion de campos Obligatorios */
    if (this.validaciones.validaCampoObligatorio(
      this.seletedCoordinadorActualizar.ced_usuario) == this.validaciones.TRUE) {
      alert('CEDULA Obligatoria..');
    } else if (this.validaciones.validaCampoObligatorio(
      this.seletedCoordinadorActualizar.nom_usuario) == this.validaciones.TRUE) {
      alert('NOMBRE obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedCoordinadorActualizar.id_comunaL) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('COMUNA DE VOTACION obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedCoordinadorActualizar.id_lugar) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('LUGAR DE VOTACION obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedCoordinadorActualizar.id_comunaB) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('COMUNA BARRIO obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedCoordinadorActualizar.id_barrio) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('BARRIO obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedCoordinadorActualizar.id_usuario) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('COORDINADOR obligatotio..');
    } else if (this.validaciones.validaNull(
      this.seletedCoordinadorActualizar.id_mesa) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('MESA obligatotio..');
    } else if (this.validaciones.validaCampoObligatorio(
      this.seletedCoordinadorActualizar.tel_usuario) == this.validaciones.TRUE) {
      alert('TELEFONO obligatotio..');
    }

    /* Validaciones de Rangos */
    else if (this.validaciones.validacionNumeros(
      this.seletedCoordinadorActualizar.ced_usuario) == this.validaciones.TRUE) {
      alert('Cedula: ' + this.seletedCoordinadorActualizar.ced_usuario + ' Invalida..');
      this.seletedCoordinadorActualizar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
    } else if (this.validaciones.validacionNombre(
      this.seletedCoordinadorActualizar.nom_usuario) == this.validaciones.STR_LETTER_WITHOUT) {
      alert('NOMBRE: ' + this.seletedCoordinadorActualizar.nom_usuario + ' Invalido..');
      this.seletedCoordinadorActualizar.nom_usuario = this.validaciones.STR_LETTER_WITHOUT;
    } else if (this.validaciones.validacionNumeros(
      this.seletedCoordinadorActualizar.tel_usuario) == this.validaciones.TRUE) {
      alert('TELEFONO: ' + this.seletedCoordinadorActualizar.tel_usuario + ' Invalido..')
    } else {
      this.digitadorService.findByIdDigitadorCedula(this.seletedCoordinadorActualizar.ced_usuario).then(resultado =>{
        this.digitador = resultado;
        /* LLamo al servicio votante para buscar los digitadores existentes */
        this.votanteService.findByIdVotanteCedula(this.seletedCoordinadorActualizar.ced_usuario).then(resultado =>{
          this.votante = resultado
          /* LLamo al servicio usuario para buscar los digitadores existentes */
          this.loginServi.findAllUsuarioCedula(this.seletedCoordinadorActualizar.ced_usuario).then(resultado =>{
            this.usuario = resultado;
            /* LLamo al servicio lider para buscar los digitadores existentes */
            this.liderService.findByIdLiderCedula(this.seletedCoordinadorActualizar.ced_usuario).then(resultado =>{
              this.lider = resultado;
              if (this.votante.length == this.validaciones.INT_NUMBER_0 && 
                this.digitador.length == this.validaciones.INT_NUMBER_0 && 
                this.lider.length == this.validaciones.INT_NUMBER_0) {
                  console.log("this.digitador.length: "+this.digitador.length)
                  if (this.usuario.length == this.validaciones.INT_NUMBER_0) {
                    this.loginServi.updateUsuario({
                      id_usuario: this.seletedCoordinadorActualizar.id_usuario,
                      ced_usuario: this.seletedCoordinadorActualizar.ced_usuario,
                      nom_usuario: this.seletedCoordinadorActualizar.nom_usuario,
                      id_comunaL: this.seletedCoordinadorActualizar.id_comunaL,
                      id_lugar: this.seletedCoordinadorActualizar.id_lugar,
                      id_barrio: this.seletedCoordinadorActualizar.id_barrio,
                      municipio: this.seletedCoordinadorActualizar.municipio,
                      departamento: this.seletedCoordinadorActualizar.departamento,
                      id_comunaB: this.seletedCoordinadorActualizar.id_comunaB,
                      id_mesa: this.seletedCoordinadorActualizar.id_mesa,
                      id_tipo_usuario:3,
                      activo: this.seletedCoordinadorActualizar.activo,
                      tel_usuario: this.seletedCoordinadorActualizar.tel_usuario,
                      login: this.seletedCoordinadorActualizar.login,
                      contrasena: this.seletedCoordinadorActualizar.contrasena,
                    }).subscribe((modificado) => {
                      /* se limpia el input de actualizar */
                      this.seletedCoordinadorActualizar.id_usuario = this.validaciones.NULL;
                      /* Se da respuesta Exitosa del servidor */
                      alert("Se actualizo el coordinador con exito");
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
                    console.log("entro");
                    let id_number = this.validaciones.INT_NUMBER_0; 
                    let encuentra:Boolean = this.validaciones.FALSE;
                    for (let i = 0; i < this.usuario.length; i++ ) {
                      if (this.seletedCoordinadorActualizar.id_usuario == this.usuario[i].id_usuario &&
                          this.seletedCoordinadorActualizar.ced_usuario == this.usuario[i].ced_usuario) {
                            encuentra = this.validaciones.TRUE;
                            id_number = i;
                      }
                    }
                    if (encuentra == this.validaciones.TRUE) {
                      this.loginServi.updateUsuario({
                        id_usuario: this.seletedCoordinadorActualizar.id_usuario,
                        ced_usuario: this.seletedCoordinadorActualizar.ced_usuario,
                        nom_usuario: this.seletedCoordinadorActualizar.nom_usuario,
                        id_comunaL: this.seletedCoordinadorActualizar.id_comunaL,
                        id_lugar: this.seletedCoordinadorActualizar.id_lugar,
                        id_barrio: this.seletedCoordinadorActualizar.id_barrio,
                        municipio: this.seletedCoordinadorActualizar.municipio,
                        departamento: this.seletedCoordinadorActualizar.departamento,
                        id_comunaB: this.seletedCoordinadorActualizar.id_comunaB,
                        id_mesa: this.seletedCoordinadorActualizar.id_mesa,
                        id_tipo_usuario: 3,
                        activo: this.seletedCoordinadorActualizar.activo,
                        tel_usuario: this.seletedCoordinadorActualizar.tel_usuario,
                        login: this.seletedCoordinadorActualizar.login,
                        contrasena: this.seletedCoordinadorActualizar.contrasena,
                      }).subscribe((modificado) => {
                        /* se limpia el input de actualizar */
                        this.seletedCoordinadorActualizar.id_usuario = this.validaciones.NULL;
                        /* Se da respuesta Exitosa del servidor */
                        alert("Se actualizo el coordinador con exito");
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
                      alert('la Cedula: ' + this.seletedCoordinadorActualizar.ced_usuario +'\n' +
                            'esta registrada con el nombre: ' + this.usuario[id_number].nom_usuario 
                            + '\n\n'
                      );
                      /* se limpia el input de actualizar */
                      this.seletedCoordinadorActualizar.id_usuario = this.validaciones.NULL;
                      /* Recargo la pagina */
                      this.ngOnInit();
                    }
                  }
              } else if (this.digitador.length != this.validaciones.INT_NUMBER_0) {
                console.log("this.digitador.length: "+this.digitador.length);
                console.log("this.votante.length: "+this.votante.length);
                console.log("this.usuario.length: "+this.usuario.length);
                console.log("this.lider.length: "+this.lider.length);
                alert("la cedula ya Existe en digitador: " + this.seletedCoordinadorActualizar.ced_usuario);
                this.seletedCoordinadorActualizar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
              } else if (this.votante.length != this.validaciones.INT_NUMBER_0) {
                alert("la cedula ya Existe en votante: " + this.seletedCoordinadorActualizar.ced_usuario);
                this.seletedCoordinadorActualizar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
              } else if (this.usuario.length != this.validaciones.INT_NUMBER_0) {
                alert("la cedula ya Existe en usuario: " + this.seletedCoordinadorActualizar.ced_usuario);
                this.seletedCoordinadorActualizar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
              } else if (this.lider.length != this.validaciones.INT_NUMBER_0) {
                alert("la cedula ya Existe en lider: " + this.seletedCoordinadorActualizar.ced_usuario);
                this.seletedCoordinadorActualizar.ced_usuario = this.validaciones.STR_LETTER_WITHOUT;
              }

            },(err:HttpErrorResponse) => {
              if(err.error instanceof Error){
                alert("a ocurrido un errror cliente");
              }else{
                alert("a ocurrido un errror servidor");
              }
            });
          },(err:HttpErrorResponse) => {
            if(err.error instanceof Error){
              alert("a ocurrido un errror cliente");
            }else{
            alert("a ocurrido un errror servidor");
            }
          }); 
        },(err:HttpErrorResponse) => {
          if(err.error instanceof Error){
            alert("a ocurrido un errror cliente");
          }else{
           alert("a ocurrido un errror servidor");
          }
        }); 
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
    this.seletedCoordinadorActualizar.id_usuario = this.validaciones.NULL;
    this.ngOnInit();
  }

  

}
