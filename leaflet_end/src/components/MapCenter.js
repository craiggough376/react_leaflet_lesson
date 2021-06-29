import { useMapEvent } from 'react-leaflet'
export const MapCenter = () => {
    const map = useMapEvent('click', (event) => {
        console.log(event)
        const {lat, lng} = event.latlng
        map.flyTo([lat, lng])
      })
      return null
}
