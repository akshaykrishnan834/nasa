const apiKey = 'I3yzFpoC8kVEsjuKoYyhpm7c2QiVJcokk48gsfkP'; // Replace with your API key
const endpoint = 'https://api.leonardo.ai/v1/exoplanets?api_key=${apiKey}';

fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        const planetsList = document.getElementById('planets-list');
        planetsList.innerHTML = ''; // Clear loading message
        
        data.forEach(planet => {
            const planetItem = document.createElement('div');
            planetItem.innerHTML = `
                <h3>${planet.name}</h3>
                <p>Mass: ${planet.mass} Earth Masses</p>
                <p>Distance: ${planet.distance} light years</p>
                <img src="${planet.image_url}" alt="${planet.name}" />
            `;
            planetsList.appendChild(planetItem);
        });
    })
    .catch(error => {
        console.error('Error fetching planet data:', error);
        document.getElementById('planets-list').innerHTML = '<p>Error loading data.</p>';
    });
