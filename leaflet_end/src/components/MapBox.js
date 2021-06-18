import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

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
        <>
            <MapContainer center={[56.8169, -4.1826]} zoom={7} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {munroMarkers}
            </MapContainer>
        </>
    )
}

export default MapBox;