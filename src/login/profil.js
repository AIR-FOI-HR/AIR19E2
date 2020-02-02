import React, { Component } from 'react';
import { Layout, Button, Icon, Text, ApplicationProvider, Input, Modal } from 'react-native-ui-kitten';
import { View, StyleSheet } from 'react-native';
import { mapping, light as lightTheme } from '@eva-design/eva';
import "firebase/auth";
import firebase from "firebase/app";
import 'firebase/firestore';
import { Avatar } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import Spinner from 'react-native-loading-spinner-overlay';


const signOutIcon = (style) => (
  <Icon name="log-out-outline" width={32} height={32}></Icon>
)

export default class Profil extends Component {

  state = {
    staticName: firebase.auth().currentUser.displayName,
    displayName: firebase.auth().currentUser.displayName,
    email: firebase.auth().currentUser.email,
    newEmail: "",
    letter: firebase.auth().currentUser.displayName.charAt(0).toUpperCase(),
    secureTextEntry: true,
    setSecureTextEntry: true,
    password: "",
    visible: false,
    visiblePassword: true,
    spinner: false,
  }


  onIconPress = () => {
    this.setState({visiblePassword: !this.state.visiblePassword });
  };

  renderIcon = (style) => (
    <Icon {...style} name={this.state.secureTextEntry ? 'eye-off' : 'eye'}/>
  );

  signOut = () => {
    firebase.auth().signOut()
    .then(function() {
      console.log("signout");
      this.props.navigation.navigate('Auth');
    }.bind(this)).catch(function(error) {
      console.log("No signout : " + error);
    });
  }

  componentDidMount() {
    console.log(firebase.auth().currentUser.email)
    this.setState({
      staticName: firebase.auth().currentUser.displayName,
      displayName: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email,
      newEmail: "",
      letter: firebase.auth().currentUser.displayName.charAt(0).toUpperCase(),
      secureTextEntry: true,
      setSecureTextEntry: true,
      password: "",
      visible: false,
      spinner: false,
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

  onChangeEmail = (event) => {
    this.setState({email: event});
  }

  onChangeName = (event) => {
    this.setState({displayName: event});
  }

  check = () => {
    this.setState({visible: !this.state.visible});
  }

  update = async () => {
    this.setState({
      spinner:true,
    })
    if (firebase.auth().currentUser.displayName !== this.state.displayName) {
      await firebase.auth().currentUser.updateProfile({displayName: this.state.displayName}).catch((err)=> {
        console.log(err);
      })
    }
    if (firebase.auth().currentUser.email !== this.state.email) {
      let user = firebase.auth().currentUser;
      let credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.state.password
      );
      await user.reauthenticateWithCredential(credential).then(async function() {
        console.log("reauthentication successful")
        // User re-authenticated.
        await user.updateEmail(this.state.email).then(function() {
          console.log("update Email successful")
          // Update successful.
          //this.toggleModal();
        }.bind(this)).catch(function(error) {
          console.log("update Email failed : " + error)
          // An error happened.
        });
      }.bind(this, user)).catch(function(error) {
        console.log("reauthentication failed : " + error)
        // An error happened.
      });
    }
    Toast.show('Updated', {
      position: -80,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 3,
      backgroundColor: "#71dec7",
      shadow: true
    });
    this.componentDidMount();
    console.log("finis");
  }

  toggleModal = () => {
    this.setState({visible: !this.state.visible});
  };

  onIconPressSecure = () => {
    const visiblePassword = !this.state.visiblePassword;
    this.setState({ visiblePassword });
  };

  onChangePassword = (event) => {
    this.setState({password: event});
  }

  confirmChanges = () => {
    let user = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      this.state.password
    );
    user.reauthenticateWithCredential(credential).then(function() {
     this.update();
    }.bind(this, user)).catch(function(error) {
      console.log("reauthentication failed : " + error)
      Toast.show('Password incorrect', {
        position: -80,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 3,
        backgroundColor: "#f85a56",
        shadow: true
      });
      // An error happened.
    });
  }

  renderModalElement = () => (
    <Layout
      style={styles.modalContainer}
      level='3'>
      <Text category='h4' style={{textAlign:'center'}}>Enter password to confirm changes</Text>
      <Input
        value={this.state.password}
        placeholder='********'
        icon={this.renderIcon}
        secureTextEntry={this.state.visiblePassword}
        onIconPress={this.onIconPressSecure}
        onChangeText={this.onChangePassword}
        style={{marginTop: '3%'}}
      />
      <Button status='success' style={{marginTop: '3%'}} onPress={this.confirmChanges}>Confrim</Button>
    </Layout>
  );

  render() {
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Layout style={styles.container}>
          <Modal allowBackdrop={true}
            backdropStyle={styles.backdrop}
            onBackdropPress={this.toggleModal}
            visible={this.state.visible}>
              {this.renderModalElement()}
          </Modal>
          {this.state.spinner ? 
            <Spinner
              visible={this.state.spinner}
              textContent={'Loading...'}
              textStyle={ {color: '#FFF'}}
            />
          :
          null}
          <View style={styles.view}>
            <View style={{marginLeft: '5%', flexDirection: 'row',flexWrap: 'wrap', alignItems: 'center'}}>
              <Avatar rounded title={this.state.letter} size="large"/>
              <Text category='h5' style={{marginLeft: '5%'}}>{this.state.staticName}</Text>
            </View>
            <View  style={styles.Buttons}>
              <Button appearance="ghost" icon={signOutIcon} onPress={this.signOut}></Button>
            </View>
            <View style={{marginLeft: "5%", width: "80%"}}>
              <Text>Name</Text>
              <Input style={{ marginTop: '1%'}} onChangeText={this.onChangeName} value={this.state.displayName} />
            </View>
            <View style={{ marginTop: '2%',marginLeft: "5%", width: "80%"}}>
              <Text>Email</Text>
              <Input onChangeText={this.onChangeEmail} style={{ marginTop: '1%'}} value={this.state.email} />
            </View>
            <View style={{alignItems: 'center', marginTop: '10%'}}>
              <Button status='success' onPress={this.check}>Update</Button>
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
  loader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
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