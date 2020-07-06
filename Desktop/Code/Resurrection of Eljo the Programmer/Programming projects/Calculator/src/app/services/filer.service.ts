import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Subject } from 'rxjs';

import { Calculation } from '../models/Calculation';

@Injectable({
  providedIn: 'root'
})
export class FilerService {

  historyToggle: boolean = false;
  historyToggleChange:Subject<boolean> = new Subject<boolean>();

  constructor(public file:File) {
    // this.historyToggleChange.subscribe((value) => {
    //   this.historyToggle = value;
    // })
  }

  // toggleHistoryVisibility() {
  //   this.historyToggleChange.next(!this.historyToggle);
  // }

  firstWrite:number = 0;
  
  initialContents:any;
  fileContents:Calculation[] = [];

  // File details
  dirPath:string;
  fileName:string = 'history.json';

  // Remove files from last use
  removeFiles() {
    this.file.removeFile(`${this.file.cacheDirectory}/calculator/`, 'history.json')
    //.then( data => alert('File deleted!'));
  }

  // Create directory and file
  createFiles() {
    this.file.createDir(this.file.cacheDirectory, 'calculator', true).then( data => {
      this.dirPath = data.toURL();

      //alert('Dir created');

      this.file.writeFile(this.dirPath, 'history.json', '[')
      //.then( data => alert('File created'));
    }).catch( error => {
      alert(`Error name: ${error}`);
    } );
  }

  // Create calculation
  createCalculation(num1:number, num2:number, op:string, res:number) {
    return {
      value1: num1,
      value2: num2,
      operator: op,
      result: res
    };
  }

  // Write calculation to file
  writeCalc(calc:Calculation) {
    if(this.firstWrite == 0) {
      this.file.writeFile(this.dirPath, this.fileName, `\n${JSON.stringify(calc)}]`, {append: true, replace: false});
      //alert('Write successful!');
      this.firstWrite = 1;
    } else {
      this.file.readAsText(this.dirPath, this.fileName).then(data => {
        this.file.writeFile(this.dirPath, this.fileName, data.slice(0, -1), {replace: true}).catch( error => alert(`1.Error: ${error}`));
        //.then( data => alert('1.Complete'))
        this.file.writeFile(this.dirPath, this.fileName, `,\n${JSON.stringify(calc)}]`, {append: true, replace: false}).catch( error => alert(`2.Error: ${error}`));
        //.then( data => alert('2.Complete'))
      }).catch(error => alert('Initial error'));
    }
    
  }

  // Get file contents
  getContents() {
    this.file.readAsText(this.dirPath, this.fileName).then( data => {
      this.fileContents = JSON.parse(data);
      // alert('Content parsed');
    }).catch( error => {
      alert(`Error in retrieval: ${error}`);
    });
  }

  // addContent(calc:Calculation) {
  //   this.fileContents.push(calc);
  // }
}
