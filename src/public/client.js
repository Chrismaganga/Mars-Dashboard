// const { Map } = Immutable;

let store = {
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    roverPhotos: [],
    roverManifest: {},
    marsWeather: {},
    neo: {}
};

const root = document.getElementById('root');

const updateStore = (store, newState) => {
    store = Object.assign(store, newState);
    render(root, store);
};

const render = async (root, state) => {
    root.innerHTML = App(state);
};

// Main App Component
const App = (state) => {
    let { rovers, apod, roverPhotos, marsWeather, neo } = state;

    return `
        <header>
            <h1>Welcome to NASA Explorer!</h1>
        </header>
        <main>
            ${Greeting(state.user.name)}
            <section>
                <h2>Astronomy Picture of the Day</h2>
                ${ImageOfTheDay(apod)}
            </section>
            <section>
                <h2>Mars Rover Photos</h2>
                ${RoverSelector(rovers)}
                ${RoverPhotos(roverPhotos)}
            </section>
            <section>
                <h2>Mars Weather</h2>
                ${MarsWeather(marsWeather)}
            </section>
            <section>
                <h2>Near Earth Objects</h2>
                ${NeoInfo(neo)}
            </section>
        </main>
        <footer>
            <p>Powered by NASA APIs</p>
        </footer>
    `;
};

// Components
const Greeting = (name) => `<h3>Hello, ${name}!</h3>`;

const ImageOfTheDay = (apod) => {
    if (!apod) {
        getImageOfTheDay();
        return `<p>Loading...</p>`;
    }
    return apod.media_type === 'video'
        ? `<p>See today's featured video <a href="${apod.url}" target="_blank">here</a></p><p>${apod.title}</p><p>${apod.explanation}</p>`
        : `<img src="${apod.url}" alt="${apod.title}" /><p>${apod.title}</p><p>${apod.explanation}</p>`;
};

const RoverSelector = (rovers) => `
    <select id="rover-select">
        ${rovers.map(rover => `<option value="${rover.toLowerCase()}">${rover}</option>`).join('')}
    </select>
    <button onclick="fetchRoverPhotos()">View Photos</button>
`;

const RoverPhotos = (photos) => photos.length > 0
    ? photos.map(photo => `<img src="${photo.img_src}" alt="Mars Rover Photo" width="200" />`).join('')
    : `<p>No photos available. Select a rover and click "View Photos".</p>`;

const MarsWeather = (weather) => weather?.sol_keys
    ? weather.sol_keys.map(sol => `
        <div>
            <h4>Sol ${sol}</h4>
            <p>Average Temp: ${weather[sol].AT.av}°C</p>
        </div>
    `).join('')
    : `<p>Loading Mars weather...</p>`;

const NeoInfo = (neo) => neo?.near_earth_objects
    ? Object.values(neo.near_earth_objects).flat().map(obj => `
        <div>
            <p>Name: ${obj.name}</p>
            <p>Hazardous: ${obj.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
            <p>Close Approach Date: ${obj.close_approach_data[0]?.close_approach_date}</p>
        </div>
    `).join('')
    : `<p>Loading Near Earth Objects data...</p>`;

// API Calls
const getImageOfTheDay = () => {
    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(data => updateStore(store, { apod: data.image }));
};

const fetchRoverPhotos = () => {
    const rover = document.getElementById('rover-select').value;
    fetch(`http://localhost:3000/mars-photos/${rover}`)
        .then(res => res.json())
        .then(data => updateStore(store, { roverPhotos: data.photos }));
};

const getMarsWeather = () => {
    fetch(`http://localhost:3000/mars-weather`)
        .then(res => res.json())
        .then(data => updateStore(store, { marsWeather: data.weather }));
};

const getNeoData = () => {
    fetch(`http://localhost:3000/neo`)
        .then(res => res.json())
        .then(data => updateStore(store, { neo: data.near_earth_objects }));
};

// Initialize App
window.addEventListener('load', () => {
    getImageOfTheDay();
    getMarsWeather();
    getNeoData();
    render(root, store);
});


// const updateStoreImmutable = (store, newState) => {
//     store = Map(store).merge(newState).toJS();
//     render(root, store);
// };


