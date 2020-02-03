import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from "firebase/app";
import 'firebase/firestore';
import { joinMeal } from "../common/common";

export default function QrCode(props) {
  const [hasPermission] = useState("granted");
  const [scanned, setScanned] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    firebase.firestore().collection('meal').where('id', '==', "rlKUcQOF7g7eo87hj6jM").get()
    .then(function(doc) {
      if (doc.exists) {
          let meal = doc.data();

          if (meal.peopleMax > meal.peopleNbr)
            joinMeal(meal);
      } else {
          console.log("No such document!");
      }
  }.bind(this)).catch(function(error) {
      console.log("Error getting document:", error);
  });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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