import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../modelos/token';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-salir',
  templateUrl: './salir.component.html',
  styleUrls: ['./salir.component.css']
})
export class SalirComponent implements OnInit {

  aut:Token
  constructor(private loginServi:LoginService,private route:Router) { }

  ngOnInit() {
    this.aut=null;
    this.loginServi.deleteToken(this.aut);
    this.route.navigate(['/']);
  }

}
