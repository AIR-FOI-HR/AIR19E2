import React, { Component } from 'react';
import { Layout, Button, Icon, Text } from 'react-native-ui-kitten';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-ui-kitten';

const user = {
  email: "test@test.test",
  fName: "Antoine",
  lName: "Briaux",
  phone: "+331097829"
}

const editIcon = (style) => (
  <Icon name="edit-outline" width={32} height={32}></Icon>
)

export default class Profil extends Component {

  state = {
    editing: false,
  }

  render() {
    return (
      <Layout>
        <View style={styles.view}>
          <Button style={styles.editButton} appearance="ghost" icon={editIcon}
            onPress={() => console.log(this.state.editing)}> </Button>
          <Text>Email:</Text>
          <Input value={user.email} disabled={!this.state.editing} />
          <Text>First name:</Text>
          <Input value={user.fName} disabled={!this.state.editing} />
          <Text>Last Name:</Text>
          <Input value={user.lName} disabled={!this.state.editing} />
          <Text>Phone number:</Text>
          <Input value={user.phone} disabled={!this.state.editing} />
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
    width: "100%",
    flex: 2,
    // alignItems: 'center',
    marginTop: '5%',
  },
  editButton: {
    alignSelf: "flex-end"
  }
})