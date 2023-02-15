// ignore_for_file: library_private_types_in_public_api, must_be_immutable

import 'dart:async';
import 'package:flutter/material.dart';
import 'data_game.dart';
import 'TileModel.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:zuno/main.dart';

const purple = Color.fromRGBO(122, 135, 251, 1);

class GameApp extends StatelessWidget {
  const GameApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'MemoryGame',
      debugShowCheckedModeBanner: false,
      home: Game(),
    );
  }
}

class Game extends StatefulWidget {
  const Game({super.key});

  @override
  _GameState createState() => _GameState();
}

class _GameState extends State<Game> {
  final GlobalKey<FormState> formKey = GlobalKey();

  Future uploadScore(maxLevelReached) async {
    final collectionRef = FirebaseFirestore.instance
        .collection('game')
        .doc('8vDBT3JL2dAU7b0pi3JP');
    collectionRef.set({
      "maxLevel": FieldValue.arrayUnion([maxLevelReached]),
    });
  }

  @override
  void dispose() {
    super.dispose();
  }

  List<TileModel> gridViewTiles = <TileModel>[];
  List<TileModel> questionPairs = <TileModel>[];
  var level = 2;
  int maxLevelReached = 1;

  @override
  void initState() {
    super.initState();
    reStart();
  }

  void reStart() {
    myPairs = getPairs();
    myPairs.length = level;
    myPairs.shuffle();

    gridViewTiles = myPairs;
    Future.delayed(const Duration(seconds: 3), () {
      setState(() {
        questionPairs = getQuestionPairs();
        gridViewTiles = questionPairs;
        gridViewTiles.length = level;
        selected = false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: purple,
        elevation: 0,
        leading: IconButton(
          onPressed: () => {
            Navigator.push(
                context, MaterialPageRoute(builder: (_) => const MyApp())),
          },
          icon: const Icon(
            Icons.arrow_back,
            color: Colors.black87,
          ),
        ),
      ),
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 50),
          child: Column(
            children: <Widget>[
              const SizedBox(
                height: 70,
              ),
              points != level ~/ 2 * 100
                  ? Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: <Widget>[
                        Text(
                          "$points/${level ~/ 2 * 100}",
                          style: const TextStyle(
                              fontSize: 30,
                              fontWeight: FontWeight.w500,
                              color: purple),
                        ),
                        const Text(
                          "Points",
                          textAlign: TextAlign.start,
                          style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.w300,
                              color: Colors.black45),
                        ),
                        const SizedBox(
                          height: 50,
                        ),
                      ],
                    )
                  : Container(),
              const SizedBox(
                height: 20,
              ),
              points != level ~/ 2 * 100
                  ? Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 20, vertical: 20),
                      decoration: BoxDecoration(
                          boxShadow: const [
                            BoxShadow(
                              color: Colors.black12,
                              spreadRadius: 1,
                              blurRadius: 10.0,
                            ),
                          ],
                          color: Colors.white,
                          border: Border.all(
                            color: Colors.white,
                          ),
                          borderRadius:
                              const BorderRadius.all(Radius.circular(20))),
                      child: GridView(
                        shrinkWrap: true,
                        scrollDirection: Axis.vertical,
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                            mainAxisSpacing: 0.0,
                            crossAxisCount: level ~/ 2 < 4 ? 2 : 4,
                            childAspectRatio: level ~/ 2 < 4 ? 1.4 : 0.8),
                        children: List.generate(gridViewTiles.length, (index) {
                          return Tile(
                            imagePathUrl:
                                gridViewTiles[index].getImageAssetPath(),
                            tileIndex: index,
                            parent: this,
                          );
                        }),
                      ))
                  : Column(
                      children: <Widget>[
                        GestureDetector(
                          onTap: () {
                            setState(() {
                              points = 0;
                              level = level + 2;
                              reStart();
                            });
                          },
                          child: Container(
                            height: 50,
                            width: 200,
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              color: purple,
                              borderRadius: BorderRadius.circular(24),
                            ),
                            child: const Text(
                              "Next Level",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 17,
                                  fontWeight: FontWeight.w500),
                            ),
                          ),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        GestureDetector(
                          onTap: () => {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (_) => const MyApp())),
                            setState(() {
                              maxLevelReached = level ~/ 2;
                              uploadScore(maxLevelReached);
                              points = 0;
                            }),
                            print(maxLevelReached),
                          },
                          child: Container(
                            height: 50,
                            width: 200,
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              border: Border.all(color: purple, width: 2),
                              borderRadius: BorderRadius.circular(24),
                            ),
                            child: const Text(
                              "Exit",
                              style: TextStyle(
                                  color: purple,
                                  fontSize: 17,
                                  fontWeight: FontWeight.w500),
                            ),
                          ),
                        ),
                      ],
                    )
            ],
          ),
        ),
      ),
    );
  }
}

class Tile extends StatefulWidget {
  String imagePathUrl;
  int tileIndex;
  _GameState parent;

  Tile(
      {super.key,
      required this.imagePathUrl,
      required this.tileIndex,
      required this.parent});

  @override
  _TileState createState() => _TileState();
}

class _TileState extends State<Tile> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        if (!selected) {
          setState(() {
            myPairs[widget.tileIndex].setIsSelected(true);
          });
          if (selectedTile != "") {
            if (selectedTile == myPairs[widget.tileIndex].getImageAssetPath()) {
              points = points + 100;

              TileModel tileModel = TileModel();
              selected = true;
              Future.delayed(const Duration(seconds: 2), () {
                tileModel.setImageAssetPath("");
                myPairs[widget.tileIndex] = tileModel;
                myPairs[selectedIndex] = tileModel;
                widget.parent.setState(() {});
                setState(() {
                  selected = false;
                });
                selectedTile = "";
              });
            } else {
              selected = true;
              Future.delayed(const Duration(seconds: 2), () {
                widget.parent.setState(() {
                  myPairs[widget.tileIndex].setIsSelected(false);
                  myPairs[selectedIndex].setIsSelected(false);
                });
                setState(() {
                  selected = false;
                });
              });

              selectedTile = "";
            }
          } else {
            setState(() {
              selectedTile = myPairs[widget.tileIndex].getImageAssetPath();
              selectedIndex = widget.tileIndex;
            });
          }
        }
      },
      child: Container(
        margin: const EdgeInsets.all(5),
        child: myPairs[widget.tileIndex].getImageAssetPath() != ""
            ? Image.asset(myPairs[widget.tileIndex].getIsSelected()
                ? myPairs[widget.tileIndex].getImageAssetPath()
                : widget.imagePathUrl)
            : Container(
                color: Colors.white,
                child: Image.asset("assets/correct.png"),
              ),
      ),
    );
  }
}
