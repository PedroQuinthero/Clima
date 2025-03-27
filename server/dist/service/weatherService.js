import dotenv from 'dotenv';
dotenv.config();
class Weather {
    constructor(city, data) {
        this.city = city;
        this.date = new Date(data.dt * 1000).toDateString();
        this.temperature = data.main.temp_max;
        this.humidity = data.main.humidity;
        this.windSpeed = data.wind.speed;
        this.description = data.weather[0].description;
        this.icon = data.weather[0].icon;
    }
}
class WeatherService {
    constructor() {
        this.apiKey = process.env.OPENWEATHER_API_KEY;
    }
    async fetchLocationData(query) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&limit=1&appid=${this.apiKey}&units=imperial`;
        const response = await fetch(url);
        return response.json();
    }
    destructureLocationData(locationData) {
        console.log(locationData);
        return { lat: locationData.coord.lat, lon: locationData.coord.lon };
    }
    buildWeatherQuery(coordinates) {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
    }
    async fetchWeatherData(coordinates) {
        const url = this.buildWeatherQuery(coordinates);
        const response = await fetch(url);
        return response.json();
    }
    async getWeatherForCity(city) {
        const locationData = await this.fetchLocationData(city);
        if (!locationData) {
            throw new Error('');
        }
        const coordinates = this.destructureLocationData(locationData);
        let weatherData = await this.fetchWeatherData(coordinates);
        weatherData = weatherData;
        const forecastArray = [];
        forecastArray.push(new Weather(city, locationData));
        for (let i = 0; i < weatherData.list.length; i += 8) {
            forecastArray.push(new Weather(city, weatherData.list[i]));
        }
        return forecastArray;
    }
}
export default new WeatherService();
