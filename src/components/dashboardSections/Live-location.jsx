import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  Tooltip,
} from "react-leaflet";
import { Icon } from "leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";

import { initializeApp } from "firebase/app";
import { IconSunset } from "@tabler/icons";

import {
  getFirestore,
  collection,
  getDoc,
  DocumentSnapshot,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { Image } from "@mantine/core";
import { iconPerson } from "../../assets/markerIcon";

// const firebaseConfig = {
//   apiKey: "AIzaSyDkLcHE2h3BoYN5h_vtL_OCusf0zYcQ_RY",
//   authDomain: "alzei-5b85e.firebaseapp.com",
//   databaseURL: "https://alzei-5b85e-default-rtdb.firebaseio.com",
//   projectId: "alzei-5b85e",
//   storageBucket: "alzei-5b85e.appspot.com",
//   messagingSenderId: "859812211840",
//   appId: "1:859812211840:web:b502bf844f768067ce8a65",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBURkT8NXBIUV5iqXWSGyuV12KgEpFuvFM",
  authDomain: "hacky-e0462.firebaseapp.com",
  projectId: "hacky-e0462",
  storageBucket: "hacky-e0462.appspot.com",
  messagingSenderId: "205609134912",
  appId: "1:205609134912:web:31c5cfa1d3bfbd129b68a5",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const LiveLocation = (props) => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 28.5247691,
    longitude: 77.5731302,
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "location", "user1"), (doc) => {
      const location = doc.data();
      console.log(location);

      const locationObject = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      console.log("location", location);
      setCurrentLocation(locationObject);
      console.log("currrent location", currentLocation);
    });
  }, []);
  return (
    <>
      {currentLocation && (
        <MapContainer
          center={[currentLocation.latitude, currentLocation.longitude]}
          zoom={12}
          scrollWheelZoom={false}
          className="w-full h-2/3 rounded-3xl"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ReactLeafletDriftMarker
            // if position changes, marker will drift its way to new position
            position={[currentLocation.latitude, currentLocation.longitude]}
            // time in ms that marker will take to reach its destination
            duration={1000}
          >
            <Popup>Ramanda</Popup>
          </ReactLeafletDriftMarker>
        </MapContainer>
      )}
    </>
  );
};

export default LiveLocation;
