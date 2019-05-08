import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {fetchTickets } from './constants/api';

export default class App extends React.Component {
  static defaultProps = {
    fetchTickets
  }

  state = {
    loading: false,
    tickets: []
  }

  async componentDidMount() {
    this.setState({loading: true});
    const data = await this.props.fetchTickets();
    this.setState({ loading: false, tickets: data.tickets });
  }
  render() {
    if (this.state.loading){
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        {this.state.tickets.map((events, i) => (
          <Text key={i}>{events.title}</Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
