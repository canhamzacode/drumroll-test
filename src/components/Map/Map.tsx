import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

const Map = () => {
  const companyLocation: LatLngExpression = [5.349472, 5.341936];

  return (
    <div className="h-[530px] w-full bg-gray-200 relative rounded-md overflow-hidden">
      <MapContainer
        center={companyLocation}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={companyLocation}>
          <Popup>
            Company Location: <br /> 5, Forcados Street, Apapa, Lagos
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
