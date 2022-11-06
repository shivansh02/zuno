import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  DocumentSnapshot,
  doc,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { Title, Loader } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import ShowPrescriptions from "./showPrescriptions";
import AddPrescription from "./Add-Prescription";

// Firebase fetching
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
export const PrescriptionContext = React.createContext();

const UpdatePrescription = () => {
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPrescription, setCurrentPrescription] = useState({
    name: "",
    disease: "",
    dosage: {
      morning: 0,
      afternoon: 0,
      night: 0,
    },
    tenure: "",
  });

  const value = { currentPrescription, setCurrentPrescription };

  const notify = () => toast("✅Prescription Added!");
  const notify2 = () => toast("👍Prescription Updated!");

  const updateAPrescription = async (values, docID) => {
    const docRef = doc(db, "prescriptions", `${docID}`);
    await updateDoc(docRef, {
      name: values.name,
      disease: values.disease,
      tenure: values.tenure,
      dosage: {
        morning: values.dosage.morning,
        afternoon: values.dosage.afternoon,
        night: values.dosage.night,
      },
    });
    notify2();
  };

  const fillUpdateFields = (values) => {
    setCurrentPrescription(values);
  };

  const addPrescription = async (values) => {
    const docRef = await addDoc(collection(db, "prescriptions"), {
      name: values.name,
      disease: values.disease,
      tenure: values.tenure,
      dosage: {
        morning: values.dosage.morning,
        afternoon: values.dosage.afternoon,
        night: values.dosage.night,
      },
    });
    const newPrescription = {
      name: values.name,
      disease: values.disease,
      tenure: values.tenure,
      dosage: {
        morning: values.dosage.morning,
        afternoon: values.dosage.afternoon,
        night: values.dosage.night,
        id: docRef.id,
      },
    };
    console.log(values);
    console.log("Document written with ID: ", docRef.id);
    setPrescriptionData((oldArray) => [newPrescription, ...oldArray]);
    notify();
  };

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "prescriptions"));

      querySnapshot.forEach((doc) => {
        let singlePrescription = doc.data();
        singlePrescription = { ...singlePrescription, id: doc.id };
        console.log("prescriptionData", singlePrescription);
        setPrescriptionData((oldArray) => [...oldArray, singlePrescription]);
      });
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <PrescriptionContext.Provider value={value}>
        <div className="px-7 font-poppins flex flex-col w-full">
          {/* Reminder Window */}
          <ToastContainer />
          <Title className="mb-16 mt-8">Prescriptions</Title>

          {loading ? (
            <Loader color="orange" className="self-center" />
          ) : (
            <ShowPrescriptions
              prescriptionData={prescriptionData}
              fillUpdateFields={fillUpdateFields}
            />
          )}
          <div className="mt-12">
            <Title className="mb-12">Add New Prescription</Title>

            <AddPrescription
              addPrescription={addPrescription}
              updatePrescription={updateAPrescription}
            />
          </div>
        </div>
      </PrescriptionContext.Provider>
    </>
  );
};

export default UpdatePrescription;
