import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Layout, Button, Input, Text } from 'react-native-ui-kitten';
import DateTimePicker from "react-native-modal-datetime-picker";
import firebase from "firebase/app";
import 'firebase/firestore';
import {KeyboardAvoidingView} from 'react-native';

const mode = 'datetime';
const mealLogo = require('../../assets/lunch-box.png');

const init =  {
  userId: null,
  name: "",
  peopleMax: 0,
  description: "",
  priceMax: 0,
  priceMin: 0,
  duration: 0,
  address: "",
  peopleNbr: 1,
  startAt: new Date(),
  peoples: [],

  newIngredient: "",
  ingredient: [],

  visible: false,
}

export default class Create extends Component {

  constructor(props) {
    super(props);
    this.db = firebase.firestore();
  }

  state = init;

  onChangeInput = (e, index) => {
    switch (index) {
      case "name":
        this.setState({ name: e });
        break;
      case "peopleMax":
        if (e.length === 0)
          e = 0;
        this.setState({ peopleMax: parseInt(e, 10) });
        break;
      case "description":
        this.setState({ description: e });
        break;
      case "priceMax":
        if (e.length === 0)
          e = 0;
        this.setState({ priceMax: parseInt(e, 10) });
        break;
      case "priceMin":
        if (e.length === 0)
          e = 0;
        this.setState({ priceMin: parseInt(e, 10) });
        break;
      case "duration":
        if (e.length === 0)
          e = 0;
        this.setState({ duration: parseInt(e, 10) });
        break;
      case "address":
        this.setState({ address: e });
        break;
      case "startAt":
        this.setState({ startAt: e });
        break;
      case "newIngredient":
        this.setState({ newIngredient: e });
      default:
        break;
    }
  }

  addIngredient = () => {
    let tmp = this.state.ingredient;

    tmp.push(this.state.newIngredient);
    this.setState({ ingredient: tmp });
    this.setState({ newIngredient: '' });
  }

  removeIngredient = (e) => {
    let tmp = this.state.ingredient;

    tmp.splice(e, 1);
    this.setState({ ingredient: tmp });
  }

  onCancel = () => {
    this.props.navigation.navigate('Home');
  };

  createMeal = () => {
    let uid = firebase.auth().currentUser.uid;
    let iState = this.state;

    delete iState.visible;
    delete iState.newIngredient;
    iState.peoples.push(uid)

    iState.userId = uid;

    this.db.collection('meal').add(iState)
      .then(ref => { this.props.navigation.navigate('Home');});
  };

