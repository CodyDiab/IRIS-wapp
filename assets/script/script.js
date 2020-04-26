var citySearch = document.querySelector("#citySearch")
var city = citySearch.value
let cityHistory= JSON.parse(window.localStorage.getItem('cities'))






// fetch from api for current weather

getCurrentWeather = function(city) {
   
    var currentUrl = "http://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=858b3927a8044ecb64a2c351fd3d6fad&units=imperial"
   
    fetch(currentUrl)
     .then(function(response) {
         if (response.ok) {
             response.json().then(function(data){
                console.log(data)
                displayCurrentCity(data)
                 
                
                
               //fetch for future weather using coord from data 
                var futureUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon=" +data.coord.lon+ "&appid=858b3927a8044ecb64a2c351fd3d6fad&units=imperial"
                fetch(futureUrl)
                 .then(function(response){
                     if(response.ok){
                         response.json().then(function(data){
                             
                            displayWeather(data)
                             
                         })
           
                         
                     }
                 })
                
             })
         }else{
            alert("Error: " + response.statusText);
         }


     })
     
    
      

}

// display for current day
displayCurrentCity = function(data){
    var currentDate= new Date(data.dt*1000).toLocaleDateString("en-US")
    var cityTitle = document.querySelector("#city-date") 
    var currentWeather= document.querySelector("#currentIcon")
    cityTitle.textContent= data.name+":" +currentDate
    currentWeather.setAttribute("src","http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png")
   
    
    
}
//display data on screen 
  
  //future forecaste/ current details
displayWeather = function(data){

  var currentTemp = document.querySelector("#currentTemp")
  var currentHumid = document.querySelector("#currentHumid")
  var currentWind = document.querySelector("#currentWind")
  var currentUv = document.querySelector("#currentUv")

  
  currentTemp.textContent="Temperature: " +Math.ceil(data.current.temp)+"F"
  currentHumid.textContent="Humidity: " +data.current.humidity+"%"
  currentWind.textContent="Wind Speed: "+data.current.wind_speed+ "MPH"
  currentUv.textContent="UV Index: "+data.current.uvi
       if(data.current.uvi > 7){
           currentUv.className = "danger"
       }else{
           currentUv.className = "green"
       }
      console.log(data)
     
      
    
/// iterate through data for future forecast
    for(i=1;i<data.daily.length-1;i++){

        var indexTitle = document.querySelector("#indextitle"+i)
        var indexTemp = document.querySelector("#indexTemp"+i)
        var indexHumid = document.querySelector("#indexHumid"+i)
        var icon = document.querySelector("#icon"+i)

        var futureDates= new Date(data.daily[i].dt * 1000).toLocaleDateString("en","US")
        
    indexTitle.textContent=futureDates
    indexTemp.textContent="Temp: "+Math.ceil(data.daily[i].temp.day)
    indexHumid.textContent="Humidity: "+data.daily[i].humidity+"%"
    icon.setAttribute("src","http://openweathermap.org/img/wn/"+data.daily[i].weather[0].icon+"@2x.png")
     }
  }

 

//create button for search history on reload
var buttonHandler= function(event){
    var btnCity = event.target.getAttribute("data-city")
    
    getCurrentWeather(btnCity)
}

    
loadButtons=function() {
    
    var buttonCities=JSON.parse(window.localStorage.getItem('cities'))
   
    
    for(i=0;i<buttonCities.length;i++){

        var otherButtons= document.querySelector(".button")
        var history= document.querySelector("#cityBtns")
        var inQuestion=JSON.stringify(buttonCities[i])
    if (!otherButtons||
        inQuestion!=otherButtons.getAttribute("data-city"))
    {
       var button = document.createElement("button")
           
       
       button.textContent=buttonCities[i]
       button.setAttribute('class', 'button is-info')
       button.setAttribute('data-city',buttonCities[i] )
       history.appendChild(button)

       button.addEventListener("click", buttonHandler)
    
       
    }




       
     
      
          
       
    }
  }



//event listener search
document.querySelector('#searchBox').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {

        
        var citySearch = document.querySelector("#citySearch");
        var city = citySearch.value.trim();
        
      
        getCurrentWeather(city)
        
        if(cityHistory){
            if (cityHistory.indexOf(city) === -1) 
         cityHistory.push(city);
         
         }else{
           cityHistory=[]
             cityHistory.push(city);
        
        
     
         }
         window.localStorage.setItem("cities",JSON.stringify(cityHistory))
        
         var history= document.querySelector("#cityBtns")
         var button = document.createElement("button")
           
       
       button.textContent=city
       button.setAttribute('class', 'button is-info')
       button.setAttribute('data-city',city )
       history.appendChild(button)

       button.addEventListener("click", buttonHandler)
    
    
        }
  

});
loadButtons()
