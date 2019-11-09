import React, { useState, useEffect } from 'react'
import  { Image,
          SafeAreaView, 
          StyleSheet,  
          Text, 
          View } from 'react-native'

import { YellowBox } from 'react-native'
import io from 'socket.io-client'
import logo from '../assets/logo.png'

YellowBox.ignoreWarnings([ 'Unrecognized WebSocket' ])

export default class Home extends React.PureComponent<any, any> {
  
    socket: any
    users: number[]

    constructor(props: any, navigation: any) {
        super(props)
        this.state = { 
            connected: false,
            pokemon: '',
        }

        this.socket = io('http://192.168.0.105:3003')
        this.socket.on('pokemon', pokemon => {
            this.setState({ pokemon })
        })
    }

    render() {
        const { pokemon, hasToken } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.logo} source={logo} />
                    <View style={styles.MainContainer}>
                        <Text>{ hasToken ? "NÓIS" : "VISH" }</Text>
                    </View>
            </SafeAreaView>
        )  
    }        
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
  },
})