  showDateTimePicker = () => {
    this.setState({ visible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
        <Layout style={styles.container}>
          <View style={styles.view}>
          <KeyboardAvoidingView behavior="position" enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                style={{ width: 100, height: 100 }}
                source={mealLogo}
              />
              <Text style={{ marginTop: '2%' }} category='h3'> Create a meal !</Text>
            </View>
            <View style={{ marginTop: '3%' }}>
              <ScrollView contentContainerStyle={styles.ScrollView} showsVerticalScrollIndicator={false}>
                <Input
                  label='Title :'
                  style={styles.input}
                  value={this.state.name}
                  onChangeText={(e) => this.onChangeInput(e, "name")}
                  placeholder='Enter the title of the meal.'
                />
                <Input
                  keyboardType='numeric'
                  label='Maximum people :'
                  style={styles.input}
                  value={this.state.peopleMax.toString()}
                  onChangeText={(e) => this.onChangeInput(e, "peopleMax")}
                  placeholder='Enter the number of people that could come to the meal.'
                />
                <Input
                  label='Description :'
                  style={styles.input}
                  value={this.state.description}
                  onChangeText={(e) => this.onChangeInput(e, "description")}
                  placeholder='Enter the description of the meal.'
                />
                <Input
                  keyboardType='numeric'
                  label='Maximum price :'
                  style={styles.input}
                  value={this.state.priceMax.toString()}
                  onChangeText={(e) => this.onChangeInput(e, "priceMax")}
                  placeholder='Enter the maximum amount of money you could ask for the meal.'
                />
                <Input
                  keyboardType='numeric'
                  label='Minimum price :'
                  style={styles.input}
                  value={this.state.priceMin.toString()}
                  onChangeText={(e) => this.onChangeInput(e, "priceMin")}
                  placeholder='Enter the minimum amount of money you could ask for the meal.'
                />
                <Input
                  keyboardType='numeric'
                  label='Duration :'
                  style={styles.input}
                  value={this.state.duration.toString()}
                  onChangeText={(e) => this.onChangeInput(e, "duration")}
                  placeholder='Enter the duration time of the meal.'
                />
                {this.state.ingredient.length > 0 ? <Text>Ingredient :</Text> : null }
                <View style={{ flexDirection: "row", alignSelf: "baseline", width: 90 }}>
                    {
                      this.state.ingredient.map((txt, index) => (
                        <Button
                          key={index}
                          style={{ marginLeft: '2%' }}
                          onPress={() => this.removeIngredient(index)}
                        >
                          {txt}
                        </Button>
                      ))
                    }
                </View>
                <Input
                  label='Ingredient :'
                  style={styles.input}
                  value={this.state.newIngredient}
                  onChangeText={(e) => this.onChangeInput(e, "newIngredient")}
                  placeholder='Enter the ingredient of the meal.'
                />
                <View style={{alignItems: 'center', marginTop: '2%'}}>
                  <Button
                    onPress={() => this.addIngredient()}
                    //style={styles.button}
                    style={{width: '70%'}}
                    >
                      Add ingredient
                    </Button>
                </View>
                <Text style={styles.input}>
                  {"Start at : " + this.state.startAt.getMonth() + "/" + this.state.startAt.getDate() + "/" + this.state.startAt.getFullYear() + " - " + this.state.startAt.getHours() + ":" + this.state.startAt.getMinutes()}
                </Text>
                <DateTimePicker
                  mode={mode}
                  isVisible={this.state.visible}
                  value={this.state.startAt}
                  onConfirm={(e) => this.onChangeInput(e, "startAt")}
                  onCancel={this.hideDateTimePicker}
                />
                <View style={{alignItems: 'center', marginTop: '2%'}}>
                  <Button
                    onPress={this.showDateTimePicker}
                    //style={styles.button}
                  >
                    Change Date
                  </Button>
                </View>
                <Input
                  label='Address :'
                  style={styles.input}
                  value={this.state.address}
                  onChangeText={(e) => this.onChangeInput(e, "address")}
                  placeholder='Enter the address where the meal will takes place.'
                />
                <Button style={{marginTop: "5%"}} status='success' onPress={() => this.createMeal()}>Submit</Button>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
          </View>
          {/* <View style={{position: 'absolute', flex: 1,marginTop:'100%'}}> */}
          {/* <View style={{flex: 0.6,
  justifyContent: 'flex-end',
  marginBottom: 5}}>
                <Layout style={{ flexDirection: 'row',
    flexWrap: 'wrap',}}>
                    <Button style={styles.button2} status='danger' onPress={() => this.onCancel()}>Cancel</Button>
                    <Button style={styles.button2} status='success' onPress={() => this.createMeal()}>Submit</Button>

                </Layout>
                </View> */}
        </Layout>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  view: {
    flex: 2,
    width: '80%',
    marginTop: '5%'
  },
  input: {
    marginHorizontal: 4,
    marginTop: '5%'
  },
  button2: {
    margin: 8,
  },
  button: {
    marginVertical: 4,
    marginHorizontal: 4,
    width: '70%',
    marginTop: '5%'
  },
  ScrollView: {
    //alignItems: 'center',
    height: 1500,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonList: {
    color: 'white',
  }
});
