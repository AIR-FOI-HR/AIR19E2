import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { mapping } from '@eva-design/eva';
import { light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Button, Input, Datepicker, Text } from 'react-native-ui-kitten';

const styles = StyleSheet.create({
    input: {
        marginHorizontal: 4,
        width: '70%',
        marginTop: '5%'
    },
    button: {
        marginVertical: 4,
        marginHorizontal: 4,
        width: '70%',
        marginTop: '5%'
    },
});

export default class Create extends Component {
    state = {
        title: "",
        description: "",
        recipe: [],
        ingredient: [],
        place: 0,
        // date: Date.now(),
        // location: ,
    }

    onChangeInput = (e, index) => {
        switch (index) {
            case "title":
                this.setState({title: e});
                break;
            case "description":
                this.setState({description: e});
                break;
            case "place":
                this.setState({place: parseInt(e, 10)});
                break;
            default:
                break;
        }
    }

    onSelect = (e) => {
        this.setState({ date: e})
    }

    render() {
        return (
            <ApplicationProvider mapping={mapping} theme={lightTheme}>
                <Layout style={{height:'100%'}}>
                    <View style={{marginTop: "30%", alignItems: 'center'}}>
                        <Text>Create your meal !</Text>
                        <Input
                            // keyboardType='numeric'
                            label='Meal title :'
                            style={styles.input}
                            value={this.state.title}
                            onChangeText={(e) => this.onChangeInput(e, "title")}
                            placeholder='Enter the title of the meal.'
                        />
                        <Input
                            label='Meal description :'
                            style={styles.input}
                            value={this.state.description}
                            onChangeText={(e) => this.onChangeInput(e, "description")}
                            placeholder='Enter the description of the meal.'
                        />
                        <Input
                            keyboardType='numeric'
                            label='Maximum people :'
                            style={styles.input}
                            value={this.state.place.toString()}l
                            onChangeText={(e) => this.onChangeInput(e, "place")}
                            placeholder='Enter the number of people that could come to the meal.'
                        />
                        {/* <Datepicker
                            date={this.state.date}
                            onSelect={this.onSelect}
                        /> */}
                        <Button
                        onPress={() => Alert.alert('Simple Button pressed')}
                        style={styles.button}
                        status='info'
                        >press me !</Button>
                    </View>
                </Layout>
            </ApplicationProvider>
        )
    }
};