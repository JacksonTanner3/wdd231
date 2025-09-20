const currentyear = document.querySelector('#currentyear');
const today = new Date();
currentyear.textContent = today.getFullYear();

const lastmodified = document.querySelector('#lastmodified');
lastmodified.textContent = "Last Modified: " + document.lastModified;

const apiKey = '42f24abbf90a85eff7ab3ecd4f5e516e';
const city = 'Boise';
const country = 'US';

async function getWeather() {
    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=imperial&appid=${apiKey}`;

        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        if (weatherData.cod !== 200 || forecastData.cod !== '200') {
            throw new Error(weatherData.message || forecastData.message);
        }

        displayCurrentWeather(weatherData);
        displayForecast(forecastData);

    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        const weatherSection = document.getElementById('weather-section');
        if (weatherSection) {
            weatherSection.innerHTML = `<p>Failed to load weather data. Please check your API key.</p>`;
        }
    }
}

function displayCurrentWeather(data) {
    const weatherSection = document.getElementById('weather-section');
    if (weatherSection) {
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        weatherSection.innerHTML = `
            <h3>${temp}°F</h3>
            <p class="description">${desc}</p>
            <div class="forecast" id="forecast-container"></div>
        `;
    }
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    if (forecastContainer) {
        const uniqueDays = new Set();
        const today = new Date().toLocaleDateString('en-US');

        for (const item of data.list) {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en-US');

            if (day !== today && !uniqueDays.has(day)) {
                uniqueDays.add(day);
                if (uniqueDays.size <= 3) {
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const temp = Math.round(item.main.temp);
                    forecastContainer.innerHTML += `
                        <div class="forecast-day">
                            <p>${dayName}</p>
                            <p>${temp}°F</p>
                        </div>
                    `;
                }
            }
        }
    }
}

// Spotlight 
async function getRandomSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error('Could not fetch member data');
        }
        const data = await response.json();
        const members = data.members;

        const qualifiedMembers = members.filter(member => member.membership === 'Gold' || member.membership === 'Silver');
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
        const selectedMembers = shuffled.slice(0, 3);

        const spotlightSection = document.getElementById('spotlight-section');
        if (spotlightSection) {
            spotlightSection.innerHTML = '';

            selectedMembers.forEach(member => {
                spotlightSection.innerHTML += `
                    <div class="spotlight-item">
                        <img class="spotlight-logo" src="${member.logo}" alt="${member.name} Logo">
                        <h3>${member.name}</h3>
                        <p>${member.address}</p>
                        <p>${member.phone}</p>
                        <p><a href="${member.website}" target="_blank">${member.website.replace('https://', '')}</a></p>
                        <p class="membership-level">Membership: ${member.membership}</p>
                    </div>
                `;
            });
        }

    } catch (error) {
        console.error("Failed to load spotlights:", error);
        const spotlightSection = document.getElementById('spotlight-section');
        if (spotlightSection) {
            spotlightSection.innerHTML = `<p>Failed to load business spotlights.</p>`;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getWeather();
    getRandomSpotlights();
});