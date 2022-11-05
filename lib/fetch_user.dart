import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class GetImage extends StatelessWidget {
  const GetImage({super.key, required this.documentId});
  final String documentId;
  // const GetImage({required this.documentId});

  @override
  Widget build(BuildContext context) {
    CollectionReference vlt = FirebaseFirestore.instance.collection('Vault');

    return FutureBuilder<DocumentSnapshot>(
        future: vlt.doc(documentId).get(),
        builder: ((context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            Map<String, dynamic> data =
                snapshot.data!.data() as Map<String, dynamic>;
            return Image.network('${data["image"]}');
          }
          return Text('data');
        }));
  }
}
