import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { IconRegistry } from 'react-native-ui-kitten';


export default function App() {
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <AppNavigator />
    </React.Fragment>
  );
}