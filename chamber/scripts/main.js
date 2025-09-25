document.addEventListener("DOMContentLoaded", () => {

    const currentYearElem = document.querySelector('#currentYear');
    if (currentYearElem) {
        currentYearElem.textContent = new Date().getFullYear();
    }

    const lastModifiedElem = document.querySelector('#lastmodified');
    if (lastModifiedElem) {
        lastModifiedElem.textContent = "Last Modified: " + document.lastModified;
    }

    // 2. Weather
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
        if (!weatherSection) return;

        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        weatherSection.innerHTML = `
            <h3>${temp}°F</h3>
            <p class="description">${desc}</p>
            <div class="forecast" id="forecast-container"></div>
        `;
    }

    function displayForecast(data) {
        const forecastContainer = document.getElementById('forecast-container');
        if (!forecastContainer) return;

        const uniqueDays = new Set();
        const todayStr = new Date().toLocaleDateString('en-US');

        for (const item of data.list) {
            const date = new Date(item.dt * 1000);
            const dayStr = date.toLocaleDateString('en-US');

            if (dayStr !== todayStr && !uniqueDays.has(dayStr)) {
                uniqueDays.add(dayStr);
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

    getWeather();

    // 3. Spotlight Section
    async function getRandomSpotlights() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) throw new Error('Could not fetch member data');

            const data = await response.json();
            const members = data.members;

            const qualifiedMembers = members.filter(m => m.membership === 'Gold' || m.membership === 'Silver');
            const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
            const selectedMembers = shuffled.slice(0, 3);

            const spotlightSection = document.getElementById('spotlight-section');
            if (!spotlightSection) return;

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

        } catch (error) {
            console.error("Failed to load spotlights:", error);
            const spotlightSection = document.getElementById('spotlight-section');
            if (spotlightSection) {
                spotlightSection.innerHTML = `<p>Failed to load business spotlights.</p>`;
            }
        }
    }

    getRandomSpotlights();

    // 4. Join Page
    const timestampInput = document.getElementById('formLoadTimestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();

        // Modal
        const openButtons = document.querySelectorAll('.modal-open');
        const closeButtons = document.querySelectorAll('.modal-close');

        openButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.dataset.modal;
                const modal = document.getElementById(modalId);
                if (modal) modal.showModal();
            });
        });

        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                if (modal) modal.close();
            });
        });
    }

    // 5. Thank You Page
    const summarySection = document.querySelector('.summary');
    if (summarySection) {
        const params = new URLSearchParams(window.location.search);

        const firstName = params.get('fname') || "";
        const lastName = params.get('lname') || "";
        const email = params.get('email') || "";
        const phone = params.get('phone') || "";
        const org = params.get('org') || "";
        const level = params.get('level') || "";
        const timestamp = params.get('timestamp') || "";

        document.getElementById('fullName').textContent = `${firstName} ${lastName}`;
        document.getElementById('email').textContent = email;
        document.getElementById('phone').textContent = phone;
        document.getElementById('org').textContent = org;
        document.getElementById('level').textContent = level;

        document.getElementById('timestamp').textContent =
            timestamp ? new Date(timestamp).toLocaleString() : "N/A";
    }

});
