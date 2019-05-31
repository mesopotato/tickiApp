import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { Component} from 'react';



export default class Loading extends Component {

  render() {
    if (this.props.visible == false) {
      return null;
    }
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
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
  }
});
