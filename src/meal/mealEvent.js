import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { mapping } from '@eva-design/eva';
import { light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Button, Input, Text } from 'react-native-ui-kitten';
import MapView from 'react-native-maps';

export default class Create extends Component {
    state = {
        name: "Carbonara",
        peopleMax: 10,
        description: "The first meal example",
        priceMax: 30,
        priceMin: 10,
        duration: 120,
        place: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0,
        },
        startAt: new Date(),
        endAt: new Date(),

        ingredient: ["pasta", "pork", "egg", "cream"],

        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0,
        },
        visible: false,
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = parseFloat(position.coords.latitude)
            let long = parseFloat(position.coords.longitude)

            let initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta:  0.0922,
                longitudeDelta: 0.0421,
            }

            this.setState({place: initialRegion})
            this.setState({region: initialRegion})
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    }

    render() {
        return (
            <ApplicationProvider mapping={mapping} theme={lightTheme}>
                <Layout style={styles.container}>
                    <View style={styles.view}>
                    <Text style={{marginHorizontal: 4}}>{this.state.name}</Text>
                    <ScrollView contentContainerStyle={styles.ScrollView}>
                        <Text>{"Maximum people : " + this.state.peopleMax.toString()}</Text>
                        <Text>{"Description : " + this.state.description}</Text>
                        <Text>{"Maximum price : " + this.state.priceMax.toString()}</Text>
                        <Text>{"Minimum price : " + this.state.priceMin.toString()}</Text>
                        <Text>{"Duration : " + this.state.duration.toString()}</Text>
                        <Text>Ingredient :</Text>
                        {
                            this.state.ingredient.map((txt, index) => (
                                <Text key={index}>
                                    {txt + "\n"}
                                </Text>
                            ))
                        }
                        <Text
                            style={styles.input}
                        >
                            {"Start at : " + this.state.startAt.getMonth() +"/"+ this.state.startAt.getDate() +"/"+ this.state.startAt.getFullYear() +" - "+ this.state.startAt.getHours() +":"+ this.state.startAt.getMinutes()}
                        </Text>
                        <View style={{height: '25%', width: '100%'}}>
                            <MapView
                                style={styles.map}
                                region={this.state.region}
                            >
                                <MapView.Marker
                                    coordinate= {{
                                        latitude: this.state.place.latitude,
                                        longitude: this.state.place.longitude,
                                    }}
                                />
                            </MapView>
                        </View>
                    </ScrollView>
                    </View>
                </Layout>
            </ApplicationProvider>
        )
    }
};


const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    view: {
        flex: 2,
        alignItems: 'center',
        marginTop: '5%'
    },
    ScrollView: {
        alignItems: 'center',
        height: 1500,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});