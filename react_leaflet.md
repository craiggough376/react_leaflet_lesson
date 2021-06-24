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

Lets create a MapBox component

```bash
mkdir src/components
touch src/components/MapBox.js
```

Fill out the MapBox component with the following example that can be found on react-leaflets website.
```js
// MapBox.js

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

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
```

Remember to render your MapBox component in App.js

```js
// App.js
import MapBox from './components/MapBox.js'

 return (
    <div className="App">
      <MapBox munros={munros} /> 
    </div>
  );
```

You should now be able to see the map rendering to the page with the coordinates centered on London and an example marker and Popup. 










