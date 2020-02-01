import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { mapping } from '@eva-design/eva';
import { light as lightTheme } from '@eva-design/eva';
import {
  ApplicationProvider, Layout, Text, Icon
} from 'react-native-ui-kitten';
import { Input } from 'react-native-elements';
import firebase from "firebase/app";

const mealImg = require('../../assets/mealEx.jpg');

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.db = firebase.firestore();
  }

  state = {
    meals: [],
    searchValue: '',
    selectedIndex: 1,
  }

  componentDidMount = () => {
    this.getMeals();
  }

  getMeals = () => {
    let allMeals = this.db.collection('meal');

    allMeals.where('startAt', '>', new Date()).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      let meals = [];
      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        meals.push({data: doc.data(), id: doc.id});
      });
      this.setState({meals: meals});
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }

  onTabSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  onSearchChange = (value) => {
    this.setState({ searchValue: value });
  }

  render() {
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Layout style={styles.container}>
          <View style={styles.view}>
            <Input
              style={styles.input}
              placeholder="Search"
              value={this.state.searchValue}
              onChangeText={this.onSearchChange}
            >
            </Input>
              {this.state.meals.length ?
                this.state.meals.map((data) => (
                  <TouchableOpacity style={{width: "100%"}} key={data.id} onPress={() => this.props.navigation.navigate('MealEvent', {id: data.id})}>
                    <View style={{borderBottomColor: "Black", borderBottomWidth: 1}}>
                      <View style={{borderBottomColor: "Black", borderBottomWidth: 0.5}}>
                        <View style={{height: "50%"}}>
                          <Image
                            style={{height: "100%"}}
                            source={ data.data.mealImg ? data.data.mealImg : mealImg }
                            />
                        </View>
                        <View style={{flexDirection: "row", flexWrap: 'wrap'}}>
                          <Text category="h4">{data.data.name}</Text>
                          <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                            <Text>{data.data.peopleNbr}/{data.data.peopleMax}</Text>
                            <Icon name='person' width={25} height={25} fill='gray' />
                          </View>
                        </View>
                      </View>
                      <Text>{data.data.description}</Text>
                    </View>
                  </TouchableOpacity>
                )) : <View
                      key="0"
                      onPress={() => this.props.navigation.navigate('createMeal')}
                    ><Text>No meals registered yet ! Create one !</Text>
                    </View>
              }
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
  input: {
    flex: 1,
    marginHorizontal: 4,
  }
})