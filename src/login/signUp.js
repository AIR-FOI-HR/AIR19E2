import React, { Component } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { mapping } from '@eva-design/eva';
import { light as lightTheme } from '@eva-design/eva';
import { SocialIcon } from 'react-native-elements'
import { ApplicationProvider, Layout, Input, Icon, Button, Text } from 'react-native-ui-kitten';
import validator from "validator";


const styles = StyleSheet.create({
    input: {
      marginHorizontal: 4,
      width: '70%',
      marginTop: '2%'
    },
    button: {
        marginVertical: 4,
        marginHorizontal: 4,
        width: '70%',
        marginTop: '5%',
    },
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
        errors : {
            fName: false,
            lName: false,
            email : false,
            emailFormat: false,
            password: false,
            passwordRepeat: false,
        }
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
        const errors = this.validate(this.state);
        console.log(errors);
        this.setState({errors});
    }


    validate = (data) => {
        let errors = {};
        console.log(data);
        if (!validator.isEmail(data.email)) errors.emailFormat = true;
        if (!data.email) errors.email = true;
        if (!data.fName) errors.fName = true;
        if (!data.lName) errors.lName = true;
        if (!data.password) errors.password = true;
        if (!data.passwordRepeat) errors.passwordRepeat = true;
        console.log(errors);
        return errors;
    }


    renderIcon = (style) => {
      const iconName = this.state.visiblePassword ? 'eye-off' : 'eye';
      return (
        <Icon name={iconName}/>
      );
    };

    render() {
        return (
            <>
                    <Layout style={{height:'100%'}}>
            <KeyboardAvoidingView
                style={{flex:3.7}}
                behavior="padding"
                enabled
            >
                    <View style={{marginTop: "20%", alignItems: 'center'}}>
                        <Image
                            style={{width: 150, height: 150}}
                            source={logo}
                        />
                        <Text category='h6' style={{marginTop: "5%"}}>BlaBlaEat</Text>
                        <Text appearance='hint' style={{marginTop: "2%"}}>Join the community</Text>
                    </View>
                    <Layout style={{flex: 6, alignItems: 'center', marginTop: "3%"}}>
                        <View style={{ height:"100%", marginTop: "3%"}}>
                            <Input
                                style={styles.input}
                                value={this.state.fName}
                                onChangeText={this.onChangeFName}
                                status={this.state.errors.fName ? 'danger' : ''}
                                //caption={this.state.errors.fName ? 'Invalid value' : ''}
                                placeholder='First name'
                            />
                            <Input
                                style={styles.input}
                                value={this.state.lName}
                                onChangeText={this.onChangeLName}
                                status={this.state.errors.lName ? 'danger' : ''}
                                //caption={this.state.errors.lName ? 'Invalid value' : ''}
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
                                //status={this.state.errors.passwordRepeat ? 'danger' : ''}
                                caption={this.state.errors.passwordRepeat ? 'Invalid value' : ''}
                            />
                        </View>
                    </Layout>
                </KeyboardAvoidingView>
                <View style={{alignItems: 'center'}}>
                    <Button style={styles.button} status='info' onPress={this.onSignUp}>Sign Up</Button>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                    <Text appearance='hint'>Sign Up with </Text>
                    <View style={{flexDirection: 'row'}}>
                        {/* <SocialIcon type='facebook'/> */}
                        <SocialIcon type='google'/>
                    </View>
                </View>
                </Layout>
                </>
        )
    }
}