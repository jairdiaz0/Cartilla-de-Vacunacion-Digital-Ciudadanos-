import { Component, Input } from '@angular/core';
import { AlertClass } from 'src/app/core/class/Alert.Class';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() alert?:AlertClass;
  @Input() container?:Array<string>;

  constructor(){
    this.alert= new AlertClass();
  }

  ngOnInit(): void {
    if(this.alert){

    }else{
      console.log('Error al cargar el alert, cargando por defecto');
      this.alert = new AlertClass();
    }
  }
}
