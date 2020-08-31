import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import './styles.css'

const locations = [
  {
    name: "Banco de sangue Paulista",
    about: "Este é o banco de sangue paulista",
    lat: -23.65569,
    long: -46.705491,
  },
  {
    name: "Parque Ibirapuera",
    about: "Este é o parque ibirapuera",
    lat: -23.58326,
    long: -46.664434,
  },
  {
    name: "Sala São Paulo",
    about: "Este é a sala são paulo",
    lat: -23.533978,
    long: -46.639758,
  },
  {
    name: "Masp",
    about: "Este é o museu do masp",
    lat: -23.561198,
    long: -46.655893,
  },
  {
    name: "Teatro Alfa",
    about: "Este é o teatro alfa",
    lat: -23.651041,
    long: -46.721002,
  },
  {
    name: "Senai Ary Torres",
    about: "Este é o senai ary torres",
    lat: -23.651983,
    long: -46.712676,
  },
];

function App() {

  const [isLocation, setLocation] = useState(null)
  const [initialPosition, setInitialPosition] = useState([0, 0]);

  // Pegando localização do usuário
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude])
    })
  }, [])

  return (
    <>
      <Map center={initialPosition} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((item) => (
          <Marker
            key={item.index}
            position={[item.lat, item.long]}
            onclick={() => setLocation(item)}
          />
        ))}

        {isLocation && (
          <Popup
            position={[isLocation.lat, isLocation.long]}
            onClose={() => setLocation(null)}
          >
            <div>
              <h3>{isLocation.name}</h3>
              <p>{isLocation.about}</p>
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
}

export default App;
