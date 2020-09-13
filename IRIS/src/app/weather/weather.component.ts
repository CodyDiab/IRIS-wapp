import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm:FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }
   sendToOpenWeatherAPI(formValues) {
     console.log(formValues);
     var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ formValues.location + "&appid=858b3927a8044ecb64a2c351fd3d6fad&units=imperial"
   
     fetch(currentUrl)
      .then(function(response) {
          if (response.ok) {
              response.json().then(function(data){
                 
                 console.log(data)
                  
                 
                 
                //fetch for future weather using coord from data 
                 var futureUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon=" +data.coord.lon+ "&appid=858b3927a8044ecb64a2c351fd3d6fad&units=imperial"
                 fetch(futureUrl)
                  .then(function(response){
                      if(response.ok){
                          response.json().then(function(data){
                              
                             console.log(data)
                              
                          })
            
                          
                      }
                  })
                 
              })
          }else{
             alert("Error: " + response.statusText);
          }
 
   })
  }
}
