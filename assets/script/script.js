var citySearch = document.querySelector("#citySearch")
var city = citySearch.value
let cityHistory= JSON.parse(window.localStorage.getItem('cities'))



////var today = new Date()

//var currentDate = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
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


displayCurrentCity = function(data){
    var currentDate= new Date(data.dt*1000).toLocaleDateString("en-US")
    var cityTitle = document.querySelector("#city-date") 
    var currentWeather= document.querySelector("#currentIcon")
    cityTitle.textContent= data.name+":" +currentDate
    currentWeather.setAttribute("src","http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png")

    
}
//display data on screen 
  
  //current day
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

 

//search history??
var dropSelectHandler= function(event){
    var dropCity = event.target.getAttribute("data-city")
    
    getCurrentWeather(dropCity)
}

    
appendDrop=function() {
    
   
    for(i=0;i<cityHistory.length;i++){
        var history= document.querySelector("#history")
       var dropOption = document.createElement("option")
           
       
       dropOption.textContent=cityHistory[i]
       dropOption.setAttribute('data-city',cityHistory[i] )
       history.appendChild(dropOption)

       dropOption.addEventListener("click", dropSelectHandler)
    
       
       




       
     
      
          
       
    }
    
}


//event listener search
document.querySelector('#searchBox').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        var citySearch = document.querySelector("#citySearch");
        var city = citySearch.value.trim();
        // cityHistory.push(city)
        // check for duplicates
        getCurrentWeather(city)
        
        if (cityHistory.indexOf(city) === -1) 
        cityHistory.push(city);
        
      
    
    }

    window.localStorage.setItem("cities",JSON.stringify(cityHistory))
    //appendDrop()
});

appendDrop()