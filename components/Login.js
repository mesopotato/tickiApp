import { StyleSheet, Linking, Dimensions, LayoutAnimation, StatusBar, Text, View, ActivityIndicator, TouchableOpacity, Alert, Button, TextInput } from 'react-native';
import React, { Component, Fragment } from 'react';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        }
    }

    render() {
        const {visible, onLogin} = this.props;
        const {name, password} = this.state;
        if (visible == true){
            return null;
        }
        return (
            <View style={styles.container}>

                <TextInput
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                    placeholder={'Username'}
                    style={styles.input}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />

                <Button
                    title={'Login'}
                    style={styles.input}
                    onPress={() => onLogin(
                        name, password
                    )}
                />
            </View>
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
