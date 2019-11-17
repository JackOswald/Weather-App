window.addEventListener('load', ()=> {
    let lat;
    let long;
    const weatherDesc = document.querySelector(".weather-description");
    const tempDegree = document.querySelector(".temperature-degree");
    const locationTimeZone = document.querySelector(".location");
    const tempSection = document.querySelector(".temperature-row");
    const tempSpan = document.querySelector(".temp-type");
    const dailyDesc = document.querySelector(".daily-summary");

    // Retrieve lat and long coords
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => { 
            console.log (position);
            lat = position.coords.latitude;
            long = position.coords.longitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/7e4b52da32d60e9a93215645f33d6cad/${lat},${long}`;
    
            fetch (api)
                .then (response => {
                    return response.json();
                })
                .then (data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;

                    weatherDesc.textContent = summary;
                    locationTimeZone.textContent = data.timezone;
                    dailyDesc.textContent = data.daily.summary;

                    // Set icon
                    setIcons (icon, document.querySelector(".icon"));

                    // Change temperature
                    changeTemp (temperature);
                });
            });
    } else {
        h1.querySelector("Please allow access to your current location");
    }

    function setIcons (icon, iconId) {
        const skycons = new Skycons ({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }

    function changeTemp (temperature) {
        let celcius = (temperature - 32) * (5 / 9);
        tempSection.addEventListener("click", () => {
        if (tempSpan.textContent == "°F") {
                tempSpan.textContent = "°C";
                //tempDegree.textContent = Math.floor(celcius);
                tempDegree.textContent = celcius.toFixed(1);
        } else {
            tempSpan.textContent = "°F";
            tempDegree.textContent = temperature;
            }
        })

        tempDegree.textContent = temperature;
    }
});