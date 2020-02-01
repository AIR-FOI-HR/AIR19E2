import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Layout, Button } from 'react-native-ui-kitten';
import { Input } from 'react-native-elements';
import firebase from "firebase/app";
import { CardList } from 'react-native-card-list';

const mealImg = require('../../assets/mealEx.jpg');

const cards = [
  {
    id: "0",
    title: "Starry Night",
    picture: require('../../assets/mealEx.jpg'),
    content: <Text>Starry Night</Text>
  },
  {
    id: "1",
    title: "Wheat Field",
    picture: require('../../assets/mealEx.jpg'),
    content: <Text>Wheat Field with Cypresses</Text>
  },
  {
    id: "2",
    title: "Bedroom in Arles",
    picture: require('../../assets/mealEx.jpg'),
    content: <Text>Bedroom in Arles</Text>
  }
]

const contentCard = (data, date) => (
  <View>
     <View style={{}}>
        <Text category="h2"  style={{fontWeight: 'bold'}}>Description :</Text>
        <Text style={{marginLeft: '5%'}}>{data.description.repeat(27)} </Text>
        {/* <View style={{flex: 1, flexDirection: 'row-reverse'}}>
            <Text category="s1">1</Text>
            <Icon name='person' width={25} height={25} fill='gray' />
        </View> */}
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
            <Text>{ingr} - </Text>
          ))}
        </View>
      </View>
      <View style={{marginTop: '3%'}}>
        <Text category="h2" style={{fontWeight: 'bold'}}>Date : </Text>
        <Text style={{marginLeft: '5%'}}>{(date.getMonth() + 1) + "/" + date.getDate() +"/"+ date.getFullYear() +" - "+ date.getHours() +":"+ date.getMinutes()}</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: '10%'}}>
        <Button status='success'>JOIN</Button>
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
      let i = 0;
      let obj = {};
      snapshot.forEach((doc, key) => {
        //console.log(doc.id, '=>', doc.data());
        //meals.push({data: doc.data(), id: doc.id});
        let date = doc.data().startAt.toDate();
        obj = {
          id: i.toString(),
          title: doc.data().name + " BONJOUR ET LA",
          picture: mealImg,
          content:  contentCard(doc.data(), date)
        }
        // obj = {
        //   id: "2",
        //   title: "Bedroom in Arles",
        //   picture: require('../../assets/mealEx.jpg'),
        //   content: <Text>Bedroom in Arles</Text>
        // }
        meals.push(obj);
        i++;
      });
      //console.log(meals);
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
        <Layout style={styles.container}>
          <View style={styles.view}>
            <Input
              style={styles.input}
              placeholder="Search"
              value={this.state.searchValue}
              onChangeText={this.onSearchChange}
              >
            </Input>
            <CardList cards={this.state.meals} style={{height: '50%'}}/>
            </View>
        </Layout>
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
  },
})
