import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { mapping } from '@eva-design/eva';
import { light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Button, Text, Icon } from 'react-native-ui-kitten';
import firebase from "firebase/app";

import MapView from 'react-native-maps';

const mealImg = require('../../assets/mealEx.jpg');

export default class MealEvent extends Component {
    constructor(props) {
        super(props);
        this.db = firebase.firestore();
    }

    state = {
        meal: {
            name: "",
            peopleMax: 0,
            description: "",
            priceMax: 0,
            priceMin: 0,
            duration: 0,
            address: "",
            startAt: new Date(),
            endAt: new Date(),

            ingredient: [],
        },
        visible: false
    }

    componentDidMount = () => {
        let meal = this.db.collection('meal').doc(this.props.navigation.getParam('id', 'NO-ID')).get();
        meal.then(function(doc) {
            if (doc.exists) {
                let meal = doc.data();

                meal.startAt = meal.startAt.toDate();
                this.setState({meal: meal});
            } else {
                console.log("No such document!");
            }
        }.bind(this)).catch(function(error) {
            console.log("Error getting document:", error);
        });
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
                                <Text category="h4">{this.state.meal.name}</Text>
                                <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                                    <Text category="s1">{this.state.meal.peopleMax.toString()}</Text>
                                    <Icon name='person' width={25} height={25} fill='gray' />
                                </View>
                            </View>
                            <View style={{marginTop: '2%'}}>
                                <Text  category="s1" appearance='hint'>Description : </Text>
                                <Text style={{marginLeft: '10%'}}>{ this.state.meal.description}</Text>
                            </View>
                            <View style={{marginTop: '2%'}}>
                                <Text  category="s1" appearance='hint'>Price between : </Text>
                                <Text style={{marginLeft: '10%'}}>{this.state.meal.priceMin.toString() + ' - ' + this.state.meal.priceMax.toString() + '€'}</Text>
                            </View>
                            <View style={{marginTop: '2%', flexWrap: 'wrap'}}>
                                <Text category="s1" appearance='hint'>Duration : </Text>
                                <Text>{this.state.meal.duration.toString() + 'min'}</Text>
                            </View>
                            <Text>Ingredient :</Text>
                            <View style={{marginTop: '2%', flexDirection: 'row',flexWrap: 'wrap'}}>
                                <Layout style={styles.container2}>
                                {
                                    this.state.meal.ingredient.map((txt, index) => (
                                        <Layout key={index} level='1' style={styles.layout}>
                                            {/* /<Card> */}
                                                <Text>
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
                                {"Start at : " + (this.state.meal.startAt.getMonth() + 1) + "/" + this.state.meal.startAt.getDate() +"/"+ this.state.meal.startAt.getFullYear() +" - "+ this.state.meal.startAt.getHours() +":"+ this.state.meal.startAt.getMinutes()}
                            </Text>
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