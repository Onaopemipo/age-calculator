import { Component } from '@angular/core';
import { DOBModel } from 'src/models/input';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'age-calculator';
  value = false;
  emptyDay = true;
  emptyMonth = true;
  emptyYear = true;
  validDay = false; ValidMonth = false; validYear = false;
  validDob = false;
  ageYears:number = 0;
  ageMonths:number = 0;
  ageDays:number = 0;
  currentDate = new Date();
  currentYear = Number(this.currentDate.getFullYear());
  dob:DOBModel = new DOBModel();
  constructor() { }

  ngOnInit() {
    console.log(this.currentDate)
  }

  getit(event:any){
    let name = event.target.attributes.getNamedItem('ng-reflect-name').value;
     switch(name) {
      case 'day': {
        let value = event.target.value
        console.log('It is a day', value);
        if(value > 0 && value <= 31 && value != '') {
          this.validDay = true;
          console.log('This is the value:',this.validDay)
        } 
        else {
          this.validDay = false;
          this.value = true;
        }
        break
      }
        
      case 'month': {
        let value = event.target.value
        console.log('It is a month', value);
        if(value > 0 && value <= 12 && value != '') {
          this.ValidMonth = true;
          console.log('This is the value:',this.ValidMonth)
        }

        else {
          this.ValidMonth = false;
          this.value = true;
        }
        break
      }

      case 'year': {
        let value = event.target.value
        console.log('It is a year', value);
        if(value >= 1000 && value <= this.currentYear && value != '') {
          this.validYear = true;
          console.log('This is the year value:',this.validYear)
        } 
        else {
          this.validYear = false;
          this.value = true;
        }
        break
      }

     }

     if(((Number(this.dob.month) == 2 ) && Number(this.dob.day) > 29) || 
    ((Number(this.dob.month) == 4 ||  Number(this.dob.month) == 6 ||  
    Number(this.dob.month) == 9 || Number(this.dob.month) == 11) && Number(this.dob.day) > 30) || 
    (Number(this.dob.year) < 1000 || Number(this.dob.year) > this.currentYear)) {
      this.validDob = false;
      this.value = true;
      console.log('This is my dob:', this.validDob)
    }

    else {
      this.validDob = true;
      this.value = false
    }
  }


  submit(){
    console.log(this.validDay, this.ValidMonth, this.validYear, this.validDob, this.value)
    if(this.dob.day == '' || this.dob.month == '' || this.dob.year == ''){
      this.value = true;
      this.validDob = false;
      console.log('You need to fill all the values', this.value)
    }
    else if(((Number(this.dob.month) == 2 ) && Number(this.dob.day) > 29) || 
    ((Number(this.dob.month) == 4 ||  Number(this.dob.month) == 6 ||  
    Number(this.dob.month) == 9 || Number(this.dob.month) == 11) && Number(this.dob.day) > 30) || 
    (Number(this.dob.year) < 1000 || Number(this.dob.year) > this.currentYear)) {
      this.validDob = false;
      this.value = true;
    }

    else if (this.validDay && this.ValidMonth && this.validYear && this.validDob && !this.value) {
      this.value = false;
      this.emptyDay = false;
      this.emptyMonth = false;
      this.emptyYear = false;
      this.ageDays = Math.abs((this.currentDate.getUTCDate()) - Number(this.dob.day));
      this.ageMonths = Math.abs((this.currentDate.getMonth() + 1) - Number(this.dob.month));
      this.ageYears = this.currentDate.getFullYear() - Number(this.dob.year);
      console.log(this.ageDays + "this month" + this.ageMonths + "this year" + this.ageYears)
    }
    
   
  }

}
