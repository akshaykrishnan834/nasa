// Example static data for stars
const stars = [
    { name: 'Sirius', type: 'Main Sequence', distance: '8.6 light years', image: 'https://starwalk.space/gallery/images/sirius-base/1920x1080.jpg' },
    { name: 'Betelgeuse', type: 'Red Supergiant', distance: '642 light years', image: 'https://starwalk.space/gallery/images/betelgeuse-base/1920x1080.jpg' }
];

const starsList = document.getElementById('stars-list');
starsList.innerHTML = ''; // Clear loading message

stars.forEach(star => {
    const starItem = document.createElement('div');
    starItem.innerHTML = `
        <h3>${star.name}</h3>
        <p>Type: ${star.type}</p>
        <p>Distance: ${star.distance}</p>
        <img src="${star.image}" alt="${star.name}" />
    `;
    starsList.appendChild(starItem);
});
