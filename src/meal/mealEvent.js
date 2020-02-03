import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Layout, Button, Text, Icon, Modal } from 'react-native-ui-kitten';
import firebase from "firebase/app";
import QRCode from 'react-native-qrcode';
//import QRCode from 'react-native-qrcode-generator'
//import QRCode from 'react-native-qrcode-svg'

const mealImg = require('../../assets/mealEx.jpg');

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
        visibleQR: false,
    }

    componentDidMount = () => {
        if (this.state.meal.peoples.indexOf(firebase.auth().currentUser.uid) != -1)
            this.setState({present: true});
        else if ( this.state.meal.peopleNbr >= this.state.meal.peopleMax)
            this.setState({maxPeople: true});
    }

    joinMeal() {
        meal = this.state.meal;

        meal.peopleNbr += 1;
        meal.peoples.push(firebase.auth().currentUser.uid);

        this.setState({present: true});

        this.db.collection("meal").doc(meal.id).update(meal);
    }

    quitMeal() {
        meal = this.state.meal;

        meal.peopleNbr -= 1;
        meal.peoples.splice(meal.peoples.indexOf(firebase.auth().currentUser.uid), 1);

        this.setState({present: false});

        this.db.collection("meal").doc(meal.id).update(meal);
    }

    displayHandle = () => {
        this.setState({display: !this.state.display});
    }

    qrCodeModal = () => (
        <Layout
        level='3'
        style={styles.modalContainerHistory}>
        <View style={{alignItems: "center"}}>
          <Text category='h5'>Activity</Text>
        </View>
        <View style={{flex: 1, marginTop: '8%'}}>
      </View>
      </Layout>
      )
    toggleModalQR = () => {
      this.setState({visibleQR: !this.state.visibleQR});
    };

    qrCode = () => {
        console.log(this.state.visibleQR);
        this.setState({visibleQR: true});
        console.log(this.state.visibleQR);
    }
    

    render() {
        return (
            <View style={{width: "95%", margin: "2%"}}>
                <Layout>
                    <Modal allowBackdrop={true}
                        backdropStyle={styles.backdrop}
                        onBackdropPress={this.toggleModalQR}
                        visible={this.state.visibleQR}>
                        {this.qrCodeModal()}
                    </Modal>
                </Layout>
                <TouchableWithoutFeedback onPress={() => this.displayHandle()}>
                    <ImageBackground imageStyle={{ borderRadius: 25 }} style={{height: 200, width: "100%"}} source={this.state.meal.mealImg ? this.state.meal.mealImg : mealImg}>
                        <Text style={{color: "white", textAlign: "center"}} category="h1">{this.state.meal.name}</Text>
                    </ImageBackground>
                </TouchableWithoutFeedback>
                { this.state.display ?
                    <View style={styles.view}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                                {/* <View style={{flex:1, marginTop: "10%"}}>
                                </View> */} 
                            <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                                <Text category="s1">{this.state.meal.peopleNbr}/{this.state.meal.peopleMax}</Text>
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
                        <View style={{marginTop: '2%', flexWrap: 'wrap'}}>
                            <Text category="s1" appearance='hint'>Address : </Text>
                            <Text>{this.state.meal.address}</Text>
                        </View>
                        <Text>Ingredient :</Text>
                        <View style={{marginTop: '2%', flexDirection: 'row',flexWrap: 'wrap'}}>
                            <Layout style={styles.container2}>
                            {
                                this.state.meal.ingredient.map((txt, index) => (
                                    <Layout key={index} level='1' style={styles.layout}>
                                            <Text>
                                                {txt}
                                            </Text>
                                    </Layout>
                                ))
                            }
                            </Layout>
                        </View>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <Text
                                style={styles.input}
                            >
                                {"Start at : " + (this.state.meal.startAt.getMonth() + 1) + "/" + this.state.meal.startAt.getDate() +"/"+ this.state.meal.startAt.getFullYear() +" - "+ this.state.meal.startAt.getHours() +":"+ this.state.meal.startAt.getMinutes()}
                            </Text>
                            <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                                <Button status='info' onPress={this.qrCode}> QrCode</Button>
                            </View>
                        </View>
                        <View style={{marginTop: '10%'}}>
                        {
                            this.state.present ?
                                <Button
                                    onPress={() => this.quitMeal()}
                                    style={styles.button}
                                    status='danger'>
                                    Quit Meal !
                                </Button>
                            :
                                <Button
                                    disabled={this.state.maxPeople}
                                    onPress={() => this.joinMeal()}
                                    style={styles.button}
                                    status='info'>
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


const styles = StyleSheet.create({
    container2: {
        flex: 1,
        flexDirection: 'row',
    },
    modalContainerHistory: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 256,
        padding: 16,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
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