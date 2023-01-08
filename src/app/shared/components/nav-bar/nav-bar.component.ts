import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  @Input() userName?: Array<string>;

  title:string;
  options:any;

  constructor(){
    this.title = "Usuario No Encontrado";
    this.options = [
      {
        text: 'Mi cuenta',
        class: ['nav-item', 'text-center', 'rounded', 'bg-dark', 'me-lg-2', 'mb-2', 'mb-lg-0', 'mt-3', 'mt-lg-0'],
        router: ['/', 'home', 'user']
      },
      {
        text: 'Agregar Cartilla',
        class: ['nav-item', 'text-center', 'rounded', 'bg-dark', 'me-lg-2', 'mb-2', 'mb-lg-0'],
        router: ['/', 'home', 'user', 'newCard']
      },
      {
        text: 'Cerrar Sesión',
        class: ['nav-item', 'text-center', 'rounded', 'bg-dark', 'me-lg-2', '', 'mb-0'],
        router: ['/', 'auth']
      }
    ]
  }

  ngOnInit(){
    if(this.userName && this.userName?.length > 0){
      this.title = this.userName[0];
    }
  }
}
