import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'
import StateCounter from './StateCounter'

// import PouchDB from 'pouchdb-react-native'
// const localDB = new PouchDB('myDB')

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <StateCounter />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})