import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Calculation } from 'src/app/models/Calculation';
import { FilerService } from 'src/app/services/filer.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  
})
export class HistoryComponent implements OnInit {

  constructor(public filerService:FilerService, private cdr:ChangeDetectorRef) { 
    // this.filerService.historyToggleChange.subscribe( value => {
    //   if(value === true) {
    //     this.historyObjects = this.historyObjects.concat(this.filerService.fileContents);
    //     this.filerService.fileContents = [];
    //     console.log(this.historyObjects);
    //   }
    // });
  }

  // get isHistoryToggled():boolean {
  //   return this.filerService.historyToggle;
  // }

  // Array of objects
  @Input() historyObjects:Calculation[] = [];

  //= [
  // {
  //   value1: 4,
  //   value2: 3,
  //   operator: '+',
  //   result: 1
  // },
  //   {
  //     value1: 4,
  //     value2: 3,
  //     operator: '+',
  //     result: 1
  //   },
  //   {
  //     value1: 4,
  //     value2: 3,
  //     operator: '+',
  //     result: 1
  //   },
  //   {
  //     value1: 4,
  //     value2: 3,
  //     operator: '+',
  //     result: 1
  //   },
  //   {
  //     value1: 4,
  //     value2: 3,
  //     operator: '+',
  //     result: 1
  //   },
  //   {
  //     value1: 4,
  //     value2: 3,
  //     operator: '+',
  //     result: 1
  //   },
  //   {
  //     value1: 4,
  //     value2: 3,
  //     operator: '+',
  //     result: 1
  //   }
  // ]

  ngOnInit() {
  }

}
