const rootUrl = 'http://samples.openweathermap.org/data/2.5/weather?appid=d6c405dcb005958c503531c3476c4bd0'

export const fetchWeather = (lat,lon) => {
     const url = rootUrl+'&lat='+'&lon='+lon
     console.log(url)

    return fetch(url)
     .then(res => res.json())
     .then(json => ({
         temp: json.main.temp,
         weather: json.weather[0].main
     }))
}