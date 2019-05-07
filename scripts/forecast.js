//forecast.js is for interacting with API's

const key = '17qXJ9lttD96GroK7FByVrBBAE985AEb';

// get weather info
const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);

    //pretvaramo u data, koristeci json()
    const data = await response.json();

    return data[0];

};


// get city info
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;  //query koji se dodaje na bazu iznad, pocinje uvek sa ? i kada se dodaje jos onda &

    const response = await fetch(base + query);

    //pretvaramo u data, koristeci json()
    const data = await response.json();

    return data[0];

};