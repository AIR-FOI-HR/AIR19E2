import React, { Component } from 'react';
import { Layout, Button, Icon, Text, ApplicationProvider, Input, Modal } from 'react-native-ui-kitten';
import { View, StyleSheet } from 'react-native';
import { mapping, light as lightTheme } from '@eva-design/eva';
import "firebase/auth";
import firebase from "firebase/app";
import 'firebase/firestore';
import { Avatar } from 'react-native-elements';

const signOutIcon = (style) => (
  <Icon name="log-out-outline" width={32} height={32}></Icon>
)

export default class Profil extends Component {

  state = {
    displayName: firebase.auth().currentUser.displayName,
    email: firebase.auth().currentUser.email,
    newEmail: "",
    password: "",
    visible: false,
    visiblePassword: true,
  }

  onIconPress = () => {
    this.setState({visiblePassword: !this.state.visiblePassword });
  };

  signOut = () => {
    firebase.auth().signOut()
    .then(function() {
      console.log("signout");
      this.props.navigation.navigate('Auth');
    }.bind(this)).catch(function(error) {
      console.log("No signout : " + error);
    });
  }

  onChangeInput = (e, index) => {
    switch (index) {
      case "name":
        this.setState({displayName: e});
        break;
      case "email":
        this.setState({email: e});
        break;
      case "newEmail":
        this.setState({newEmail: e});
        break;
      case "password":
        this.setState({password: e});
        break;
      default:
        break;
    }
  }

  changeName = () => {
    firebase.auth().currentUser.updateProfile({displayName: this.displayName}).then(function() {
      console.log("update successful");
    }).catch(function(error) {
      console.log("Update failed : ", error);
    });
  }

  changeEmail = () => {
    let user = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      this.state.password
    );

    user.reauthenticateWithCredential(credential).then(function() {
      console.log("reauthentication successful")
      // User re-authenticated.
      user.updateEmail(this.state.newEmail).then(function() {
        console.log("update Email successful")
        // Update successful.
        this.setState({email: this.state.newEmail});
        this.toggleModal();
      }.bind(this)).catch(function(error) {
        console.log("update Email failed : " + error)
        // An error happened.
      });
    }.bind(this, user)).catch(function(error) {
      console.log("reauthentication failed : " + error)
      // An error happened.
    });
  }

  toggleModal = () => {
    this.setState({visible: !this.state.visible});
  };

  render() {
    const modal = (
      <Modal
      allowBackdrop={true}
      backdropStyle={styles.backdrop}
      onBackdropPress={this.toggleModal}
      visible={this.state.visible}>
      <Layout
        level='3'
        style={styles.modalContainer}>
        <Text>Hi! Enter your connection detail and change your email.</Text>
        <Input
          style={styles.input}
          value={this.state.password}
          placeholder='password'
          icon={this.renderIcon}
          secureTextEntry={this.state.visiblePassword}
          onIconPress={this.onIconPress}
          onChangeText={(e) => this.onChangeInput(e, "password")}
        />
        <Input
          keyboardType='email-address'
          style={styles.input}
          value={this.state.newEmail}
          onChangeText={(e) => this.onChangeInput(e, "newEmail")}
          placeholder='New email'
        />
        <Button onPress={this.changeEmail}>Confirm email change</Button>
      </Layout>
    </Modal>
    )
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Layout style={styles.container}>
          <View style={styles.view}>
            <View style={{marginLeft: '5%', flexDirection: 'row',flexWrap: 'wrap', alignItems: 'center'}}>
              <Avatar rounded title="MD" size="large"/>
              <Text category='h5' style={{marginLeft: '5%'}}>{this.state.displayName}</Text>
            </View>
            {modal}
            <View  style={styles.Buttons}>
              <Button appearance="ghost" icon={signOutIcon} onPress={this.signOut}></Button>
            </View>
            <View style={{marginLeft: "5%", width: "80%"}}>
              <Text>Name</Text>
              <Input style={{ marginTop: '1%'}} value={this.state.displayName} />
            </View>
            <View style={{ marginTop: '2%',marginLeft: "5%", width: "80%"}}>
              <Text>Email</Text>
              <Input style={{ marginTop: '1%'}} value={this.state.email} />
            </View>
            <View style={{alignItems: 'center', marginTop: '10%'}}>
              <Button status='success'>Update</Button>
            </View>

            {/* <Text>Email: {this.state.email}</Text>
            <Button onPress={this.toggleModal}>Change email</Button>
            <Text>Display name:</Text>
            <Input value={this.state.displayName} onChangeText={(e) => this.onChangeInput(e, "name")} onSubmitEditing={this.changeName} /> */}
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
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})