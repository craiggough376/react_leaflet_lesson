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
    <MapCentre center={coordinates} zoom={5}/>
    {munroMarkers}
</MapContainer>
```

Now we should have rendered our map with react-leaflet and be able to show data through markers and popups. 


### Changing the center

Lets say that we now want the map to center and zoom in on a munro that we click on.
We need to make a component that can consume the context of the map container. 

```bash
touch src/components/MapCentre.js 
```
In this file we will create a function to change both the center point and the zoom. In order to trigger a rerender of the Map and for the changes to be seen, we will hold onto the zoom and center in state with a default object holding onto the initial values.

```js
//MapBox.js
import React, { useState } from 'react' //added
import { MapCenter } from './MapCenter'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const MapBox = ({munros}) => {

    const [center, setCenter] = useState({ //added
        coordinates: [56.8169, -4.1826],
        zoom: 7
         }   
        )

```

To get the coordiantes of the current monro, we will add an event handler to listen out for click events on our marker. 

```js
//MapBox.js
 const munroMarkers = munros.map((munro, index) => {
        return (
            <Marker key={index} position={[munro.latlng_lat, munro.latlng_lng]}  eventHandlers={{ //added
                click: () => handleMarkerClick(munro),
              }}>
```

We will now create the callback which has is triggered on the marker click.

```js
    const handleMarkerClick = (munro) => {
        console.log(munro)
    }
```

We should now see the details about the monro we have created in our chrome console.
Lets add its details now to state. 

```js
    const handleMarkerClick = (munro) => {
        setCenter({
            coordinates: [munro.latlng_lat, munro.latlng_lng],
        zoom: 13
        })
    }
```

Now our state has updated, we will trigger a rerender and pass the new center and zoom into our MapCenter.js component.

```js
//MapBox.jsx
import { MapCenter } from './MapCenter' //added

...

<MapContainer center={center.coordinates} zoom={center.zoom} scrollWheelZoom={true}>

          ...

            <MapCenter center={center.coordinates} zoom={center.zoom}/> //added
            {munroMarkers}
            </MapContainer>

```

Now lets create the MapCenter function to carry out a little fly animation to go to the clicked on munro.

We will need to import the useMap hook from react-leaflet to get access to the map and its functionality. We will then use the flyTo method which takes in the arguments of the coordiantes and the zoom. 

```js
//MapCenter.js
import { useMap } from 'react-leaflet'
export const MapCenter = ({center, zoom}) => {
    const map = useMap()
    map.flyTo([center[0], center[1]],zoom)
    return null
}

```
We have now used react-leaflet to create a map, render it with coordiantes from an API and can interact with it through clicks to change the center focus of the map.











