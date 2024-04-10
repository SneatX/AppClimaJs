const divResultado = document.querySelector('.content-result')
const form = document.querySelector('.get-weather')
const ciudad = document.querySelector('#city')
const pais = document.querySelector('#country')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if(ciudad.value === ''){
        mostrarError('El campo de la ciudad esta vacio')
        return
    }
    if(pais.value === ''){
        mostrarError('El campo del pais esta vacio')
        return
    }

    consultarAPI(ciudad.value, pais.value)
})

function consultarAPI(city, country){
    const apiId = '41d1d7f5c2475b3a16167b30bc4f265c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`

    fetch(url)
        .then(data => {
            return data.json()
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                mostrarError('Ciudad no encontrada...')
            } else {
                limpiarData();
                mostrarClima(dataJSON)
            }
        })
        .catch(error => {
            console.log(error)
        })
}

function mostrarClima(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data

    const degrees = kelvinToCentigrade(temp)
    const min = kelvinToCentigrade(temp_min)
    const max = kelvinToCentigrade(temp_max)

    const content = document.createElement('div')
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
    `
    document.querySelector('.content-imagen').innerHTML =` <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">`

    divResultado.appendChild(content)
}

function mostrarError(message){
    const alert = document.createElement('p')
    alert.classList.add('alert-message')
    alert.innerHTML = message

    form.appendChild(alert)
    setTimeout(() => {
        alert.remove()
    }, 3000)
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15)
}

function limpiarData(){
    divResultado.innerHTML = ''
}
