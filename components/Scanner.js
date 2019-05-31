import { StyleSheet, Linking, Dimensions, LayoutAnimation, StatusBar, Text, View, Modal, ActivityIndicator, TouchableOpacity, Alert, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo';
import React, { Component, Fragment } from 'react';



export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastScannedUrl: null,
    }
  }

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data }, function (){
        Alert.alert(
          'Dieses Ticket abbuchen?',
          this.state.lastScannedUrl,
          [
            {
              text: 'ja',
              // onPress: () => Linking.openURL(this.state.lastScannedUrl),
              onPress: () => {
                this.props.abbuchen(this.state.lastScannedUrl)
              }
            },
            { text: 'nein', onPress: () => { this._handlePressCancel} },
          ],
          { cancellable: false }
        );
      });
      //this.props.buchen
      console.log('in handle Read!!!!!!');
      //_handlePressUrl();
  
    }
  };


  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };


  render() {
    return (
      <Modal style={styles.container} onRequestClose={this.props.closeScanner} animationType="slide">
        <Button
          title={'Close'}
          style={styles.input}
          onPress={this.props.closeScanner}
        />

        {this.props.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.props.hasCameraPermission === false
            ? <Text style={{ color: '#fff' }}>
              Camera permission is not granted
                      </Text>
            : <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
              }}
            />}

        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </Modal>
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
