import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Image, AsyncStorage } from 'react-native';
import { Text as TextN} from 'react-native';
import { mapping } from '@eva-design/eva';
import { light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Input, Icon, Text, Button } from 'react-native-ui-kitten';


const styles = StyleSheet.create({
  input: {
    marginHorizontal: 4,
    width: '70%'
  },
  button: {
    marginVertical: 4,
    marginHorizontal: 4,
    width: '70%',
    marginTop: '5%'
  },
});

const logo = require("../../assets/blabla_eat.png");
export default class SignIn extends Component {
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

  onPressSignIn = async () => {
    try {
      console.log("signin");
      let user = {
        fname:'foi',
        lname: 'foi',
        connected: true,
      }
      await AsyncStorage.setItem('User', JSON.stringify(user));
      this.props.navigation.navigate('Home');
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }

  render() {
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Layout style={{ height: '100%' }}>
        <View style={{marginTop: "20%", alignItems: 'center'}}>
              <Image
                  style={{width: 150, height: 150}}
                  source={logo}
              />
              <Text category='h6' style={{marginTop: "5%"}}>BlaBlaEat</Text>
              <Text appearance='hint' style={{marginTop: "2%"}}>Join the community</Text>
          </View>
          <View style={{ flex: 2, alignItems: 'center', marginTop: "20%" }}>
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
            <Button style={styles.button} status='info' onPress={() => this.onPressSignIn()}>Sign In</Button>
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