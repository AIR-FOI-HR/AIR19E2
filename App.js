import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { mapping } from '@eva-design/eva';
import { light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { IconRegistry, ApplicationProvider } from 'react-native-ui-kitten';
import { firebaseConfig } from "./firebaseConfig";
import firebase from "firebase/app";

firebase.initializeApp(firebaseConfig);

export default function App() {

  return (
    <React.Fragment>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <IconRegistry icons={EvaIconsPack} />
        <AppNavigator />
      </ApplicationProvider>
    </React.Fragment>
  );
}