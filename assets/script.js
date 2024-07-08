const apiKey = '6b9efb5cdad556136ff528d1bdc2bae5';
const forecastDiv = document.getElementById('forecast');
const recentSearchesDiv = document.getElementById('recent-searches');
const recentSearches = document.getElementsByClassName('recentSearch');
const form = document.getElementById('weather-form');

addEventListener('load', displayRecentSearches);
// recentSearches.addEventListener('click', handleRecentSearchesClick);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const cityInput = document.getElementById('city');
  const city = cityInput.value.trim();

  if (city) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&days=5`;

    fetch(forecastUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          displayForecast(data);
        } else {
          throw new Error('Error fetching forecast data.');
        }
      })
      .catch((error) => {
        console.error('Error fetching forecast data:', error);
        forecastDiv.textContent = 'Error fetching forecast data. Please try again.';
      });
  } else {
    forecastDiv.textContent = 'Please enter a city.';
  }
});

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const cityInput = document.getElementById('city');
    const city = cityInput.value.trim();
    if(city){
        cityInput.value = '';
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    recentSearches.push(city);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    displayRecentSearches();
    }

})

function displayRecentSearches(){
  const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
  const recentSearchesToDisplay = recentSearches.slice(-5);
  const recentSearchesHtml = recentSearchesToDisplay.map((city) => {
      const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
      return `<li><button class="recentSearch">${capitalizedCity}</button><li/>`;
  }).join('');
  recentSearchesDiv.innerHTML = recentSearchesHtml;
}

function handleRecentSearchesClick(event){
  if (event.target.matches('click')){
    const city = event.target.textContent.trim().toLowerCase();
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&days=5`;
    fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        displayForecast(data);
      } else {
        throw new Error('Error fetching forecast data.');
      }
    }) 
    .catch((error) => {
      console.error('Error fetching forecast data:', error);
      forecastDiv.textContent = 'Error fetching forecast data. Please try again.';
    });
    }}
    //trying to figure out how to get these buttons to work


function displayForecast(data) {
    const forecastHtml = data.list.slice(0, 6).map((day, index) => {
      if (index === 0) {
        return `<h2>${data.city.name} - Five Day Forecast</h2>`;
      }
  
      const date = new Date(day.dt * 1000);
      const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
      const temp = day.main.temp.toFixed(1);
      const fahrenheit = (temp * 9/5 + 32).toFixed(1);
      const description = day.weather[0].description;
  
      return `
        <div class="forecast-item">
          <h3>${dayOfWeek}</h3>
          <p>${fahrenheit}°F \\ ${temp}°C - ${description}</p>
        </div>
        `;
    }).join('');
  
    forecastDiv.innerHTML = forecastHtml;
  }





















//   form.addEventListener('submit', (event)=>{
//     event.preventDefault();
//     const cityInput = document.getElementById('city');
//     const city = cityInput.value.trim();
//     if(city){
//         cityInput.value = '';
//     let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
//     recentSearches.push(city);
//     localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
//     }

// })

// function displayForecast(data) {
//     const forecastHtml = data.list.slice(0, 5).map((day, index) => {
//         if (index === 0) {
//             return `<h2>${data.city.name} - 5-Day Forecast</h2>`;
//         }

//         const date = new Date(day.dt * 1000);
//         const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
//         const temp = day.main.temp.toFixed(1);
//         const precip = day.rain.3h.toFixed(1);
//         const fahrenheit = (temp * 9/5 + 32).toFixed(1);
//         const description = day.weather[0].description;

//       return `
//             <div class="forecast-item">
//             <h3>${dayOfWeek}</h3>
//             <p>${fahrenheit}°F / ${temp}°C - ${description}</p>
//             </div>
//             `;
//     }).join('');

//     forecastDiv.innerHTML = forecastHtml;
//     console.log(precip)
//   }
