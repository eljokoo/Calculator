import { NgModule } from '@angular/core';
import { CalculatorComponent } from './calculator.component';
import { CommonModule } from '@angular/common';
import { HistoryModule } from '../history/history.module';


@NgModule({
  declarations: [
    CalculatorComponent
  ],
  imports: [CommonModule, HistoryModule],
  exports: [
    CalculatorComponent
  ]
})
export class CalculatorModule {}