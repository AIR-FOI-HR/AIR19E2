import React, { Component } from 'react';
import { Layout, Button, Icon, Text, ApplicationProvider, Input } from 'react-native-ui-kitten';
import { View, StyleSheet } from 'react-native';
import { mapping, light as lightTheme } from '@eva-design/eva';
import "firebase/auth";
import firebase from "firebase/app";

const editIcon = (style) => (
  <Icon name="edit-outline" width={32} height={32}></Icon>
)

const signOutIcon = (style) => (
  <Icon name="log-out-outline" width={32} height={32}></Icon>
)

export default class Profil extends Component {

  state = {
    editing: false,
  }

  signOut = () => {
    firebase.auth().signOut()
    .then(function() {
      console.log("signout");
      this.props.navigation.navigate('Auth');
    }.bind(this)).catch(function(error) {
      console.log("No signout : " + error);
    });
  }

  changeEditing = () => {
    this.setState({editing: !this.state.editing});
  }

  render() {
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Layout style={styles.container}>
          <View style={styles.view}>
            <View  style={styles.Buttons}>
              <Button appearance="ghost" icon={editIcon}
                onPress={this.changeEditing}></Button>
              <Button appearance="ghost" icon={signOutIcon} onPress={this.signOut}></Button>
            </View>
            <Text>Email:</Text>
            <Input disabled={!this.state.editing}/>
            <Text>First name:</Text>
            <Input disabled={!this.state.editing}/>
            <Text>Last Name:</Text>
            <Input disabled={!this.state.editing}/>
            <Text>Phone number:</Text>
            <Input disabled={!this.state.editing}/>
          </View>
        </Layout>
      </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  view: {
    flex: 2,
    marginTop: '15%',
  },
  Buttons: {
    alignSelf: "flex-end"
  }
})