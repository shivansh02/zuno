import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class FireStoreDb {
  List studentsList = [];
  final CollectionReference collectionRef =
      FirebaseFirestore.instance.collection("prescriptions");

  Future getData() async {
    try {
      await collectionRef.get().then((querySnapshot) {
        for (var result in querySnapshot.docs) {
          studentsList.add(result.data());
        }
      });

      return studentsList;
    } catch (e) {
      debugPrint("Error - $e");
      return e;
    }
  }
}
