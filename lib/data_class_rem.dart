import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class FireStoreDbRem {
  List remList = [];
  final CollectionReference collectionRef =
      FirebaseFirestore.instance.collection("reminders");

  Future getData() async {
    try {
      await collectionRef.get().then((querySnapshot) {
        for (var result in querySnapshot.docs) {
          remList.add(result.data());
        }
      });

      return remList;
    } catch (e) {
      debugPrint("Error - $e");
      return e;
    }
  }
}
