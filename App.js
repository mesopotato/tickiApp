import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Alert, Button, TextInput } from 'react-native';


import { FontAwesome } from '@expo/vector-icons';

import { fetchTickets } from './constants/api';
import { loginNow } from './constants/api';


export default class App extends React.Component {
  static defaultProps = {
    //fetchTickets
    loginNow
  }

  state = {
    loading: false,
    didError: false,
    tokenDa: false,
    event: {},
    name: '',
    password: '',
    tickets: [],
    scanner: false,
  }
  async onLogin() {
    this.setState({ loading: true });
    const { name, password } = this.state;

    //Alert.alert('Credentials', `${name} + ${password}`);
    console.log('test in onLogin');
    const answer = await this.props.loginNow(name, password);
    console.log('answer ist : ' + answer);
    if (answer.user == 'NO') {
      this.setState({ wrongUserName: true })
      console.log('wrong user name')
      Alert.alert('Login ist fehlgeschlagen, versuchen Sie es noch einmal oder wenden Sie sich an den Veranstalter');
    }
    if (answer.user == 'MISMATCH') {
      this.setState({ wrongPwd: true })
      console.log('wrong password')
      Alert.alert('Login ist fehlgeschlagen, versuchen Sie es noch einmal oder wenden Sie sich an den Veranstalter');
    }
    if (answer.token) {
      this.setState({ token: answer.token })
      console.log('token ist : '+ this.state.token.token)
      this.setState({event: answer.event})
      console.log('event ost :' + this.state.event.title)
      this.setState({tickets: answer.tickets})
      console.log('tickest sind: '+ this.state.tickets[0].kategorie)
      this.setState({ tokenDa: true })
      console.log('token da ?' + this.state.tokenDa)
    }
    console.log('if are done')
    this.setState({ loading: false })
  }
  openScanner() {
    this.setState({scanner: true})
  }

  async componentDidMount() {
    this.setState({ loading: true });
    //const data = await this.props.fetchTickets();
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      loadingView();
    }

    //token da && scanner false ??
    return this.state.tokenDa ? (
      <View style={styles.container}>
        <Text>Event Title : {this.state.event.title}</Text>
        <Text>Veranstalter</Text>
        
      <Button
        title={'Scannen'}
        style={styles.input}
        onPress={this.openScanner}
      />
        {this.state.tickets.map((ticket, i) => (
          <div key={i}>
            <Text >TicketKategorie : {ticket.kategorie}</Text>
            <Text > Datum und Türöffnung {ticket.gueltig_am}</Text>
            <Text >Verkauft {ticket.verkauft}</Text>
            <Text >Eingescannt {ticket.abbgebucht}</Text>
          </div>
        ))}
      </View>
    ) : (
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

      )
  };


};

displayMainview = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
displayMainviewwithfetch = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {this.state.events.map((event, i) => (
        <Text key={i}>{event.title}</Text>
      ))}
    </View>
  );
}

displayLoginView = () => {
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
      <ActivityIndicator size='large' />
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
