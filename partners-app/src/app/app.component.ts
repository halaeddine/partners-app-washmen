import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Partners App';
  partners:any = [];
  value:any;
 

  distanceForm = new FormGroup({
    distance: new FormControl('', Validators.required)
  });


  constructor(private appService: AppService) {}


  onSubmit(){
    this.appService.getPartners(this.distanceForm.value.distance).subscribe(val=>{
      this.partners = val;
      console.log(this.partners);
    });
  }
}
