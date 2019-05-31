import { StyleSheet, Linking, Dimensions, LayoutAnimation, StatusBar, Text, View, ActivityIndicator, TouchableOpacity, Alert, Button, TextInput } from 'react-native';
import React, { Component, Fragment } from 'react';



export default class Array extends Component {

    render() {
         return this.props.tickets.map(function (ticket, i) {
            return (
              <Fragment key={i}>
      
                <Text >TicketKategorie : {ticket.kategorie}</Text>
                <Text > Datum und Türöffnung {ticket.gueltig_datum}</Text>
                <Text >Verkauft {ticket.verkauft}</Text>
                <Text >Eingescannt {ticket.abbgebucht}</Text>
      
              </Fragment>
            )
          });
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
  