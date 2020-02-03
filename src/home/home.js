import React, { Component } from 'react';
import { View, StyleSheet, Text,  ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import { Layout, Button, Input, Icon } from 'react-native-ui-kitten';
import firebase from "firebase/app";
import { CardList } from 'react-native-card-list';
import QRCode from 'react-native-qrcode';
//import QRCode from 'react-native-qrcode-generator';
//import QRCode from 'react-native-qrcode-svg';



const mealImg = require('../../assets/mealEx.jpg');

const searchIcon = (style) => (
  <Icon name="search-outline" width={20} height={20}></Icon>
) // this.setState({error: false});
// this.db.collection("meal")
// .where("name", ">", [this.state.searchValue])
// .get()
// .then((res) => {
//   console.log(res);
//   if (res.empty) {
//     console.log('No matching documents.');
//     return;
//   }
//   res.forEach((doc) => {
//     console.log(doc.data());
//   })
// })

const contentCard = (data, date, present, maxPeople) => (
  <View>
      <View style={{}}>
        <Text category="h2"  style={{fontWeight: 'bold'}}>Description :</Text>
        <Text style={{marginLeft: '5%'}}>{data.description.repeat(27)} </Text>
      </View>
        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
          <Layout level="3">
            <View>
              <View style={{flex:1}}>
                <QRCode
                  size={70}
                  value={data.id}/>
              </View>
            </View>

          </Layout>
      </View>
      <View style={{marginTop: "3%"}}>
        <Text  category="h2" style={{fontWeight: 'bold'}}>Price between : </Text>
        <Text style={{marginLeft: '5%'}}>{data.priceMin.toString() + ' - ' + data.priceMax.toString() + '€'}</Text>
      </View>
      <View style={{marginTop: '3%'}}>
        <Text category="h2" style={{fontWeight: 'bold'}}>Duration : </Text>
        <Text style={{marginLeft: '5%'}}>{data.duration.toString() + 'min'}</Text>
      </View>
      <View style={{marginTop: '3%'}}>
        <Text category="h2" style={{fontWeight: 'bold'}}>Ingredients : </Text>
        <View style={{ marginLeft: "5%", flexDirection: 'row',flexWrap: 'wrap'}}>
          {data.ingredient.map((ingr, index) => (
            <Text key={index}>{ingr} - </Text>
          ))}
        </View>
      </View>
      <View style={{marginTop: '3%'}}>
        <Text category="h2" style={{fontWeight: 'bold'}}>Date : </Text>
        <Text style={{marginLeft: '5%'}}>{(date.getMonth() + 1) + "/" + date.getDate() +"/"+ date.getFullYear() +" - "+ date.getHours() +":"+ date.getMinutes()}</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: '10%'}}>
        {
          present ?
            <Button
                onPress={() => this.quitMeal()}
                status='danger'>
                Quit Meal !
            </Button>
          :
            <Button
                disabled={maxPeople}
                onPress={() => this.joinMeal()}
                status='success'>
                Join meal !
            </Button>
        }
      </View>
  </View>
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

  joinMeal = () => {
    meal = this.state.meal;

    meal.peopleNbr += 1;
    meal.peoples.push(firebase.auth().currentUser.uid);

    this.setState({present: true});

    this.db.collection("meal").doc(meal.id).update(meal);
  }

  quitMeal = () => {
    meal = this.state.meal;

    meal.peopleNbr -= 1;
    meal.peoples.splice(meal.peoples.indexOf(firebase.auth().currentUser.uid), 1);

    this.setState({present: false});

    this.db.collection("meal").doc(meal.id).update(meal);
  }

  searchMeal = async () => {
    if (!this.state.searchValue) {
      await this.getMeals();
      this.setState({error: true});
    }else {
      await this.getMeals();
      let toto = [];
      this.state.meals.forEach((res) => {
        if (res.title.toLowerCase().includes(this.state.searchValue.toLowerCase()))
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
        let date = doc.data().startAt.toDate();
        let present = false;
        let maxPeople = false;


        if (doc.data().peoples.indexOf(firebase.auth().currentUser.uid) != -1)
            present = true;
        else if (doc.data().peopleNbr === doc.data().peopleMax)
            maxPeople = true;

        let meal = {
          id: doc.id,
          title: doc.data().name,
          picture: doc.data().mealImg ? doc.data().mealImg : mealImg,
          content: contentCard(doc.data(), date, present, maxPeople),
        }

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
                <View >
                  <CardList cards={this.state.meals} style={{height: '50%'}}/>
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
