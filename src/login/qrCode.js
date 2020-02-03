import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from "firebase/app";
import 'firebase/firestore';
import { joinMeal } from "../common/common";

export default function QrCode(props) {
  const [hasPermission] = useState("granted");
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    firebase.firestore().collection('meal').doc(data).get()
    .then(function(doc) {
      if (doc.exists) {
          let meal = doc.data();

          if (meal.peopleMax > meal.peopleNbr) {
            joinMeal(meal);
            alert('You join ' + meal.name + ' meal !');
          } else
            alert('No more place for ' + meal.name + ' meal :(');
      } else {
          console.log("No such document!");
      }
    }.bind(this)).catch(function(error) {
        console.log("Error getting document:", error);
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={{width: '100%',alignItems: 'center', marginBottom: '8%'}}>
        <Button title="Back" style={{width: "80%"}} onPress={props.onCloseCamera}/>
      </View>
    </View>
  );
}