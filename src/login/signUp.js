import React, { Component } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Layout, Input, Icon, Button, Text } from 'react-native-ui-kitten';
import validator from "validator";
import firebase from "firebase/app";



const styles = StyleSheet.create({
  input: {
    width: '90%',
    marginTop: '2%'
  },
  button: {
    width: '90%',
    marginTop: '10%',
  },
  ScrollView: {
    height: 400,
    width: 260,
  }
});

const logo = require("../../assets/blabla_eat.png");

export default class SignUp extends Component {
  state = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    passwordRepeat: "",
    visiblePassword: true,
    visiblePasswordRepeat: true,
    errors: {
      fName: false,
      lName: false,
      email: false,
      emailFormat: false,
      password: false,
      passwordRepeat: false,
    }
  }

  componentWillMount() {
    this.unsuscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("Hello", firebase.auth().currentUser);
        this.props.navigation.navigate('App');
      } else {
        console.log("Nobody");
      }
    })
  }

  componentWillUnmount() {
    this.unsuscribe();
  }

  onChangeFName = (fName) => {
    this.setState({ fName });
  }

  onChangeLName = (lName) => {
    this.setState({ lName });
  }

  onChangeEmail = (email) => {
    this.setState({ email });
  }

  onChangePassword = (password) => {
    this.setState({ password });
  };
  onChangePasswordRepeat = (passwordRepeat) => {
    this.setState({ passwordRepeat });
  };

  onIconPress = () => {
    const visiblePassword = !this.state.visiblePassword;
    this.setState({ visiblePassword });
  };

  onSignUp = () => {
    this.validate();
    if (!Object.values(this.state.errors).includes(true)) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          firebase.auth().currentUser.updateProfile({
            displayName: `${this.state.fName} ${this.state.lName}`,
          }).catch(e => console.log(e));
        })
        .catch(err => {
          console.log(err.code, err.message);
        })
    }
  }


  validate = () => {
    let errors = {};
    if (!validator.isEmail(this.state.email)) errors.emailFormat = true;
    if (!this.state.email) errors.email = true;
    if (!this.state.fName) errors.fName = true;
    if (!this.state.lName) errors.lName = true;
    if (!this.state.password) errors.password = true;
    if (!this.state.passwordRepeat) errors.passwordRepeat = true;
    this.setState({ errors });
  }


  renderIcon = (style) => {
    const iconName = this.state.visiblePassword ? 'eye-off' : 'eye';
    return (
      <Icon name={iconName} />
    );
  };

  render() {
    return (
      <>
          <KeyboardAvoidingView
            style={{ flex: 3.7 }}
            behavior="position"
            enabled
          >
        <Layout style={{ height: '100%', width: '100%' }}>
            <View style={{ marginTop: "20%", alignItems: 'center' }}>
              <Image
                style={{ width: 150, height: 150 }}
                source={logo}
              />
              <Text category='h6' style={{ marginTop: "5%" }}>BlaBlaEat</Text>
              <Text appearance='hint' style={{ marginTop: "2%" }}>Join the community</Text>
            </View>
            <Layout style={{ flex: 1, marginTop: "3%",alignItems: 'center'}}>
              <View >
              <ScrollView contentContainerStyle={styles.ScrollView} showsVerticalScrollIndicator={false}>
                <View >
                <Input
                  style={styles.input}
                  value={this.state.fName}
                  onChangeText={this.onChangeFName}
                  status={this.state.errors.fName ? 'danger' : ''}
                  caption={this.state.errors.fName ? 'Invalid value' : ''}
                  placeholder='First name'
                />
                <Input
                  style={styles.input}
                  value={this.state.lName}
                  onChangeText={this.onChangeLName}
                  status={this.state.errors.lName ? 'danger' : ''}
                  caption={this.state.errors.lName ? 'Invalid value' : ''}
                  placeholder='Last name'
                />
                <Input
                  style={styles.input}
                  value={this.state.email}
                  onChangeText={this.onChangeEmail}
                  status={this.state.errors.email ? 'danger' : ''}
                  caption={this.state.errors.email ? 'email already taken' : ''}
                  placeholder='email'
                />
                <Input
                  style={styles.input}
                  value={this.state.password}
                  placeholder='password'
                  icon={this.renderIcon}
                  secureTextEntry={this.state.visiblePassword}
                  onIconPress={this.onIconPress}
                  onChangeText={this.onChangePassword}
                  status={this.state.errors.password ? 'danger' : ''}
                  caption={this.state.errors.password ? 'Invalid value' : ''}
                />
                <Input
                  style={styles.input}
                  value={this.state.passwordRepeat}
                  placeholder='repeat password'
                  icon={this.renderIcon}
                  secureTextEntry={this.state.visiblePasswordRepeat}
                  onIconPress={this.onIconPress}
                  onChangeText={this.onChangePasswordRepeat}
                  status={this.state.errors.passwordRepeat ? 'danger' : ''}
                  caption={this.state.errors.passwordRepeat ? 'Invalid value' : ''}
                />
                </View>
                <Button style={styles.button} status='info' onPress={this.onSignUp}>Sign Up</Button>
                </ScrollView>
              </View>
            </Layout>
        </Layout>
        </KeyboardAvoidingView>
      </>
    )
  }
}