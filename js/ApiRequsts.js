 // текущая погода сегодня
function currentWeatherApiRequest(city) {
    currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&lang=ru&appid='
    let xhr = new XMLHttpRequest()
    xhr.open('GET', currentWeatherUrl + key, false)
    showSpinner()

    xhr.onload = () => {
        // toggleSpinner()
        weather = JSON.parse(xhr.response)

        if(parseInt(weather['cod']) == 200) { // если запрос прошел успешно

            // получение некоторых значений
            temp = parseInt(weather['main']['temp']) - 273
            weatherStatus = weather['weather']['0']['description']
            lat = weather['coord']['lat']
            lon = weather['coord']['lon']
        
            // добавление в html
            document.getElementById('tempMain').innerHTML = temp.toString() + '°'
            document.getElementById('windSpeed').innerHTML = weather['wind']['speed'] + ' м/с'
            document.getElementById('nameOfCity').innerHTML = weather['name']
            document.getElementById('weatherStatus').innerHTML = weatherStatus
        }

        else{  // обработка ошибки
            response = weather

            // получение значений об ошибке
            cod = response['cod']
            message = response['message']

            // вывод ошибки пользователю
            document.getElementById('main').style.display = 'none' // скрываем главный блок
            error = document.getElementById('error') // получаем доступ к блоку ошибки
            error.style.display = 'block' 
            if(cod == 404){
                error.innerHTML = cod + ': ' + message + '. Город "' + city + '" не найден. Нажмите на эту запись, чтобы перезагрузить страницу ' // выводим ошибку в html
            }
            else{
                error.innerHTML = cod + ': ' + message // выводим ошибку в html
            }
        }
    }
    xhr.onerror = () => {  // если запрос не прошел совсем
        document.getElementById('main').style.display = 'none'
        console.log('error')
        error = document.getElementById('error')
        error.style.display = 'block'
        error.innerHTML = 'ERROR'
    }
    xhr.send()
}

// погода на 4 дня
function weatherForFourDaysApiRequest(lat, lon) {
    weatherForFourDays = 'https://api.openweathermap.org/data/2.5/onecall?' + 'lat=' + lat + '&lon=' + lon + '&lang=ru&appid='
    xhr = new XMLHttpRequest()

    xhr.open('GET', weatherForFourDays + key, false)

    xhr.onload = () => {

        if(parseInt(weather['cod']) == 200) { // если запрос прошел успешно

            weather = JSON.parse(xhr.response)

            // получение температуры в массив
            tempArrive = []
            weather['daily'].forEach(element => {
                tempArrive.push(parseInt(element['temp']['day']) - 273)
            });

            // получение скорости ветра в массив
            windSpeed = []
            weather['daily'].forEach(element => {
                windSpeed.push(element['wind_speed'])
            });

            // устанавливаем параметры для четырех дней в html
            for(let i = 1; i < 5; i++){

                //работа с датой и временем
                unix = new Date(parseInt(weather['daily'][i]['dt']) * 1000)
                let month = months[unix.getMonth()]
                let day = unix.getDate()
                
                document.getElementById(i).firstChild.innerHTML = month + ' ' + day
                document.getElementById(i).childNodes[1].innerHTML = tempArrive[i].toString() + '° '
                document.getElementById(i).lastChild.innerHTML = windSpeed[i] + ' м/с'
                hideSpinner()
            }
        }

    }
    xhr.send()
}