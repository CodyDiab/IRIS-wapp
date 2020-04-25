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
                
                displayCurrentWeather(data)
                
                
               //fetch for future weather using coord from data 
                var futureUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon=" +data.coord.lon+ "&appid=858b3927a8044ecb64a2c351fd3d6fad&units=imperial"
                fetch(futureUrl)
                 .then(function(response){
                     if(response.ok){
                         response.json().then(function(data){
                             
                            displayFutureWeather(data)
                             
                         })
           
                         
                     }
                 })
                
                
                
                

        
             
             })
         }


     })
     
    
      

}



//display data on screen 
  
  //current day
displayCurrentWeather = function(data){
  var cityTitle = document.querySelector("#city-date")
  var currentTemp = document.querySelector("#currentTemp")
  var currentHumid = document.querySelector("#currentHumid")
  var currentWind = document.querySelector("#currentWind")
 

  cityTitle.textContent=data.name+":" +date
  currentTemp.textContent="Temperature: " +Math.ceil(data.main.temp)+"F"
  currentHumid.textContent="Humidity: " +data.main.humidity+"%"
  currentWind.textContent="Wind Speed: "+data.wind.speed+ "MPH"


}
  /// future weather
  displayFutureWeather = function(data){
      console.log(data)
      var currentUv = document.querySelector("#currentUv")


      currentUv.textContent="UV Index: "+data.daily[0].uvi
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