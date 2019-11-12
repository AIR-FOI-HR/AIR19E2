import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { mapping } from '@eva-design/eva';
import { dark as darkTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';

export default class Home extends Component {
    render() {
        return (
            <ApplicationProvider mapping={mapping} theme={darkTheme}>
                <Layout style={{height:'100%'}}>
                    <View style={{marginTop: "30%", alignItems: 'center'}}>
                        <Text>Display first</Text>
                    </View>
                </Layout>
            </ApplicationProvider>
        )
    }
};