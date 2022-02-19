function addNewLiElementInList(city, acc){  // добавление li в список
    if(acc < 9) {
        var ul = document.getElementById("cities-list");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(city));
        ul.appendChild(li);
    }
}

function listCleaning(list){ // очистка списка
    while (list.firstChild)
    list.removeChild(list.firstChild);
}

function disableScroll() {
	let pagePosition = window.scrollY;
	document.body.classList.add('disable-scroll');
	document.body.dataset.position = pagePosition;
	document.body.style.top = -pagePosition + 'px';
}

function enableScroll() {
	let pagePosition = parseInt(document.body.dataset.position, 10);
	document.body.style.top = 'auto';
	document.body.classList.remove('disable-scroll');
	window.scroll({ top: pagePosition, left: 0 });
	document.body.removeAttribute('data-position');
}

function closeModal(){
    if (modalWindow.style.display == "flex") {
        modalWindow.style.display = ""
        enableScroll()
        document.getElementById('searchCity').value = ''
        listCleaning(document.querySelector("#cities-list"))
        initialLi.forEach(elem => {
            addNewLiElementInList(elem, 1)
        })
    }
}

function addEnterListener() {
    document.querySelector('#searchCity').addEventListener('keypress', function(event) {
        let val = document.querySelector('#searchCity').value.trim().toLowerCase()
        if (event.code == 'Enter' && val != '' || event['which'] == 13) {
        city = val
        console.log(event)
        
        closeModal()
        currentWeatherApiRequest(city)
        weatherForFourDaysApiRequest(lat, lon)
      }
    })
  }