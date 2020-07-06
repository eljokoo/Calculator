import { Component} from '@angular/core';
import { File } from '@ionic-native/file/ngx';

import { FilerService } from '../../services/filer.service';
import { ThrowStmt } from '@angular/compiler';
import { Calculation } from 'src/app/models/Calculation';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent{

  constructor(public filerService:FilerService) {
    
  }

  historyToggle:number = 0;
  minusStatus:number = 0;
  // historyToggle:boolean = false;

  // Calculator buttons
  longButtons:string[] = ['AC', 'CE'];
  buttons:string[] = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '.', '0', '=', '+'];

  // Value of input
  result:any = '';

  // Keeps track of the decimal
  dotCount:number = 0;

  // Whether calculation is made and what calculation is being carried out
  calcDone:boolean = false;
  currentCalc:string = '';

  // Checks if the number on the screen is the result of a previous calculation
  isResult:boolean = false;

  // Values of calculations
    // Used for keeping track of first number and writing to database
  private value1:string = '';
  private value2:string = '';


  // Functionality of keys
  addNumber(button:any) {
    if(button !== '/' && button !== '*' && button !== '-' && button !== '.' && button !== '=' && button !== '+' && button !== 'AC' && button !== 'CE' && button != '(-)') {
      if(this.isResult !== true) {
        this.result += button;
      } else {
        this.result = '';
        this.result += button;
        this.isResult = false;
      }
    } else {

      if(button == '.' && this.dotCount !== 1 && this.isResult !== true) {
        if(this.result == '') {
          this.result += '0.';
          this.dotCount = 1;
        } else {
          this.result += button;
          this.dotCount = 1;
        }
      }

      if(button == '(-)' && this.result == '') {
        this.result += '-';
      }

      if(button == '(-)' && this.isResult == true) {
        this.result = '-';
        this.isResult = false;
      }

      if(button == 'AC') {
        // Reset result identifier
        if(this.isResult == true) {
          this.isResult = false;
        }
        this.result = '';
        this.dotCount = 0;        
      }

      if(button == 'CE') {
        if(this.result.substr(-1) == '.') {
          this.dotCount = 0;
        }

        this.result = this.result.slice(0, -1);
      }

      if(button == '+') {
        if(this.calcDone == false) {
          this.currentCalc = '+';
          this.value1 = this.result;
          this.result = '';
          this.dotCount = 0;
          this.calcDone = true;
        }
        
        // Changing calculation before entering second number
        if(this.calcDone == true && this.result == '') {
          this.currentCalc = '+';
        }
      }

      if(button == '-') {
        if(this.calcDone == false) {
          this.currentCalc = '-';
          this.value1 = this.result;
          this.result = '';
          this.dotCount = 0;
          this.calcDone = true;
        }
        
        // Changing calculation before entering second number
        if(this.calcDone == true && this.result == '') {
          this.currentCalc = '-';
        }
      }

      if(button == '*') {
        if(this.calcDone == false) {
          this.currentCalc = '*';
          this.value1 = this.result;
          this.result = '';
          this.dotCount = 0;
          this.calcDone = true;
        }
        
        // Changing calculation before entering second number
        if(this.calcDone == true && this.result == '') {
          this.currentCalc = '*';
        }
      }

      if(button == '/') {
        if(this.calcDone == false) {
          this.currentCalc = '/';
          this.value1 = this.result;
          this.result = '';
          this.dotCount = 0;
          this.calcDone = true;
        }

        // Changing calculation before entering second number
        if(this.calcDone == true && this.result == '') {
          this.currentCalc = '/';
        }
      }

      if(button == '=') {
        if(this.calcDone == true) {
          this.value2 = this.result;

          if(this.currentCalc == '+') {
            this.result = parseFloat(this.value1) + parseFloat(this.value2);
            this.filerService.writeCalc(this.filerService.createCalculation(parseFloat(this.value1), parseFloat(this.value2), this.currentCalc, this.result));
            this.calcDone = false;
            this.currentCalc = '';
            this.isResult = true;
          } else if(this.currentCalc == '-') {
            this.result = parseFloat(this.value1) - parseFloat(this.value2);
            // this.filerService.addContent(this.filerService.createCalculation(parseFloat(this.value1), parseFloat(this.value2), this.currentCalc, this.result));
            this.filerService.writeCalc(this.filerService.createCalculation(parseFloat(this.value1), parseFloat(this.value2), this.currentCalc, this.result));
            this.calcDone = false;
            this.currentCalc = '';
            this.isResult = true;
          } else if(this.currentCalc == '*') {
            this.result = parseFloat(this.value1) * parseFloat(this.value2);
            this.filerService.writeCalc(this.filerService.createCalculation(parseFloat(this.value1), parseFloat(this.value2), this.currentCalc, this.result));
            this.calcDone = false;
            this.currentCalc = '';
            this.isResult = true;
          } else if(this.currentCalc == '/') {
            this.result = parseFloat(this.value1) / parseFloat(this.value2);
            this.filerService.writeCalc(this.filerService.createCalculation(parseFloat(this.value1), parseFloat(this.value2), this.currentCalc, this.result));
            this.calcDone = false;
            this.currentCalc = '';
            this.isResult = true;
          }
        }
      }
    }
  }

  // Changes . button to - and vice versa
  changeMinus() {
    if(this.minusStatus == 0) {
      this.buttons[12] = '(-)';
      this.minusStatus = 1;
    } else if (this.minusStatus == 1) {
      this.buttons[12] = '.';
      this.minusStatus = 0;
    }
  }

  // Switches page to history
  toggleHistory() {
    if(this.historyToggle == 0) {
      this.filerService.getContents();
      this.historyToggle = 1;
    } else {
      this.historyToggle = 0;
    }

  }


  ngOnInit(): void {
    // Delete past file
    this.filerService.removeFiles();

    // Create dir and file on init
    this.filerService.createFiles();
  }
}
