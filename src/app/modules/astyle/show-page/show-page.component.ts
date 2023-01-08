import { Component, OnInit } from '@angular/core';

import * as dataRaw from '../../../data/cards/cards.json';

@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.css'],
})
export class ShowPageComponent {

  ngOnInit(){
    console.log(dataRaw)
    const {cards} = dataRaw;
    console.log(cards)
  }
}
