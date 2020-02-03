import React, { Component } from 'react';
import { View, Image, StyleSheet, ScrollView, RefreshControl, SafeAreaView, TouchableNativeFeedback } from 'react-native';
import { Layout, Button, Icon, Input, Text } from 'react-native-ui-kitten';
import firebase from "firebase/app";
import MealEvent from '../meal/mealEvent'

const mealImg = require('../../assets/mealEx.jpg');

const searchIcon = (style) => (
  <Icon name="search-outline" width={20} height={20}></Icon>
)

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.db = firebase.firestore();
  }

  state = {
    meals: [],

    searchValue: '',
    selectedIndex: 1,
    refreshing: false,
    error: false,
  }

  componentDidMount = () => {
    this.getMeals();
  }

  searchMeal = async () => {
    if (!this.state.searchValue) {
      await this.getMeals();
      this.setState({error: true});
    }else {
      await this.getMeals();
      let toto = [];
      this.state.meals.forEach((res) => {
        if (res.name.toLowerCase().includes(this.state.searchValue.toLowerCase()))
          toto.push(res);
      })
      this.setState({
        meals: toto,
      })
    }
  }

  getMeals = async () => {
    let allMeals = this.db.collection('meal');

    await allMeals.where('startAt', '>', new Date()).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      let meals = [];
      snapshot.forEach((doc) => {
        let meal = doc.data();

        meal.id = doc.id;
        meal.startAt = meal.startAt.toDate();

        if (doc.data().peoples.indexOf(firebase.auth().currentUser.uid) != -1)
            meal.present = true;
        else if (doc.data().peopleNbr === doc.data().peopleMax)
            meal.maxPeople = true;

        meals.push(meal);
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

  onRefresh = async () => {
    this.setState({refreshing : true});
    await this.getMeals()
    this.setState({refreshing : false,  searchValue: ''});
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
          <View style={{marginTop:'15%',  alignItems: 'center'}}>
            <View style={{ flexDirection: 'row', width: '80%'}}>
              <Input
                style={styles.input}
                status={this.state.error ? 'danger' : 'info'}
                placeholder="Search"
                value={this.state.searchValue}
                onChangeText={this.onSearchChange}
              />
              <Button status='basic' icon={searchIcon} onPress={this.searchMeal}></Button>
            </View>
          </View>
          <ScrollView style={{marginTop:'3%'}}
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
            }
          >
            <Layout style={styles.container}>
              <View>
                { this.state.meals.length ?
                  this.state.meals.map((meal) => (
                    <View key={meal.id}>
                      <MealEvent meal={meal}/>
                    </View>
                  )) :
                    <View>
                      <Text>No meals registered yet ! Create one !</Text>
                    </View>
                }
              </View>
            </Layout>
          </ScrollView>
      </SafeAreaView>
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
    width: '50%',
  },
})
