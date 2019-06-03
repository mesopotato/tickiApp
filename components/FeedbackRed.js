import { StyleSheet, Linking, Dimensions, LayoutAnimation, StatusBar, Text, View, ActivityIndicator, TouchableOpacity, Alert, Button, TextInput, Modal } from 'react-native';
import React, { Component, Fragment } from 'react';

export default class FeedbackGreen extends Component {

    render() {
        return (
            <Modal style={styles.container} onRequestClose={this.props.logout} animationType="slide">
                {/* <Text>Ticket : {this.props.ticket.kategorie}</Text> */}
                {/* <Text>Veranstalter :{this.props.tickets[0].kategorie} </Text> */}
                <Text>Achtung!!</Text>
                <Button
                    title={'OK'}
                    style={styles.input}
                    onPress={this.props.confirm}
                />

                {/* {this._maybeRenderUrl()} */}
                {/* <StatusBar hidden /> */}
            </Modal>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e51709',
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
