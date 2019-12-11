import React, { Component } from 'react';
import { View, StyleSheet, Text as TextN } from 'react-native';
import "firebase/auth";
import firebase from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
import { FirebaseAuthProvider, IfFirebaseUnAuthed } from '@react-firebase/auth';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Input, Icon, Text, Button } from 'react-native-ui-kitten';

firebase.initializeApp(firebaseConfig);

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

    render() {
        return (
            <ApplicationProvider mapping={mapping} theme={lightTheme}>
                <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
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
                            <IfFirebaseUnAuthed>
                                <Button
                                    onPress={() => {
                                        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                                        firebase.auth().signInWithPopup(googleAuthProvider);
                                    }}>
                                    Sign in with Google
                                </Button>
                            </IfFirebaseUnAuthed>
                            <Text appearance='hint' category='c1' style={{ marginTop: '5%' }}>
                                FORGOT PASSWORD ?
                            </Text>
                            <Button style={styles.button} status='info' onPress={() => this.props.navigation.navigate('Home')}>
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
                </FirebaseAuthProvider>
            </ApplicationProvider>
        )
    }
}