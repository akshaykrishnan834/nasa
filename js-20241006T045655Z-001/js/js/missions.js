const apiKey = 'I3yzFpoC8kVEsjuKoYyhpm7c2QiVJcokk48gsfkP'; // Replace with your API key
const endpoint = `https://api.leonardo.ai/v1/mars-photos?api_key=${apiKey}`;

fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        const missionsList = document.getElementById('missions-list');
        missionsList.innerHTML = ''; // Clear loading message
        
        data.photos.forEach(photo => {
            const missionItem = document.createElement('div');
            missionItem.innerHTML = `
                <h3>${photo.rover.name}</h3>
                <img src="${photo.img_src}" alt="Mars photo" />
                <p>Earth Date: ${photo.earth_date}</p>
            `;
            missionsList.appendChild(missionItem);
        });
    })
    .catch(error => {
        console.error('Error fetching mission data:', error);
        document.getElementById('missions-list').innerHTML = '<p>Error loading data.</p>';
    });
