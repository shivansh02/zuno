// ignore_for_file: prefer_const_constructors

import 'package:testing/main.dart';

import 'data_class.dart';
import 'package:flutter/material.dart';
import 'package:draggable_home/draggable_home.dart';

const purple = Color.fromRGBO(122, 135, 251, 1);
const lightBlue = Color.fromRGBO(220, 231, 253, 1);
const yellow = Color.fromRGBO(240, 187, 82, 1);
const lightYellow = Color.fromRGBO(254, 229, 178, 1);

class PrescriptionApp extends StatelessWidget {
  const PrescriptionApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => MaterialApp(
        debugShowCheckedModeBanner: false,
        title: "Prescriptions",
        theme: ThemeData(
          fontFamily: 'Poppins',
        ),
        home: const Prescription(),
      );
}

class Prescription extends StatefulWidget {
  const Prescription({super.key});

  @override
  State<Prescription> createState() => _PrescriptionState();
}

class _PrescriptionState extends State<Prescription> {
  List dataList = [];

  @override
  Widget build(BuildContext context) {
    return DraggableHome(
      leading: IconButton(
        icon: Icon(Icons.arrow_back_ios),
        onPressed: () => {
          Navigator.push(context, MaterialPageRoute(builder: (_) => MyApp())),
        },
      ),
      title: const Text(
        "Prescriptions",
        style: TextStyle(fontWeight: FontWeight.bold),
      ),
      actions: [
        IconButton(
            onPressed: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (_) => PrescriptionApp()));
            },
            icon: const Icon(Icons.refresh)),
      ],
      headerWidget: headerWidget(context),
      headerBottomBar: headerBottomBarWidget(),
      body: [getAllData()],
      backgroundColor: Colors.white,
      appBarColor: yellow,
    );
  }

  Row headerBottomBarWidget() {
    return Row(
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: MainAxisAlignment.end,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        IconButton(
          onPressed: () => {
            Navigator.push(
                context, MaterialPageRoute(builder: (_) => PrescriptionApp())),

            // Navigator.pushAndRemoveUntil(
            //     context,
            //     MaterialPageRoute(
            //         builder: (context) =>
            //             const HomePage()), // this mainpage is your page to refresh
            //     (Route<dynamic> route) => false)
          },
          icon: const Icon(Icons.refresh),
          color: Colors.white,
        ),
      ],
    );
  }

  Widget headerWidget(BuildContext context) {
    return Container(
      color: yellow,
      child: Center(
        child: Text(
          "Prescriptions",
          style: Theme.of(context)
              .textTheme
              .headline2!
              .copyWith(color: Colors.white, fontSize: 40),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }

  FutureBuilder getAllData() {
    return FutureBuilder(
      future: FireStoreDb().getData(),
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return const Text(
            "Something went wrong",
          );
        }
        if (snapshot.connectionState == ConnectionState.done) {
          dataList = snapshot.data as List;
          return listView(dataList);
        }
        return const Center(
            child: CircularProgressIndicator(
          color: yellow,
        ));
      },
    );
  }

  ListView listView(dataList) => ListView.builder(
        padding: const EdgeInsets.only(top: 0, right: 10, left: 10),
        physics: const NeverScrollableScrollPhysics(),
        itemCount: dataList.length,
        shrinkWrap: true,
        itemBuilder: (context, index) => Card(
          margin: EdgeInsets.all(10),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(30.0),
          ),
          color: lightYellow,
          child: ListTile(
            contentPadding: const EdgeInsets.all(20),
            leading: const CircleAvatar(
              maxRadius: 30,
              backgroundColor: yellow,
              child: Icon(
                Icons.medication_liquid,
                color: Colors.white,
              ),
            ),
            title: Text(
              dataList[index]["name"],
              style: const TextStyle(
                  color: Colors.white,
                  height: 1.5,
                  fontWeight: FontWeight.bold),
            ),
            subtitle: Text(
              dataList[index]["relationship"],
              style: const TextStyle(color: Colors.white),
            ),
            trailing: const Icon(Icons.dark_mode, color: Colors.white),
          ),
        ),
      );
}
