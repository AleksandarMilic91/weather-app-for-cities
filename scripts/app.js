//app.js is for DOM manipulation

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    const cityDetails = data.cityDetails;
    const weather = data.weather;
    //destructure property way, line 9 and 10
    // const { cityDetails, weather} = data;  Isto sto i iznad, samo u jednoj liniji koda
    
    //Update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        </div>
    `;

    //update night/day & icons images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    //ternarni operatori, provera
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSrc);

    //remove display:none if present, on card
    if (card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {
        cityDetails: cityDetails,
        weather: weather
    };

};

cityForm.addEventListener('submit', e => {

   e.preventDefault(); 

   //uzimanje city vrednosti, ono sto user ukuca
    const city = cityForm.city.value.trim();

    //resetovanje inputa kada se ukuca neka vrednost
    cityForm.reset();

    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    // SET local storage
    localStorage.setItem('city', city);

});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}