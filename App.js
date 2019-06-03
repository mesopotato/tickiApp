
import { StyleSheet, Linking, Dimensions, LayoutAnimation, StatusBar, Text, View, ActivityIndicator, TouchableOpacity, Alert, Button, TextInput } from 'react-native';
import React, { Component } from 'react';
import { Permissions } from 'expo';
import Loading from './components/Loading';
import Scanner from './components/Scanner';
import Overview from './components/Overview';
import FeedbackGreen from './components/FeedbackGreen';
import FeedbackRed from './components/FeedbackRed';

import { FontAwesome } from '@expo/vector-icons';

import { fetchTickets } from './constants/api';
import { loginNow } from './constants/api';
import Login from './components/Login';


export default class App extends Component {
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
      hasCameraPermission: null,
      lastScannedUrl: null,
    }
  }
  componentDidMount() {
    //   //this.setState({ loading: true });
    //   //const data = await this.props.fetchTickets();
    //   //this.setState({ loading: false });
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  render() {
    if (this.state.loading == true) {
      return (
        <Loading
          visible={this.state.loading} />
      )
    }
    if (this.abbgebucht == true) {
      return (
        <FeedbackGreen
          visible={this.state.abbgebucht}
          ticket={this.state.scannedTicket}
          cancel={this.cancelTicket}
          confirm={this.confirmTicket} />
      )
    }
    if (this.ungueltig == true) {
      return (
        <FeedbackRed
          visible={this.state.ungueltig}
          confirm={this.confirmTicket} />
      )
    }
    if (this.state.scanner == true) {
      return (
        <Scanner
          visible={this.state.scanner}
          closeScanner={this.closeScanner}
          hasCameraPermission={this.state.hasCameraPermission}
          abbuchen={this.setAbbuchen} />
      )
    }
    if (this.state.tokenDa) {
      return (
        <Overview
          title={this.state.title}
          tickets={this.state.tickets}
          openScanner={this.openScanner}
          logout={this.logout} 
          gescanned={this.state.gescanned}/>
      )
    } else {
      return (
        <Login
          visible={this.state.tokenDa}
          onLogin={this.setLoading} />
      )
    }
  };

  logout = () => {
    this.setState({ tokenDa: false }, () => {
      console.log('scanner ist currently: ' + this.state.scanner);
    })
  }
  cancelTicket = () => {
    this.setState({ loading: true }, () => this.cancel())
  }
  cancel = async () => {
    try{
      const response = await fetch(this.state.lastScannedUrl +'&CANCEL')
      const answer = await response.json();
      if (answer.status == 'OK'){

      }
      if (answer.status == 'NOK'){

      }
    }catch{

    }
  }

  confirmTicket = () => {
    this.setState({

    })

  }

  setLoading = (name, password) => {
    this.setState({ loading: true }, () => this.onLogin(name, password))
  }

  setAbbuchen = (url) => {
    this.setState({ loading: true }, () => this.abbuchen(url))
  }

  abbuchen = async (url) => {
    try {
      console.log('in abbuchen url ist :' + url);
      console.log('mit token wäre: ' + url + '&' + this.state.token)
      const response = await fetch(url);
      const answer = await response.json();
      if (answer.status == 'OK') {
        this.setState({
          abbgebucht: true,
          loading: false,
          lastScannedUrl: url,
          scannedTicket: answer.ticket,
          gescanned: answer.ticket.abbgebucht
        })
      }
      if (answer.status == 'noTicket') {
        this.setState({
          abbgebucht: false,
          ungueltig: true,
          loading: false
        })
      }
      if (answer.status == 'noToken') {
        this.setState({
          abbgebucht: false,
          tokenDa: false,
          token: '',
          loading: false
        })
      }
    } catch{
      console.log('in CATCH ERROR')
      this.setState({
        loading: false,
        lastScannedUrl: '',
        abbgebucht: false
      }, function () {
        console.log('loading must be : ' + this.state.loading)
        Alert.alert('Buchung ist fehlgeschlagen, versuchen Sie es noch einmal oder wenden Sie sich an den Veranstalter');
      })

    }
  }

  onLogin = async (name, password) => {
    try {
      console.log('loading ist t:' + this.state.loading)
      //const { name, password } = this.state;
      //const answer = await this.props.loginNow(name, password);
      //heir für emulator 
      //const response = await fetch(`http://10.0.2.2:3000/api/login/${name}&${password}`);
      // heir für expo app
      const response = await fetch(`http://192.168.1.149:3000/api/login/${name}&${password}`);
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
            this._requestCameraPermission();
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

  openScanner = () => {
    this.setState({ scanner: true }, () => {
      console.log('scanner ist currently: ' + this.state.scanner);
    })
  }

  closeScanner = () => {
    this.setState({ scanner: false }, () => {
      console.log('scanner ist currently: ' + this.state.scanner);
    })
  }
};

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
