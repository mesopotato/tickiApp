import { StyleSheet, Linking, Dimensions, LayoutAnimation, StatusBar, Text, View, ActivityIndicator, TouchableOpacity, Alert, Button, TextInput, Modal } from 'react-native';
import React, { Component, Fragment } from 'react';
import Array from './Array';

export default class Overview extends Component {

    render() {
        return (
            <Modal style={styles.container} onRequestClose={this.props.logout} animationType="slide">
              <Text>Event Title : {this.props.title}</Text>
              {/* <Text>Veranstalter :{this.props.tickets[0].kategorie} </Text> */}
      
              <Button
                title={'Scannen'}
                style={styles.input}
                onPress={this.props.openScanner}
              />
              
              <Array tickets={this.props.tickets}/>
              {/* {this._maybeRenderUrl()} */}
              <StatusBar hidden />
            </Modal>
          )
    }

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#2FD566',
      padding: 20
    },
    buttonText: {
      color: '#000',
      fontSize: 20
    },
    userInfo: {
      height: 250,
      width: 200,
      alignItems: 'center',
    },
    userInfoText: {
      color: '#fff',
      fontSize: 18
    },
    errorText: {
      color: '#fff',
      fontSize: 18
    },
    profileImage: {
      height: 64,
      width: 64,
      marginBottom: 32
    }
  });
  