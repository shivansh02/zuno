import 'dart:async';

import 'package:flutter/material.dart';

import 'data_class_rem.dart';

import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:location/location.dart' as loc;
import 'package:permission_handler/permission_handler.dart';
import 'package:zuno/reminders.dart';
import 'vault.dart';
import 'people_you_know.dart';
import 'prescriptions.dart';
import 'game_main.dart';

const purple = Color.fromRGBO(122, 135, 251, 1);
const lightBlue = Color.fromRGBO(220, 231, 253, 1);
const yellow = Color.fromRGBO(240, 187, 82, 1);
const lightYellow = Color.fromRGBO(254, 229, 178, 1);

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MaterialApp(home: MyApp()));
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final loc.Location location = loc.Location();
  StreamSubscription<loc.LocationData>? _locationSubscription;

  @override
  void initState() {
    super.initState();
    _requestPermission();
    location.changeSettings(interval: 300, accuracy: loc.LocationAccuracy.high);
    location.enableBackgroundMode(enable: true);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Devs',
      theme: ThemeData(
        fontFamily: 'Poppins',
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const HomePage(),
    );
  }

  Future<void> _listenLocation() async {
    _locationSubscription = location.onLocationChanged.handleError((onError) {
      print(onError);
      _locationSubscription?.cancel();
      setState(() {
        _locationSubscription = null;
      });
    }).listen((loc.LocationData currentlocation) async {
      await FirebaseFirestore.instance.collection('location').doc('user1').set({
        'latitude': currentlocation.latitude,
        'longitude': currentlocation.longitude,
        'name': 'john'
      }, SetOptions(merge: true));
    });
  }

  _requestPermission() async {
    var status = await Permission.location.request();
    if (status.isGranted) {
      print('done');
    } else if (status.isDenied) {
      _requestPermission();
    } else if (status.isPermanentlyDenied) {
      openAppSettings();
    }
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final loc.Location location = loc.Location();
  StreamSubscription<loc.LocationData>? _locationSubscription;
  List dataList = [];

  @override
  void initState() {
    // getDocId();
    super.initState();
    _requestPermission();
    location.changeSettings(interval: 300, accuracy: loc.LocationAccuracy.high);
    location.enableBackgroundMode(enable: true);
  }

  Future<void> _listenLocation() async {
    _locationSubscription = location.onLocationChanged.handleError((onError) {
      print(onError);
      _locationSubscription?.cancel();
      setState(() {
        _locationSubscription = null;
      });
    }).listen((loc.LocationData currentlocation) async {
      await FirebaseFirestore.instance.collection('location').doc('user1').set({
        'latitude': currentlocation.latitude,
        'longitude': currentlocation.longitude,
        'name': 'john'
      }, SetOptions(merge: true));
    });
  }

  _requestPermission() async {
    var status = await Permission.location.request();
    if (status.isGranted) {
      print('done');
    } else if (status.isDenied) {
      _requestPermission();
    } else if (status.isPermanentlyDenied) {
      openAppSettings();
    }
  }

  FutureBuilder getAllData() {
    return FutureBuilder(
      future: FireStoreDbRem().getData(),
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
      itemCount: 3,
      shrinkWrap: true,
      itemBuilder: (context, index) => Card(
            margin: const EdgeInsets.all(10),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(30.0),
            ),
            color: dataList[index]["priority"] == "low"
                ? lightBlue
                : dataList[index]["priority"] == "high"
                    ? const Color(0xFFFEE0DF)
                    : lightYellow,
            child: ListTile(
              contentPadding: const EdgeInsets.all(20),
              title: Text(
                dataList[index]["title"],
                style: const TextStyle(
                    color: Colors.black87,
                    height: 1.5,
                    fontWeight: FontWeight.bold),
              ),
              subtitle: Text(
                dataList[index]["description"],
                style: const TextStyle(color: Colors.black54),
              ),
              trailing: Text(
                dataList[index]["time"],
                style: const TextStyle(
                    color: Colors.black87,
                    height: 1.5,
                    fontWeight: FontWeight.bold),
              ),
            ),
          ));

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      backgroundColor: (Colors.white),
      body: ListView(
        children: <Widget>[
          SafeArea(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.only(left: 24.0),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(20), // Image border
                    child: SizedBox.fromSize(
                      size: const Size.fromRadius(38), // Image radius
                      child: Image.asset('assets/pfp.png', fit: BoxFit.cover),
                    ),
                  ),
                ),
                InkWell(
                  child: Image.asset('assets/Group.png'),
                  highlightColor: Colors.transparent,
                  focusColor: Colors.transparent,
                  splashColor: Colors.transparent,
                  onTap: () {
                    _listenLocation();
                  },
                ),
              ],
            ),
          ),
          const SafeArea(
            child: Padding(
              padding: EdgeInsets.only(left: 24.0),
              child: Text(
                "Glad you're here,",
                style: TextStyle(
                  fontSize: 16.0,
                ),
              ),
            ),
          ),
          const SafeArea(
            child: Padding(
              padding: EdgeInsets.only(left: 24.0),
              child: Text(
                'Raman',
                style: TextStyle(fontWeight: FontWeight.w600, fontSize: 26.0),
              ),
            ),
          ),
          SafeArea(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const RemindersApp()),
                    );
                  },
                  child: Padding(
                    padding: const EdgeInsets.only(left: 24.0),
                    child: Container(
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(62.0),
                          color: const Color(0xFF7A87FB),
                          boxShadow: const [
                            BoxShadow(
                                color: Color.fromARGB(200, 122, 135, 251),
                                offset: Offset(4, 4),
                                spreadRadius: 5,
                                blurRadius: 20)
                          ]),
                      width: (screenWidth / 2.46),
                      height: (screenHeight / 5.34),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          Padding(
                            padding: EdgeInsets.only(top: 10),
                            child: Icon(
                              Icons.alarm,
                              size: 47.37,
                              color: Colors.white,
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.only(bottom: 0),
                          ),
                          Padding(
                            padding: EdgeInsets.only(top: 6.0),
                            child: Text(
                              "Reminders",
                              style: TextStyle(
                                  height: 1,
                                  color: Colors.white,
                                  fontSize: 16,
                                  fontWeight: FontWeight.w600),
                            ),
                          )
                        ],
                      ),
                    ),
                  ),
                ),
                InkWell(
                  onTap: () => {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (_) => const GameApp())),
                  },
                  child: Padding(
                    padding: const EdgeInsets.only(left: 16.0, right: 24.0),
                    child: Container(
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(62.0),
                          color: const Color(0xFF7A87FB),
                          boxShadow: const [
                            // BoxShadow(
                            //     color: Color(0xFF7A87FB),
                            //     spreadRadius: 3,
                            //     blurRadius: 11)
                          ]),
                      width: (screenWidth / 2.54),
                      height: (screenHeight / 4.3),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(top: 5, bottom: 10),
                            child: Center(
                              child: SizedBox(
                                height: 70,
                                child: Image.asset(
                                  'assets/Vector.png',
                                  color: Colors.white,
                                ),
                              ),
                            ),
                          ),
                          const Text(
                            "Brain Games",
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 16,
                                fontWeight: FontWeight.w600),
                          ),
                        ],
                      ),
                    ),
                  ),
                )
              ],
            ),
          ),
          SafeArea(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const vault()),
                    );
                  },
                  child: Padding(
                    padding: const EdgeInsets.only(left: 24.0),
                    child: Container(
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(62.0),
                          color: const Color(0xFF7A87FB),
                          boxShadow: const [
                            // BoxShadow(
                            //     color: Color(0xFF7A87FB),
                            //     spreadRadius: 3,
                            //     blurRadius: 11)
                          ]),
                      width: (screenWidth / 2.54),
                      height: (screenHeight / 4.33),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(top: 10, bottom: 10),
                            child: SizedBox(
                                height: 50,
                                child: Image.asset('assets/vault.png')),
                          ),
                          const Text(
                            "Your Vault",
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 16,
                                fontWeight: FontWeight.w600),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                Column(
                  children: <Widget>[
                    InkWell(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const DraggableApp()),
                        );
                      },
                      child: Padding(
                        padding: const EdgeInsets.only(top: 10.0, right: 24.0),
                        child: Container(
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(62.0),
                              color: const Color(0xFF7A87FB),
                              boxShadow: const []),
                          width: (screenWidth / 2.54),
                          height: (screenHeight / 8.83),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: const [
                              Center(
                                child: Padding(
                                  padding: EdgeInsets.only(
                                      top: 0, bottom: 0, left: 0),
                                  child: Icon(
                                    Icons.supervisor_account,
                                    size: 39.33,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                              Center(
                                child: Padding(
                                  padding: EdgeInsets.only(
                                      top: 0.0, bottom: 0, left: 4.0),
                                  child: Text(
                                    "    People\nYou Know",
                                    textAlign: TextAlign.left,
                                    style: TextStyle(
                                        height: 1.3,
                                        color: Colors.white,
                                        fontSize: 14,
                                        fontWeight: FontWeight.w600),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    InkWell(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const PrescriptionApp()),
                        );
                      },
                      child: Padding(
                        padding: const EdgeInsets.only(top: 9.0, right: 24.0),
                        child: Container(
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(62.0),
                              color: const Color(0xFFFEE5B2),
                              boxShadow: const [
                                BoxShadow(
                                    color: Color.fromARGB(200, 254, 229, 178),
                                    offset: Offset(4, 4),
                                    spreadRadius: 5,
                                    blurRadius: 20)
                              ]),
                          width: (screenWidth / 2.54),
                          height: (screenHeight / 10.6),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Padding(
                                padding:
                                    const EdgeInsets.only(top: 0, bottom: 0),
                                child: SizedBox(
                                    height: 35,
                                    child: Image.asset('assets/pills.png')),
                              ),
                              const Text(
                                "Meds",
                                style: TextStyle(
                                    color: Colors.black87,
                                    fontSize: 16,
                                    fontWeight: FontWeight.w600),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                )
              ],
            ),
          ),
          const SafeArea(
            child: Padding(
              padding: EdgeInsets.only(top: 37.0, left: 24, bottom: 5),
              child: Text(
                'How are you feeling today?',
                style: TextStyle(fontSize: 16),
              ),
            ),
          ),

          Row(
            children: [
              InkWell(
                child: Padding(
                  padding: const EdgeInsets.only(left: 24),
                  child: Container(
                    decoration: BoxDecoration(
                      color: const Color(0xFFDCE7FD),
                      borderRadius: BorderRadius.circular(38),
                    ),
                    width: (screenWidth / 3.43),
                    height: (screenHeight / 17.84),
                    child: const Center(
                      child: Text(
                        '💪 On Top!',
                        style: TextStyle(fontSize: 16),
                      ),
                    ),
                  ),
                ),
              ),
              InkWell(
                child: Padding(
                  padding: const EdgeInsets.only(left: 8),
                  child: Container(
                    decoration: BoxDecoration(
                      color: const Color(0xFFDCE7FD),
                      borderRadius: BorderRadius.circular(38),
                    ),
                    width: (screenWidth / 2.46),
                    height: (screenHeight / 17.84),
                    child: const Center(
                      child: Text(
                        '📉 Low on Energy',
                        style: TextStyle(fontSize: 16),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
          // InkWell(
          //   child: Padding(
          //     padding: const EdgeInsets.all(8.0),
          //     child: Container(
          //       decoration: BoxDecoration(
          //           color: const Color(0xFFDCE7FD),
          //           borderRadius: BorderRadius.circular(38)),
          //       width: 120,
          //       height: 50,
          //       child: const Center(child: Text('💪 On Top!')),
          //     ),
          //   ),
          // ),
          Padding(
            padding: const EdgeInsets.only(left: 24, top: 39),
            child: Row(
              children: const [
                Text(
                  'Upcoming',
                  style: TextStyle(fontSize: 16),
                ),
                Text(
                  ' Reminders',
                  style: TextStyle(fontWeight: FontWeight.w600, fontSize: 16),
                )
              ],
            ),
          ),
          SafeArea(
            child: Column(
              children: [
                InkWell(
                  child: getAllData(),
                ),
                // InkWell(
                //   child: Padding(
                //     padding: const EdgeInsets.only(left: 24, right: 24, top: 9),
                //     child: Container(
                //       decoration: BoxDecoration(
                //           borderRadius: BorderRadius.circular(34),
                //           color: const Color(0xFFDCE7FD)),
                //       width: double.infinity,
                //       height: (screenHeight / 10.61),
                //     ),
                //   ),
                // ),
                // InkWell(
                //   child: Padding(
                //     padding: const EdgeInsets.only(left: 24, right: 24, top: 9),
                //     child: Container(
                //       decoration: BoxDecoration(
                //           borderRadius: BorderRadius.circular(34),
                //           color: const Color(0xFFDCE7FD)),
                //       width: double.infinity,
                //       height: (screenHeight / 10.61),
                //     ),
                //   ),
                // ),
              ],
            ),
          ),
          SafeArea(
            child: InkWell(
              child: Padding(
                padding: const EdgeInsets.only(
                    left: 24, right: 24, top: 29, bottom: 33),
                child: Container(
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(34),
                      color: const Color(0xFF7A87FB)),
                  width: double.infinity,
                  height: (screenHeight / 4.69),
                  child: Row(
                    children: <Widget>[
                      const Padding(
                        padding: EdgeInsets.only(left: 17),
                        child: Text(
                          "You've been doing\ngreat Raman!",
                          style: TextStyle(
                              fontWeight: FontWeight.w500,
                              fontSize: 16,
                              color: Colors.white),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 25.39, left: 35),
                        child: Image.asset('assets/log.png'),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
