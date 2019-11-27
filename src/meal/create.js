import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { mapping } from '@eva-design/eva';
import { light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Button, Input, Text } from 'react-native-ui-kitten';
import DateTimePicker from "react-native-modal-datetime-picker";
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    input: {
        marginHorizontal: 4,
        marginTop: '5%'
    },
    button: {
        marginVertical: 4,
        marginHorizontal: 4,
        width: '70%',
        marginTop: '5%'
    },
    ScrollView: {
        alignItems: 'center',
        height: 1500,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    buttonList: {
        color: 'white',
    }
});

const mode = 'datetime';

export default class Create extends Component {
    state = {
        name: "",
        peopleMax: 0,
        description: "",
        priceMax: 0,
        priceMin: 0,
        duration: 0,
        place: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0,
        },
        startAt: new Date(),
        endAt: new Date(),

        newIngredient: "",
        ingredient: [],

        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0,
        },
        visible: false,
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = parseFloat(position.coords.latitude)
            let long = parseFloat(position.coords.longitude)

            let initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta:  0.0922,
                longitudeDelta: 0.0421,
            }

            this.setState({place: initialRegion})
            this.setState({region: initialRegion})
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    }

    onChangeInput = (e, index) => {
        switch (index) {
            case "name":
                this.setState({name: e});
                break;
            case "peopleMax":
                this.setState({peopleMax: parseInt(e, 10)});
                break;
            case "description":
                this.setState({description: e});
                break;
            case "priceMax":
                this.setState({priceMax: parseInt(e, 10)});
                break;
            case "priceMin":
                this.setState({priceMin: parseInt(e, 10)});
                break;
            case "duration":
                this.setState({duration: parseInt(e, 10)});
                break;
            case "place":
                this.setState({place: e});
                break;
            case "startAt":
                this.setState({startAt: e});
                break;
            case "endAt":
                this.setState({startAt: e});
                break;
            case "newIngredient":
                this.setState({newIngredient: e})
            default:
                break;
        }
    }

    addIngredient = () => {
        let tmp = this.state.ingredient;

        tmp.push(this.state.newIngredient);
        this.setState({ingredient: tmp});
        this.setState({newIngredient: ''});
    }

    removeIngredient = (e) => {
        let tmp = this.state.ingredient;

        tmp.splice(e, 1);
        this.setState({ingredient: tmp});
    }

    createMeal = () => {
        iState = this.state;
        Alert.alert(iState.name, "Description " + iState.description + ", for " + iState.peopleMax + " people.")
    };

    showDateTimePicker = () => {
        this.setState({ visible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ visible: false });
    };

    render() {
        return (
            <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <Layout style={styles.container}>
                    <View style={{marginTop: "30%", height: '100%', alignItems: 'center'}}>
                    <Text>Create your meal !</Text>
                    <ScrollView contentContainerStyle={styles.ScrollView}>
                        <Input
                            label='Title :'
                            style={styles.input}
                            value={this.state.name}
                            onChangeText={(e) => this.onChangeInput(e, "name")}
                            placeholder='Enter the title of the meal.'
                        />
                        <Input
                            keyboardType='numeric'
                            label='Maximum people :'
                            style={styles.input}
                            value={this.state.peopleMax.toString()}
                            onChangeText={(e) => this.onChangeInput(e, "peopleMax")}
                            placeholder='Enter the number of people that could come to the meal.'
                        />
                        <Input
                            label='Description :'
                            style={styles.input}
                            value={this.state.description}
                            onChangeText={(e) => this.onChangeInput(e, "description")}
                            placeholder='Enter the description of the meal.'
                        />
                        <Input
                            keyboardType='numeric'
                            label='Maximum price :'
                            style={styles.input}
                            value={this.state.priceMax.toString()}
                            onChangeText={(e) => this.onChangeInput(e, "priceMax")}
                            placeholder='Enter the maximum amount of money you could ask for the meal.'
                        />
                        <Input
                            keyboardType='numeric'
                            label='Minimum price :'
                            style={styles.input}
                            value={this.state.priceMin.toString()}
                            onChangeText={(e) => this.onChangeInput(e, "priceMin")}
                            placeholder='Enter the minimum amount of money you could ask for the meal.'
                        />
                        <Input
                            keyboardType='numeric'
                            label='Duration :'
                            style={styles.input}
                            value={this.state.duration.toString()}
                            onChangeText={(e) => this.onChangeInput(e, "duration")}
                            placeholder='Enter the duration time of the meal.'
                        />
                        <Text>Ingredient :</Text>
                        {
                            this.state.ingredient.map((txt, index) => (
                                <Button
                                    key={index}
                                    style={styles.buttonList}
                                    onPress={() => this.removeIngredient(index)}
                                >
                                {txt}
                                </Button>
                            ))
                        }
                        <Input
                            label='Ingredient :'
                            style={styles.input}
                            value={this.state.newIngredient}
                            onChangeText={(e) => this.onChangeInput(e, "newIngredient")}
                            placeholder='Enter the ingredient of the meal.'
                        />
                        <Button
                            onPress={() => this.addIngredient()}
                            style={styles.button}>
                                Add ingredient
                        </Button>
                        <Text
                            style={styles.input}
                        >
                            {"Start at : " + this.state.startAt.getMonth() +"/"+ this.state.startAt.getDate() +"/"+ this.state.startAt.getFullYear() +" - "+ this.state.startAt.getHours() +":"+ this.state.startAt.getMinutes()}
                        </Text>
                        <DateTimePicker
                            mode={mode}
                            isVisible={this.state.visible}
                            value={this.state.startAt}
                            onConfirm={(e) => this.onChangeInput(e, "startAt")}
                            onCancel={this.hideDateTimePicker}
                        />
                        <Button
                            onPress={this.showDateTimePicker}
                            style={styles.button}
                            >
                            Change Date
                        </Button>
                        <View style={{height: '25%', width: '100%'}}>
                            <MapView
                                style={styles.map}
                                region={this.state.region}
                            >
                                <MapView.Marker
                                    draggable
                                    coordinate= {{
                                        latitude: this.state.place.latitude,
                                        longitude: this.state.place.longitude,
                                    }}
                                    onDragEnd={(e) => this.onChangeInput(e.nativeEvent.coordinate, "place")}
                                />
                            </MapView>
                        </View>
                        <Button
                            onPress={() => this.createMeal()}
                            style={styles.button}
                            status='info'>
                            press me !
                        </Button>
                    </ScrollView>
                    </View>
                </Layout>
            </ApplicationProvider>
        )
    }
};