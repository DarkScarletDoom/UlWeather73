document.getElementById('searchInput').onclick = function() { 
    modalWindow = document.getElementById('modal')

    if (modalWindow.style.display == "") { // обработка события открытия окна
        modalWindow.style.display = 'flex'

        if(modalWindow.style.display == 'flex'){ 
            disableScroll() 
        }

        document.getElementById('close').onclick = function() { //обработка события закрытия окна
            closeModal()
            enableScroll()
        }

        const input = document.querySelector('#searchCity')

        input.oninput = () => {  //если произошло изменение в инпуте

            listCleaning(document.querySelector("#cities-list")) //  очистка списка
            let val = input.value.trim().toLowerCase() // получаем значение инпута, обрезая пробелы

            if (val != '') { //если ввели не пустую строку
                acc = 0
                cities.forEach((element) => { //перебор списка
                    if(element["city"].toLowerCase().search(val) != -1) { //добавление элемента, если значения совпадают
                        addNewLiElementInList(element["city"], acc) 
                        acc = acc + 1
                    }
                })
            }
            else{
                initialLi.forEach(elem => {
                    addNewLiElementInList(elem, 1)
                })
            }
        }
    }
}