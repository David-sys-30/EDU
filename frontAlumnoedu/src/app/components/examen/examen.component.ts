import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../../services/examen.service';
import { GLOBAL } from '../../services/global.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css'],
  providers: [ExamenService]
})
export class ExamenComponent implements OnInit {

  constructor(private _examenService:ExamenService) { 

  }

  ngOnInit() {
  }

}
