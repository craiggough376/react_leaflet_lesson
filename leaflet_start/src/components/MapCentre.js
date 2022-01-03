import { useMap } from 'react-leaflet'

const MapCentre = ({center, zoom}) => {
    const map = useMap()
    map.flyTo([center[0], center[1]],zoom)
  return null
}
export default MapCentre;