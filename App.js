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
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      didError: false,
      tokenDa: false,
      title: '',
      veranstalter: '',
      name: '',
      password: '',
      tickets: [],
      scanner: false,
      token: '',
    }
  }

  openScanner = () => {
    this.setState({ scanner: true }, () => {
      console.log('scanner ist currently: ' + this.state.scanner);
      console.log('tickets sind :' + this.state.tickets[0].kategorie)
      console.log('tickets sind :' + this.state.tickets[1].kategorie)
      console.log('tickets anzahl sind :' + this.state.tickets[0].anzahl)
    })
  }

  setLoading = () => {
    this.setState({ loading: true }, () => this.onLogin())
  }

  onLogin = async () => {
    try {
      console.log('loading ist t:' + this.state.loading)
      const { name, password } = this.state;
      //const answer = await this.props.loginNow(name, password);
      const response = await fetch(`http://10.0.2.2:3000/api/login/${name}&${password}`);
      const answer = await response.json();
      // .then(res => res.json())
      // .then(res => this.setState({ res: res }));
      if (answer.user == 'NO') {
        this.setState({
          wrongUserName: true,
          loading: false
        }, function () {
          console.log('wrong user name loading must be false :' + this.state.loading)
          Alert.alert('Login ist fehlgeschlagen, versuchen Sie es noch einmal oder wenden Sie sich an den Veranstalter');
        })

      }
      if (answer.user == 'MISMATCH') {
        this.setState({
          wrongPwd: true,
          loading: false
        }, function () {
          console.log('wrong password loading must be : ' + this.state.loading)
          Alert.alert('Login ist fehlgeschlagen, versuchen Sie es noch einmal oder wenden Sie sich an den Veranstalter');
        })

      }
      if (answer.user == 'OK') {
        console.log('answer .user is true');
        this.setState({
          //tickets: answer.tickets,
          title: answer.event.title,
          veranstalter: answer.event.veranstalter,
          token: answer.token.token,
          tokenDa: true,
          //loading: false,
        }, function () {
          //console.log('tikest set sind :' + this.state.tickets[0].kategorie)
          console.log('token ist : ' + this.state.token);

          console.log('title ist :' + this.state.title)
          this.setState({
            tickets: answer.tickets,
            loading: false
          }, function () {
            console.log('tikest set sind :' + this.state.tickets[0].kategorie)
            console.log('loading ist ' + this.state.loading);
          });
        })
      }
    }
    catch{
      console.log('in CATCH ERROR')
      this.setState({
        loading: false
      }, function () {
        console.log('loading must be : ' + this.state.loading)
        Alert.alert('Login ist fehlgeschlagen, versuchen Sie es noch einmal oder wenden Sie sich an den Veranstalter');
      })
    }
  }

  // async componentDidMount() {
  //   //this.setState({ loading: true });
  //   //const data = await this.props.fetchTickets();
  //   //this.setState({ loading: false });
  // }
  renderArray() {
    return this.state.tickets.map(function (ticket, i) {
      return (
        <View key={i}>
          
            <Text >TicketKategorie : {ticket.kategorie}</Text>
            <Text > Datum und Türöffnung {ticket.gueltig_am}</Text>
            <Text >Verkauft {ticket.verkauft}</Text>
            <Text >Eingescannt {ticket.abbgebucht}</Text>
          
        </View>
      )
    });

    // return (<div>
    //   {this.state.tickets.map((ticket, index) => (
    //     <p>Hello, {ticket.kategorie}!</p>
    //   ))}
    // </div>);
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    //token da && scanner false ??
    return this.state.tokenDa ? (
      <View style={styles.container}>
        <Text>Event Title : {this.state.title}</Text>
        <Text>Veranstalter :{this.state.tickets[0].kategorie} </Text>

        <Button
          title={'Scannen'}
          style={styles.input}
          onPress={this.openScanner}

        />
         {this.renderArray()}  
        <div>
          {this.state.tickets.map((ticket, index) => (
            <Text>Hello, {ticket.kategorie}!</Text>
          ))}
        </div>

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
            onPress={this.setLoading.bind(this)}
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
