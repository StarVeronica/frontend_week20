function find(evt) {
    evt.preventDefault();
    const div = document.getElementById('div');
    const error = document.getElementById('error');
    const user_choice = document.getElementById('user_choice');
    const id = document.getElementById('id');
    div.textContent = '';
    error.textContent = '';
    const loading_text = document.createElement('h4');
    loading_text.textContent = 'Идёт загрузка...';
    div.append(loading_text);
    let link = '';
    if(user_choice.value === 'Фильмы') {
        link = 'https://swapi.nomoreparties.co/films/' + id.value;
        if(id.value === '') {
            loading_text.textContent = 'Введите число от 1 до 6';
            return ;
        }
    } else {
        if(user_choice.value === 'Люди') {
            link = 'https://swapi.nomoreparties.co/people/' + id.value;
        } else if(user_choice.value === 'Планеты') {
            link = 'https://swapi.nomoreparties.co/planets/' + id.value;
        } else if(user_choice.value === 'Расы') {
            link = 'https://swapi.nomoreparties.co/species/' + id.value;
        } else if(user_choice.value === 'Звездолеты') {
            link = 'https://swapi.nomoreparties.co/starships/' + id.value;
        } else if(user_choice.value === 'Транспорты') {
            link = 'https://swapi.nomoreparties.co/vehicles/' + id.value;
        }
        if(id.value === '') {
            loading_text.textContent = 'Введите число от 1 до 10';
            return ;
        }
    }
    const promise = new Promise(function (resolve, reject) {
        fetch(link)
            .then((res) => {
                if(res.ok) {
                    resolve('Запрос обработан успешно');
                } else {
                    reject('Запрос отклонён');
                }
            })
            .catch((err) => {
                div.textContent = '';
                error.textContent = 'Нет подключения к интернету';
                console.error('Ошибка: Нет подключения к интернету');
            })
            .finally(() => {
                id.value = '';
            })
    });
    promise
    .then(function () {
        const keys = {'Фильмы': ['title', 'director', 'release_date', 'created'],
                      'Люди': ['name', 'gender', 'height', 'skin_color'],
                      'Планеты': ['name', 'diameter', 'population', 'climate'],
                      'Расы': ['name', 'classification', 'average_lifespan', 'language'],
                      'Звездолеты': ['name', 'starship_class', 'length', 'passengers'],
                      'Транспорты': ['name', 'vehicle_class', 'length', 'passengers', 'max_atmosphering_speed']};
        fetch(link)
            .then((res) => {
                    return res.json();
                })
            .then((data) => {
                error.textContent = '';
                div.textContent = '';
                keys[user_choice.value].forEach(element => {
                    const newItem = document.createElement('h4');
                    newItem.textContent += element[0].toUpperCase() + element.slice(1).replace(/_/g, ' ') + ': ' + data[element];
                    div.append(newItem);
                    div.append(document.createElement('br'));
                });
            })
            .catch((err) => {
                div.textContent = '';
                error.textContent = err;
                console.error('Ошибка:', err);
            })
    })
    .catch(function () {
        div.textContent = '';
        if(user_choice.value === 'Фильмы') {
            if(!(id.value >= 1 && id.value <= 6)) {
                error.textContent = 'Введите число от 1 до 6';
                console.error('Ошибка: Введите число от 1 до 6');
                return ;
            }
        } else {
            if(!(id.value >= 1 && id.value <= 10)) {
                error.textContent = 'Введите число от 1 до 10';
                console.error('Ошибка: Введите число от 1 до 10');
                return ;
            }
        }
        error.textContent = 'Сервер не доступен';
        console.error('Ошибка: Сервер не доступен');
    })
    .finally(() => {
        id.value = '';
    })
}

form.addEventListener('submit', find)
