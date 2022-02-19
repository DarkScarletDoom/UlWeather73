addEnterListener()
const key = '10cd2106e6ff4ba2f38c28ecde9239b4'
const months = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];
let city = 'Ульяновск'

document.getElementById('cities-list').onclick = function(event) {
    city = event.target.innerHTML
    closeModal()

    currentWeatherApiRequest(city)
    weatherForFourDaysApiRequest(lat, lon)
}

currentWeatherApiRequest(city) 
weatherForFourDaysApiRequest(lat, lon)