import React, { Component } from 'react';
import { View, ImageBackground, TouchableWithoutFeedback, Image } from 'react-native';
import { Button, Text, Icon } from 'react-native-ui-kitten';
import firebase from "firebase/app";
import { joinMeal } from "../common/common";

export default class MealEvent extends Component {
    constructor(props) {
        super(props);
        this.db = firebase.firestore();
    }

    state = {
        meal: this.props.meal,
        display: false,
        present: false,
        maxPeople: false,
    }

    componentDidMount = () => {
        this.handleButton(this.state.meal);
    }

    refresh = () => {
        this.setState({meal: this.props.meal});
        this.handleButton(this.state.meal)
    }

    handleButton = (meal) => {
        let present = false;
        let maxPeople = false;

        this.setState(meal);
        if (this.state.meal.peoples.indexOf(firebase.auth().currentUser.uid) != -1)
            present = true;
        else if ( this.state.meal.peopleNbr >= this.state.meal.peopleMax)
            maxPeople = true;
        this.setState({present: present});
        this.setState({maxPeople: maxPeople});
    }

    quitMeal() {
        meal = this.state.meal;

        meal.peopleNbr -= 1;
        meal.peoples.splice(meal.peoples.indexOf(firebase.auth().currentUser.uid), 1);

        this.db.collection("meal").doc(meal.id).update(meal);
        this.handleButton(meal);
    }

    displayHandle = () => {
        this.setState({display: !this.state.display});
    }

    render() {
        return (
            <View style={{width: "95%", margin: "2%"}}>
                <TouchableWithoutFeedback onPress={() => this.displayHandle()}>
                    <ImageBackground imageStyle={{ borderRadius: 25 }} style={{height: 200, width: "100%"}} source={{uri: this.props.meal.img}}>
                        <Text style={{color: "white", textAlign: "center"}} category="h1">{this.props.meal.name}</Text>
                    </ImageBackground>
                </TouchableWithoutFeedback>
                { this.state.display ?
                <View>
                    <View style={{flexDirection: 'row',flexWrap: 'wrap', marginTop: '3%'}}>
                        <View style={{flex:1}}>
                            <Image
                                style={{width: 100, height: 100}}
                                source={{uri: 'http://api.qrserver.com/v1/create-qr-code/?data=' + this.state.meal.id + '&size=150x150'}} />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                            <Text category="s1">{this.state.meal.peopleNbr}/{this.state.meal.peopleMax}</Text>
                            <Icon name='person' width={25} height={25} fill='gray' />
                        </View>
                    </View>
                    <View style={{}}>
                        <Text category="s1" appearance="hint" style={{fontWeight: 'bold'}}>Description :</Text>
                        <Text style={{marginLeft: '5%'}}>{this.state.meal.description} </Text>
                    </View>
                    <View style={{marginTop: "1%"}}>
                        <Text  category="s1" appearance="hint" style={{fontWeight: 'bold'}}>Price between : </Text>
                        <Text style={{marginLeft: '5%'}}>{this.state.meal.priceMin.toString() + ' - ' + this.state.meal.priceMax.toString() + '€'}</Text>
                    </View>
                    <View style={{marginTop: '1%'}}>
                        <Text category="s1" appearance="hint" style={{fontWeight: 'bold'}}>Duration : </Text>
                        <Text style={{marginLeft: '5%'}}>{this.state.meal.duration.toString() + 'min'}</Text>
                    </View>
                    <View style={{marginTop: '1%'}}>
                        <Text category="s1" appearance="hint" style={{fontWeight: 'bold'}}>Ingredients : </Text>
                        <View style={{ marginLeft: "5%", flexDirection: 'row',flexWrap: 'wrap'}}>
                            {
                                this.state.meal.ingredient.map((ingr, index) => (
                                    <Text key={index}>{ingr} {this.state.meal.ingredient.length == index + 1 ? null : "-"} </Text>
                                ))
                            }
                        </View>
                    </View>
                    <View style={{marginTop: '1%'}}>
                        <Text category="s1" appearance="hint" style={{fontWeight: 'bold'}}>Date : </Text>
                        <Text style={{marginLeft: '5%'}}>{(this.state.meal.startAt.getMonth() + 1) + "/" + this.state.meal.startAt.getDate() +"/"+ this.state.meal.startAt.getFullYear() +" - "+ this.state.meal.startAt.getHours() +":"+ this.state.meal.startAt.getMinutes()}</Text>
                    </View>
                    <View style={{alignItems: 'center', marginTop: '10%'}}>
                    {
                        this.state.present ?
                        <Button
                            onPress={() => this.quitMeal()}
                            status='danger'>
                            Quit Meal !
                        </Button>
                        :
                        <Button
                            disabled={this.state.maxPeople}
                            onPress={() => this.handleButton(joinMeal(this.state.meal))}
                            status='success'>
                            Join meal !
                        </Button>
                    }
                    </View>
                </View> : null
                }
            </View>
        )
    }
};