import React, { Component } from 'react';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';
import { View } from 'react-native';

export default class Profil extends Component {
  render() {
    return (
      <ApplicationProvider>
        <Layout>
          <View>
            <Text>Bonjour</Text>
          </View>
        </Layout>
      </ApplicationProvider>
    );
  }
}