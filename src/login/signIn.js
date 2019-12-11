import React, { Component } from 'react';
import { View, StyleSheet, Text as TextN } from 'react-native';
import "firebase/auth";
import firebase from "firebase/app";
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Input, Icon, Text, Button } from 'react-native-ui-kitten';


const styles = StyleSheet.create({
    input: {
        marginHorizontal: 4,
        width: '70%'
    },
    button: {
        marginVertical: 4,
        width: '70%',
        marginTop: '5%'
    },
});

const logo = require("../../assets/blabla_eat.png");
export default class SignIn extends Component {

  componentWillMount() {
    this.unsuscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("Hello", firebase.auth().currentUser);
        this.props.navigation.navigate('Home');
      } else {
        console.log("Nobody");
      }
    })
  }

  componentWillUnmount() {
    this.unsuscribe();
  }

  state = {
    email: "",
    password: "",
    visiblePassword: true,
  }

  onChangeEmail = (email) => {
    this.setState({ email });
  }

  onChangePassword = (password) => {
    this.setState({ password });
  };

  onIconPress = () => {
    const visiblePassword = !this.state.visiblePassword;
    this.setState({ visiblePassword });
  };

  renderIcon = (style) => {
    const iconName = this.state.visiblePassword ? 'eye-off' : 'eye';
    return (
      <Icon name={iconName} />
    );
  };

  signIn = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
      console.log(error.code, error.message);
    })
  }

  render() {
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Layout style={{ height: '100%' }}>
          <View style={{ flex: 2, alignItems: 'center', marginTop: "30%" }}>
            <Input
              style={styles.input}
              value={this.state.email}
              onChangeText={this.onChangeEmail}
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
            />
            <Text appearance='hint' category='c1' style={{ marginTop: '5%' }}>
              FORGOT PASSWORD ?
                            </Text>
            <Button style={styles.button} status='info' onPress={() => this.signIn()}>
              Sign In
                            </Button>
            <Text appearance='hint' style={{ marginTop: '10%' }}>
              Don't have an account ? {" "}
              <TextN style={{ textDecorationLine: 'underline' }} onPress={() => this.props.navigation.navigate('SignUp')}>
                SIGN UP
                                </TextN>
            </Text>
          </View>
        </Layout>
      </ApplicationProvider>
    )
  }
}