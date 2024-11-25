// const store = {
//     user: { name: "Student" },
//     apod: null,
//     rovers: ["Curiosity", "Opportunity", "Spirit"],
//     roverData: null,
//     weather: null,
//     photos: null,
// };

// // Root element
// const root = document.getElementById("root");

// // Updates the store and re-renders the UI
// const updateStore = (store, newState) => {
//     Object.assign(store, newState);
//     render(root, store);
// };

// // Renders the application
// const render = (root, state) => {
//     root.innerHTML = App(state);
// };

// // Application component
// const App = (state) => {
//     const { rovers, apod, roverData, weather, photos } = state;

//     return `
//         <header>
//             <h1>NASA Rover Exploration</h1>
//         </header>
//         <main>
//             ${Greeting(state.user.name)}
//             <section>
//                 <h3>Rover Information</h3>
//                 ${RoverInfo(roverData)}
//                 <div class="button-group">
//                     ${rovers
//                         .map(
//                             (rover) =>
//                                 `<button onclick="getRoverInfo('${rover}')">${rover}</button>`
//                         )
//                         .join("")}
//                 </div>
//             </section>
//             <section>
//                 <h3>Current Mars Weather</h3>
//                 ${MarsWeather(weather)}
//                 <button onclick="getMarsWeather()">Fetch Mars Weather</button>
//             </section>
//             <section>
//                 <h3>Mars Photos</h3>
//                 <div class="photos">
//                     ${
//                         photos
//                             ? photos
//                                   .map(
//                                       (photo) =>
//                                           `<img src="${photo.img_src}" alt="Mars Photo" />`
//                                   )
//                                   .join("")
//                             : "<p>No photos available</p>"
//                     }
//                 </div>
//                 <div class="button-group">
//                     ${rovers
//                         .map(
//                             (rover) =>
//                                 `<button onclick="getMarsPhotos('${rover}')">Load ${rover} Photos</button>`
//                         )
//                         .join("")}
//                 </div>
//             </section>
//             <section>
//                 <h3>Astronomy Picture of the Day</h3>
//                 ${ImageOfTheDay(apod)}
//             </section>
//         </main>
//         <footer>
//             <p>NASA Rover Exploration App © 2024</p>
//         </footer>
//     `;
// };

// // Event listener for initial load
// window.addEventListener("load", () => {
//     render(root, store);
// });

// // UI Components
// const Greeting = (name) =>
//     `<h2>${name ? `Welcome, ${name}!` : "Hello!"}</h2>`;

// const RoverInfo = (roverData) => {
//     if (!roverData) return "<p>Loading rover data...</p>";

//     return `
//         <div>
//             <h4>${roverData.name}</h4>
//             <p>Launch Date: ${roverData.launch_date}</p>
//             <p>Landing Date: ${roverData.landing_date}</p>
//             <p>Status: ${roverData.status}</p>
//         </div>
//     `;
// };

// const MarsWeather = (weather) => {
//     if (!weather) return "<p>Loading Mars weather...</p>";

//     return `
//         <div>
//             <p>Sol: ${weather.sol}</p>
//             <p>Temperature: ${weather.temp}°C</p>
//             <p>Wind Speed: ${weather.wind_speed} m/s</p>
//         </div>
//     `;
// };

// const ImageOfTheDay = (apod) => {
//     if (!apod) {
//         getImageOfTheDay();
//         return "<p>Loading APOD...</p>";
//     }

//     return apod.media_type === "video"
//         ? `
//             <p>See today's featured video <a href="${apod.url}" target="_blank">here</a></p>
//             <p>${apod.title}</p>
//             <p>${apod.explanation}</p>
//         `
//         : `
//             <img src="${apod.url}" alt="Astronomy Picture of the Day" />
//             <p>${apod.explanation}</p>
//         `;
// };

// // API Call Functions
// const fetchData = async (url, callback, errorMsg) => {
//     try {
//         const response = await fetch(url);
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         const data = await response.json();
//         callback(data);
//     } catch (error) {
//         console.error(`${errorMsg}:`, error);
//     }
// };

// const getImageOfTheDay = () =>
//     fetchData(
//         "http://localhost:3000/apod",
//         (apod) => updateStore(store, { apod }),
//         "Error fetching APOD"
//     );

// const getRoverInfo = (rover) =>
//     fetchData(
//         `http://localhost:3000/rover/${rover}`,
//         (roverData) => updateStore(store, { roverData, photos: null }),
//         "Error fetching rover data"
//     );

// const getMarsWeather = () =>
//     fetchData(
//         "http://localhost:3000/mars-weather",
//         (weather) => updateStore(store, { weather }),
//         "Error fetching Mars weather"
//     );

// const getMarsPhotos = (rover) =>
//     fetchData(
//         `http://localhost:3000/mars-photos/${rover}`,
//         (photos) => updateStore(store, { photos }),
//         "Error fetching Mars photos"
//     );
let store = {
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    let { rovers, apod } = state

    return `
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                ${ImageOfTheDay(apod)}
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    return data
}
const getRoverInfo = (rover) =>
        fetchData(
            `http://localhost:3000/rover/${rover}`,
            (roverData) => updateStore(store, { roverData, photos: null }),
            "Error fetching rover data"
        );
    
    const getMarsWeather = () =>
        fetchData(
            "http://localhost:3000/mars-weather",
            (weather) => updateStore(store, { weather }),
            "Error fetching Mars weather"
        );
    
    const getMarsPhotos = (rover) =>
        fetchData(
            `http://localhost:3000/mars-photos/${rover}`,
            (photos) => updateStore(store, { photos }),
            "Error fetching Mars photos"
        );