var citySearch = document.querySelector("#citySearch")
var city = citySearch.value

var today = new Date()

var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
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
         }


     })
     
    
      

}


displayCurrentCity = function(data){
    var cityTitle = document.querySelector("#city-date") 
    var currentWeather= document.querySelector("#currentIcon")
    cityTitle.textContent= data.name+":" +date
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

      console.log(data)
      
    

    for(i=0;i<data.daily.length-2;i++){
        var indexTitle = document.querySelector("#indextitle"+i)
        var indexTemp = document.querySelector("#indexTemp"+i)
        var indexHumid = document.querySelector("#indexHumid"+i)
        var icon = document.querySelector("#icon"+i)

    indexTitle.textContent=(today.getMonth()+1)+'/'+(today.getDate()+i+1)+'/'+today.getFullYear();
    indexTemp.textContent="Temp: "+Math.ceil(data.daily[i].temp.day)
    indexHumid.textContent="Humidity: "+data.daily[i].humidity+"%"
    icon.setAttribute("src","http://openweathermap.org/img/wn/"+data.daily[i].weather[0].icon+"@2x.png")
     }
  }

//call fetch on search terms

//search history??



//event listeners
document.querySelector('#searchBox').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        var citySearch = document.querySelector("#citySearch");
        var city = citySearch.value.trim();
        getCurrentWeather(city)
    }
});