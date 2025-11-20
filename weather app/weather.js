async function getLocalWeather(lat, lon) {
  const apiKey = "fea813cd7acd1e292fb9110f239640e9"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("weatherResult").innerHTML = `
      <h2>${data.name}</h2>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>💧 Humidity: ${data.main.humidity} %</p>
      <p>📈 Pressure: ${data.main.pressure} hPa</p>
      <p>🌬️ Wind: ${data.wind.speed} m/s</p>
      <p>🕒 Updated: ${new Date(data.dt * 1000).toLocaleString()}</p>
    `;

    const radarURL = `https://www.rainviewer.com/map.html?loc=${lat},${lon},7&oFa=1&oC=1&oU=0&oCS=1&oF=0&oAP=0&c=3&o=83&lm=1&th=0&sm=1`;
    document.getElementById("radarFrame").src = radarURL;

  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>Error fetching weather data.</p>`;
  }
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => getLocalWeather(position.coords.latitude, position.coords.longitude),
    () => document.getElementById("weatherResult").innerHTML = `<p>Location access denied.</p>`
  );
} else {
  document.getElementById("weatherResult").innerHTML = `<p>Geolocation not supported.</p>`;
}