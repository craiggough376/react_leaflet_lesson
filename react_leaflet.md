# React-Leaflet

## Learning Objectives
 - Learn how to use Leaflet with React
 - Create a simple application displaying coordinates on a map

## Introduction
Leaflet JS is a popular, open source JavaScript library for making interactive maps. https://leafletjs.com/ 
React Leaflet is a library providing a wrapper around leaflet, creating more familiar syntaxes and abstractions, helping react developers integrate leaflet a bit more easily into their applications. 
https://react-leaflet.js.org/
In this lesson we will use React Leaflet to show a map in the browser and be able to add a few things to it, such as different tile layers and markers, as well as a few effects.

### Setup

Let's set up our application.

> give out leaflet_start and npm install

Our application just has a single component which holds onto a list of Munro objects which we will use the latitude and longitudes for and plot onto our map.

First, install both leaflet and react-leaflet. React leaflet cant work without Leaflet.js as it is more of an add-on.

```bash
npm install leaflet react-leaflet
```

Once thats installed, we need to add a few things in order to see the map.
We will add a link into our index.html head tag so router can find the appropriate CSS. You will know this hasnt worked because your map tiles will be jumbled up.

```html
  <!-- public/index.html -->

   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin="" />
```

We also need to define the initial size of the map container. Lets target the class that leaflet will give our map component automatically.

```css
  /* src/App.css */

  .leaflet-container{
  width: 100vw;
  height: 100vh;
}
```
Then finally, we will change our package.json to avoid a future compilation error which occurs due to a conflict with the way create-react-app bundles the files.

Change your browserlist object from this: 

```json
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
```

to a browserlist array like this: 

```json
  "browserslist": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ]
  ```

Were now ready to use leaflet and see a map in our application.

### Rendering a Map

Lets create a MapBox component

```bash
mkdir src/components
touch src/components/MapBox.js
```

Fill out the MapBox component with the following example that can be found on react-leaflets website.
```js
// MapBox.js
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const MapBox = () => {

return(
  <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
    <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[51.505, -0.09]}>
        <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
    </Marker>
  </MapContainer>
)

export default MapBox;
```

Remember to render your MapBox component in App.js

```js
// App.js
import MapBox from './components/MapBox.js'

 return (
    <div className="App">
      <MapBox /> 
    </div>
  );
```

You should now be able to see the map rendering to the page with the coordinates centered on London and an example marker and Popup. 

### Rendering Markers and Popups

Lets now render our own markers, showing a marker for each munro from the API. Each munro object in state has coordinates for the latitude and longitude. We can use these to create a new array of markers that the map can render. 

First, make sure you are now passing the munros from state, down into our MapBox component.

```js
// App.js

    <div className="App">
      <MapBox munros={munros}/> //added
    </div>
```
And that we are destructuring the prop in map box: 

```js
// MapBox.js
const MapBox = ({munros}) => {
```

Lets start by centering our map by default onto Scotland by adding differenct center coordiantes and set the zoom. We will also allow the map to have a scrollable zoom:

```js
<MapContainer center={[56.8169, -4.1826]} zoom={7} scrollWheelZoom={true}>
```

We Can now use our munro array passed down as props, to make a single marker for each munro. 

```js
const MapBox = ({munros}) => {

    const munroMarkers = munros.map((munro, index) => {
        return (
            <Marker key={index} position={[munro.latlng_lat, munro.latlng_lng]}>
                <Popup>
                    <h3>{munro.name}</h3>
                    <h4>Height: {munro.height} meters</h4>
                    <p>Meaning: {munro.meaning}</p>
                </Popup>
            </Marker>
        )
    })

    return(
```
This will create a marker, and when clicked on, can show more details about the munro through a popup.
Last thing is to render these markers onto our map.

```js
<MapContainer center={[56.8169, -4.1826]} zoom={7} scrollWheelZoom={true}>
    <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {munroMarkers}
</MapContainer>
```

Now we should have rendered our map with react-leaflet and be able to show data through markers and popups. 


### Changing the center













