import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Alert, Button, TextInput } from 'react-native';


import { FontAwesome } from '@expo/vector-icons';

import {fetchTickets } from './constants/api';
import {loginNow } from './constants/api';


export default class App extends React.Component {
  static defaultProps = {
    //fetchTickets
    loginNow
  }

  state = {
    loading: false,
    events: [],
    didError: false
  }
  async onLogin() {
    this.setState({loading: true});
    const { name, password } = this.state;
    
    //Alert.alert('Credentials', `${name} + ${password}`);
    console.log('test in onLogin');
    const answer = await this.props.loginNow(name, password);
    if (answer.user == 'NO'){
      this.setState({wrongUserName: true})
    }
    if (answer.user == 'MISMATCH'){
      this.setState({wrongPwd: true})
    }
    if(answer.token){
      this.setState({token: answer.token})
    }
    this.setState({ loading: false})
  }

  async componentDidMount() {
    this.setState({loading: true});
    //const data = await this.props.fetchTickets();
    this.setState({ loading: false});
  }

  render() {
    if (this.state.loading){
      loadingView();
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
          onPress={this.onLogin.bind(this)}
        />
      </View>
    );
  }
};

displayMainview = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {this.state.events.map((event, i) => (
        <Text key={i}>{event.title}</Text>
      ))}
    </View>
  );
}

displayError = () => {
  return (
    <View style={styles.userInfo}>
      <Text style={styles.errorText}>
        There was an error, please try again.
      </Text>
    </View>
  );
}

loadingView = () => {
  return (
      <View style={styles.container}>
        <ActivityIndicator size='large'/>
      </View>  
  );
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
