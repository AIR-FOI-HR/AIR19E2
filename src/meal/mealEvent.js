import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { mapping } from '@eva-design/eva';
import { light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Button, Input, Text, Icon } from 'react-native-ui-kitten';

import MapView from 'react-native-maps';

const mealImg = require('../../assets/mealEx.jpg');

export default class MealEvent extends Component {
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

    joinMeal() {
        alert("You join this meal !!");
    }

    render() {
        return (
            <ApplicationProvider mapping={mapping} theme={lightTheme}>
                <Layout style={styles.container}>
                    <View style={styles.view}>
                    <View style={{marginTop: '10%', height: "40%"}}>
                        <Image
                            style={{width: "100%", height: "100%"}}
                            source={mealImg}
                        />

                    </View>
                        <ScrollView contentContainerStyle={styles.ScrollView} showsVerticalScrollIndicator={false}>
                            <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                                <Text category="h4">{this.state.name}</Text>
                                <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                                    <Text category="s1">{this.state.peopleMax.toString()}</Text>
                                    <Icon name='person' width={25} height={25} fill='gray' />
                                </View>
                            </View>
                            <View style={{marginTop: '2%'}}>
                                <Text  category="s1" appearance='hint'>Description : </Text>
                                <Text style={{marginLeft: '10%'}}>{ this.state.description}</Text>
                            </View>
                            <View style={{marginTop: '2%'}}>
                                <Text  category="s1" appearance='hint'>Price between : </Text>
                                <Text style={{marginLeft: '10%'}}>{this.state.priceMin.toString() + ' - ' + this.state.priceMax.toString() + '€'}</Text>
                            </View>
                            <View style={{marginTop: '2%', flexWrap: 'wrap'}}>
                                <Text category="s1" appearance='hint'>Duration : </Text>
                                <Text>{this.state.duration.toString() + 'min'}</Text>
                            </View>
                            <Text>Ingredient :</Text>
                            <View style={{marginTop: '2%', flexDirection: 'row',flexWrap: 'wrap'}}>
                                <Layout style={styles.container2}>
                                {
                                    this.state.ingredient.map((txt, index) => (
                                        <Layout level='1' style={styles.layout}>
                                            {/* /<Card> */}
                                                <Text key={index}>
                                                    {txt}
                                                </Text>
                                            {/* </Card> */}
                                        </Layout>
                                    ))
                                }
                                </Layout>
                            </View>
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
                            <Button
                                onPress={() => this.joinMeal()}
                                style={styles.button}
                                status='info'>
                                Join meal !
                            </Button>
                        </ScrollView>
                    </View>
                </Layout>
            </ApplicationProvider>
        )
    }
};


const styles = StyleSheet.create({
    container2: {
        flex: 1,
        flexDirection: 'row',
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    view: {
        flex: 1,
        width: '95%',
        marginTop: '1%'
    },
    ScrollView: {
        height: 1500,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});