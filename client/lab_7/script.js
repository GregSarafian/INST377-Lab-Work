async function windowActions() {
  endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpoint);
  const restaurants = await request.json();

  const cities = [];

  // Leaflet Map Itself
  const mymap = L.map('mapid').setView([38.989, -76.93], 11.5);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={AccessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    AccessToken: 'pk.eyJ1IjoiYXNoYWZpcTEiLCJhIjoiY2t1d3h4bjg4NTVtczMxdDR1cTJiMmFueiJ9.5QibvrZ20I5fcUUkKoRw9A'
  }).addTo(mymap);

  fetch(endPoint)
    .then((blob) => blob.json())
    .then((data) => cities.push(...data));

  function findMatches(matchingQuery, cities) {
    return cities.filter((location) => {
      const regex = new RegExp(matchingQuery, 'gi');

      return (location.zip.match(regex));
    });
  }

  // Marker Removal
  function removeMarkers(mymap) {
    mymap.eachLayer(function(layer) {
      if (Object.keys(layer.options).length === 0) {
        console.log(layer);
        mymap.removeLayer(layer);
      }
    })
  }

  function displayMatches(event) {
    const arraySync = findMatches(event.target.value, cities, mymap);
    const myVal = arraySync.slice(0,5);
    removeMarkers(mymap);
    myVal.forEach((location) => {
      const point = location.geocoded_column_1;
      if (!point || !point.coordinates) {
        console.log(location);
        return;
    }
    const latlong = point.coordinates;
    const marker = latlong.reverse();
    L.marker(marker).addTo(mymap);
    });

    const output = myVal.map((location) => {
        return `
          <div class="result">
            <div class="name"><b>${location.name}</b></div>
            <div class="category">${location.category}</div>
            <br>
            <em>
              <div class="address">${location.address_line_1}</div>
              <div class="city">${location.city}</div>
              <div class="zip">${location.zip}</div>
            </em>
          </div>
      `; 
}).join("");

    results.innerHTML = output;
  }

  const findQuery = document.querySelector(".search");
  const results = document.querySelector(".results");

  findQuery.addEventListener("change", displayMatches);
  findQuery.addEventListener("keyup", (evt) => {
    if (!evt.target.value) {
      document.querySelector('.suggestions').innerHTML = '';
      removeMarkers(mymap);
    } else {
      displayMatches(evt);
    }
  });
}

window.onload = dataHandler;