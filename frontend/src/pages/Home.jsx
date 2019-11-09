import React, { useState, useEffect } from 'react'
import  { Image,
          SafeAreaView, 
          Stylesheet,  
          Text, 
          View } from 'react-native'
import CardView from 'react-native-cardview'

import logo from '../assets/logo.png';

export default function Home ({ navigation }) {
  
  return (

    <SafeAreaView style={styles.container}>
      <Image source={logo} />
      <View style={styles.MainContainer}>
        <CardView
          cardElevantion={5}
          cardMaxElevation={5}
          cornerRadius={5}
          style={styles.cardViewStyle}
        >
            <Text style={styles.cardView_InsideContent}>Simple Example  </Text>
        </CardView>
      </View>
    </SafeAreaView>
  );  
}


const styles = Stylesheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
})