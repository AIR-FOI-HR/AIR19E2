import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Layout, Button, Text, Icon } from 'react-native-ui-kitten';
import firebase from "firebase/app";
import { joinMeal } from "../common/common";

const mealImg = require('../../assets/mealEx.jpg');

export default class MealEvent extends Component {
    constructor(props) {
        super(props);
        this.db = firebase.firestore();
    }

    state = {
        display: false,
    }

    quitMeal() {
        meal = this.props.meal;

        meal.peopleNbr -= 1;
        meal.peoples.splice(meal.peoples.indexOf(firebase.auth().currentUser.uid), 1);

        this.db.collection("meal").doc(meal.id).update(meal);
    }

    displayHandle = () => {
        this.setState({display: !this.state.display});
    }

    render() {
        return (
            <View style={{width: "95%", margin: "2%"}}>
                <TouchableWithoutFeedback onPress={() => this.displayHandle()}>
                    <ImageBackground imageStyle={{ borderRadius: 25 }} style={{height: 200, width: "100%"}} source={mealImg}>
                        <Text style={{color: "white", textAlign: "center"}} category="h1">{this.props.meal.name}</Text>
                    </ImageBackground>
                </TouchableWithoutFeedback>
                { this.state.display ?
                    <View style={styles.view}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                                <Text category="s1">{this.props.meal.peopleNbr}/{this.props.meal.peopleMax}</Text>
                                <Icon name='person' width={25} height={25} fill='gray' />
                            </View>
                        </View>
                        <View style={{marginTop: '2%'}}>
                            <Text  category="s1" appearance='hint'>Description : </Text>
                            <Text style={{marginLeft: '10%'}}>{ this.props.meal.description}</Text>
                        </View>
                        <View style={{marginTop: '2%'}}>
                            <Text  category="s1" appearance='hint'>Price between : </Text>
                            <Text style={{marginLeft: '10%'}}>{this.props.meal.priceMin.toString() + ' - ' + this.props.meal.priceMax.toString() + '€'}</Text>
                        </View>
                        <View style={{marginTop: '2%', flexWrap: 'wrap'}}>
                            <Text category="s1" appearance='hint'>Duration : </Text>
                            <Text>{this.props.meal.duration.toString() + 'min'}</Text>
                        </View>
                        <View style={{marginTop: '2%', flexWrap: 'wrap'}}>
                            <Text category="s1" appearance='hint'>Address : </Text>
                            <Text>{this.props.meal.address}</Text>
                        </View>
                        <Text>Ingredient :</Text>
                        <View style={{marginTop: '2%', flexDirection: 'row',flexWrap: 'wrap'}}>
                            <Layout style={styles.container2}>
                            {
                                this.props.meal.ingredient.map((txt, index) => (
                                    <Layout key={index} level='1' style={styles.layout}>
                                            <Text>
                                                {txt}
                                            </Text>
                                    </Layout>
                                ))
                            }
                            </Layout>
                        </View>
                        <Text
                            style={styles.input}
                        >
                            {"Start at : " + (this.props.meal.startAt.getMonth() + 1) + "/" + this.props.meal.startAt.getDate() +"/"+ this.props.meal.startAt.getFullYear() +" - "+ this.props.meal.startAt.getHours() +":"+ this.props.meal.startAt.getMinutes()}
                        </Text>
                        {
                            this.props.meal.peoples.indexOf(firebase.auth().currentUser.uid) != -1 ?
                                <Button
                                    onPress={() => this.quitMeal()}
                                    style={styles.button}
                                    status='danger'>
                                    Quit Meal !
                                </Button>
                            :
                                <Button
                                    disabled={this.props.meal.peopleNbr >= this.props.meal.peopleMax}
                                    onPress={() => joinMeal(this.props.meal)}
                                    style={styles.button}
                                    status='info'>
                                    Join meal !
                                </Button>
                        }
                    </View> : null
                }
            </View>
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