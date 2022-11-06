import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Circle,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { Button, Title } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import { circle, Icon, map } from "leaflet";
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
  const notifyOutside = () => {
    toast.warn("Patient outside of safe space", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 28.7330199,
    longitude: 77.1188811,
  });

  let circleCenter = {
    lat: 28.7330199,
    lng: 77.1188811,
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "location", "user1"), (doc) => {
      const location = doc.data();

      const locationObject = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      setCurrentLocation(locationObject);
    });
    circleCenter = {
      lat: currentLocation.latitude,
      lng: currentLocation.longitude,
    };
  }, []);

  const circleRef = useRef();
  const markerRef = useRef();

  useEffect(() => {
    if (circleRef.current == undefined) {
      console.log("undefined");
    } else {
      console.log(circleRef.current._latlng);
      const circleCenter = circleRef.current._latlng;
      const markerPosition = markerRef.current._latlng;
      if (
        circleCenter.distanceTo(markerPosition) > circleRef.current._mRadius
      ) {
        notifyOutside();
      } else {
        console.log("inside circle");
      }
    }
  }, [currentLocation]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={false}
        limit={1}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
      ></ToastContainer>
      <Title className="mb-16 mt-8">Live Location</Title>
      {currentLocation && (
        <MapContainer
          center={[currentLocation.latitude, currentLocation.longitude]}
          zoom={18}
          scrollWheelZoom={false}
          className="w-full h-2/3 rounded-3xl"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ReactLeafletDriftMarker
            ref={markerRef}
            draggable
            position={[currentLocation.latitude, currentLocation.longitude]}
            duration={1000}
            keepAtCenter
          >
            <Popup>Popup</Popup>
          </ReactLeafletDriftMarker>
          <Circle
            ref={circleRef}
            center={{
              lat: circleCenter.lat,
              lng: circleCenter.lng,
            }}
            color="green"
            radius={20}
            fillOpacity={0.5}
          ></Circle>
        </MapContainer>
      )}
      {/* <Button
        onClick={() => {
          console.log(circleRef.current._latlng);
          const circleCenter = circleRef.current._latlng;
          const markerPosition = markerRef.current._latlng;
          if (
            circleCenter.distanceTo(markerPosition) > circleRef.current._mRadius
          ) {
            console.log("outside circle");
          } else {
            console.log("inside circle");
          }
        }}
      ></Button> */}
    </>
  );
};

export default LiveLocation;
