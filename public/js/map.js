mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12', // Use a valid style URL
  center: listing.geometry.coordinates, // Starting position [lng, lat]
  zoom: 8 // Starting zoom level
});

const marker = new mapboxgl.Marker({color:"red"})
.setLngLat(listing.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset:25}).setHTML(
  `<h4>${listing.title}</h4><p> Exact Location provided after booking <p>`
))
.addTo(map);