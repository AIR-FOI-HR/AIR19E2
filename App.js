import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { IconRegistry, ApplicationProvider } from 'react-native-ui-kitten';
import { mapping, light } from '@eva-design/eva';


export default function App() {
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={light}>
        <AppNavigator />
      </ApplicationProvider>
    </React.Fragment>
  );
}