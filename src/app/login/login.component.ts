/* Servicios */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
/* Modelos */
import { UsuarioFindAll } from '../modelos/usuario-find-all';
import { DigitadorFindAll } from '../modelos/digitador-find-all';
import { TipoUsuario } from '../modelos/tipo-usuario';
/* Servicios */
import { LoginService } from '../servicios/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /* Se inicializa Array de la clase TipoUsuario Para almacenar la data de la BD */
  tipoUsuario:TipoUsuario[]=[];
  /* Se inicializa Array de la clase UsuarioFindAll Para almacenar la data de la BD */
  usuario:UsuarioFindAll[]=[];
  /* Se inicializa Array de la clase DigitadorFindAll Para almacenar la data de la BD */
  digitador:DigitadorFindAll[]=[];
  /* Se inicializa objeto vacio de la clase UsuarioFindAll */
  seletedUsuario:UsuarioFindAll=new UsuarioFindAll(null,'','',null,null,null,'','',null,'',null,null,null,'',null);
  /* Se inicializa objeto vacio de la clase TipoUsuario */
  seletedTipoUsuario:TipoUsuario=new TipoUsuario(null,'');
  /* Se carga constructor con los servivios utilizados */
  constructor(private loginServi:LoginService, private route:Router) { }
  /* Funcion que se ejecuta por defecto */
  ngOnInit() {
    /* llama el servicio loginServi y asigna en usuario los datos de la consulta */
    this.loginServi.findAllUsuario().then(usuarios => {
      this.usuario = usuarios;
      console.log(this.usuario);
    },(err:HttpErrorResponse) => {
      if (err.error instanceof Error) {
        alert("a ocurrido un errror cliente");
      } else {
        alert("a ocurrido un errror servidor");
      }
    });

    /* llama el servicio loginServi y asigna en digitador los datos de la consulta */
    this.loginServi.findAllDigitador().then(digitadores => {
      this.digitador = digitadores;
      console.log(this.digitador);
    },(err:HttpErrorResponse) => {
      if (err.error instanceof Error) {
        alert("a ocurrido un errror cliente");
      } else {
        alert("a ocurrido un errror servidor");
      }
    });

    /* llama el servicio loginServi y asigna en tipoUsuario los datos de la consulta */
    this.loginServi.findAllTipoUsuario().then(tipoUsuarios => {
      this.tipoUsuario = tipoUsuarios;
      console.log(this.tipoUsuario);
    },(err:HttpErrorResponse) => {
      if (err.error instanceof Error) {
        alert("a ocurrido un errror cliente");
      } else {
        alert("a ocurrido un errror servidor");
      }
    });

    /* Se inicializa el tipo de usuario con 1 para que tome un tipo valido por defecto */
    this.seletedTipoUsuario.id_tipo_usuario = 1;
  }

  /* Llama al evento del boton en la vista html */
  login() {
    let encontradoUsuarioLogin:boolean = false;
    let encontradoUsuarioContrasena:boolean = false;
    let encontradoUsuarioTipoUsuario:boolean = false;
    if (this.seletedUsuario.login == '') {
      alert('Llene el campo usuari@');
    } else if (this.seletedUsuario.contrasena == '') {
      alert('llene el campo Contraseñ@');
    } else {
      for(let i = 0; i < this.usuario.length; i++) {
        if(this.seletedUsuario.login == this.usuario[i].login) {
          encontradoUsuarioLogin = true;
            if (this.seletedUsuario.contrasena == this.usuario[i].contrasena) {
              encontradoUsuarioContrasena = true;
              if (this.seletedTipoUsuario.id_tipo_usuario == this.usuario[i].id_tipo_usuario) {
                encontradoUsuarioTipoUsuario = true;
                if (this.seletedTipoUsuario.id_tipo_usuario == 1) {
                  this.route.navigateByUrl('/perfilCoordinador');
                } else if (this.seletedTipoUsuario.id_tipo_usuario == 2) {
                  this.route.navigateByUrl('/perfilCoordinador');
                } else if (this.seletedTipoUsuario.id_tipo_usuario == 3) {
                  this.route.navigateByUrl('/perfilCoordinador');
                }
              }
            }
        }
      }

      for(let i = 0; i < this.digitador.length; i++){
        if(this.seletedUsuario.login == this.digitador[i].usu_digiador){
          encontradoUsuarioLogin = true;
          if (this.seletedUsuario.contrasena == this.digitador[i].con_digitador) {
            encontradoUsuarioContrasena = true;
            if (this.seletedTipoUsuario.id_tipo_usuario == this.digitador[i].id_tipo_usuario) {
              encontradoUsuarioTipoUsuario = true;
              if (this.seletedTipoUsuario.id_tipo_usuario == 4) {
                this.route.navigateByUrl('/perfilCoordinador');
              }
            }
         }
        }
      }
      
      if (encontradoUsuarioLogin == false) {
        alert('Usuario invalid@');
        this.seletedUsuario.login = '';
        this.seletedUsuario.contrasena = '';
      } else if (encontradoUsuarioContrasena == false) {
        alert('Contraseña invalid@');
        this.seletedUsuario.contrasena = '';
      } else if (encontradoUsuarioTipoUsuario == false) {
        alert('Tipo Usuario invalid@');
      } else {
        this.loginServi.InsertToken({
          user_usu:this.seletedUsuario.login, tipo_usuario: this.seletedTipoUsuario.id_tipo_usuario
        });
      }
    }
  }

}
