import { Component } from '@angular/core';
import { DOBModel } from 'src/models/input';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dobForm = new FormGroup({
    day: new FormControl('', Validators.required),
    month: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required)
  });

  title = 'age-calculator';
  value = false;
  emptyDay = true;
  emptyMonth = true;
  emptyYear = true
  ageYears:number = 0;
  ageMonths:number = 0
  ageDays:number = 0;
  currentDate = new Date();
  currentYear = Number(this.currentDate.getFullYear());

  dob:DOBModel = new DOBModel();
  constructor() { }

  ngOnInit() {
    console.log(this.currentDate)
  }

  getit(event:any){
    // console.log('I am here', event.srcElement.classList)
    // console.log(event.srcElement.classList[0])
    // console.log(event.srcElement.classList[1])
    console.log('See me here',event.target.value)
    let name = event.target.attributes.getNamedItem('ng-reflect-name').value;
    let value = event.target.value
     console.log(name)
     if(name == 'day') {
      this.dob.day = event.target.value;
        if(Number(this.dob.day) < 0 || Number(this.dob.day) > 31) this.value = false;
     }
     else if(name == 'month'){
      this.dob.month = event.target.value;
      if(Number(this.dob.month) < 0 || Number(this.dob.month) > 12) this.value = false;
     }
     else if(name == 'year'){
      this.dob.month = event.target.value;
      if(Number(this.dob.year) < 0 || Number(this.dob.year) > this.currentDate.getFullYear()) this.value = false;
     }


    if(event.srcElement.classList[0] == 'error' || event.srcElement.classList[1] == 'ng-pristine' || event.srcElement.classList[2] == 'ng-invalid' || event.srcElement.classList[3] == 'ng-touched') {
      this.value == false;
      console.log(this.value)
    }
  }

  
  verify() {
    if(this.dob.day == '' || this.dob.month == '' || this.dob.year == ''){
      this.value = true;
      console.log('You need to fill all the values', this.value)
    }

    else if((Number(this.dob.month) == 4 ||  Number(this.dob.month) == 6 ||  
    Number(this.dob.month) == 9 || Number(this.dob.month) == 11) && Number(this.dob.day) > 30) {
      console.log('The month does not reach 31')
      this.value = true;
    }

    else if ((Number(this.dob.month) == 2 ) && Number(this.dob.day) > 29) {
      console.log('The month of february is not more than 29')
      this.value = true;
    }
    else if(Number(this.dob.year) > this.currentYear) {

    }

    else {
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
