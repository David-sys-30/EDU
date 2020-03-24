import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventosService } from '../../services/eventos.service';
import { UsuarioService } from '../../services/usuario.service';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarDateFormatter,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { CustomDateFormatter } from './date-formatter';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  providers:[
  {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }, 
    EventosService,
    UsuarioService
  ]
})
export class AgendaComponent implements OnInit {

   public eventos;
  ngOnInit() {
    this._eventos.getEventos(this.identity.usuario[0].idUsuario).subscribe(response=>{
      this.eventos = response[0]
      for(var c in this.eventos){
          this.eventos[c].fechaInicioEvento = new Date(this.eventos[c].fechaInicioEvento)
          this.eventos[c].fechaFinEvento = new Date(this.eventos[c].fechaFinEvento)
          this.events.push({title:this.eventos[c].nombreEvento,start:this.eventos[c].fechaInicioEvento,end:this.eventos[c].fechaFinEvento,color: colors.red,
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false
        }})
        }
        var uniqueArray = removeDuplicates(this.events, "title");
        for(var c in uniqueArray){
          uniqueArray[c].start = new Date(uniqueArray[c].start)
          uniqueArray[c].end = new Date(uniqueArray[c].end)
          
        }
        this.events = uniqueArray;
    })


    function removeDuplicates(originalArray, prop) {
     var newArray = [];
     var lookupObject  = {};

     for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
     }

     for(i in lookupObject) {
         newArray.push(lookupObject[i]);
     }
      return newArray;
 }

  }

  locale: string = 'es';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
	@ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  
  
  events: CalendarEvent[] = [];
  



  activeDayIsOpen: boolean = false;

  public identity;

  constructor(private modal: NgbModal,
    private _eventos: EventosService,
    private _usuariorService:UsuarioService) {
    this.identity = this._usuariorService.getIdentity();
  }



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(fechaFinEvento, idUsuarioPersonaCurso, nombreEvento) {
    if (nombreEvento != 'undefined'){
       this._eventos.registerEventos({fechaFinEvento:fechaFinEvento}, idUsuarioPersonaCurso, nombreEvento).subscribe(response=>{
    },
            error=>{
              var errorMensaje = <any>error;
              if (errorMensaje != null) {
                var body = JSON.parse(error._body);
              }
            }
            )
    }

   
   
  }

  // addEvent2(title): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: title,
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors.red,
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true
  //       }
  //     }
  //   ];
  //   let  item = JSON.stringify(this.events);
  //   localStorage.setItem('Events', item);
   
  // }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  

}
