import React, { useState, useEffect } from 'react'
import { withNavigation } from 'react-navigation'
import { Image,
         StyleSheet,
         Text,
         TouchableOpacity,
         View, } from 'react-native'


const capturePokemon = () => {
    alert("Pokémon Captured!")
}
function CardPokemon({ pokemon }, isLocked) {

    return ( 
        <View style={styles.container}>
            <View
                style={styles.card}
            >
                <Image source={{uri: 'http://i.imgur.com/91AR0Lo.jpg'}} style={styles.cardImage} />
                <View>
                <Image 
                    source={ (isLocked) ? require('../assets/locked_padlock.png') :
                        require('../assets/unlocked_padlock.png') }
                    style={styles.padlock}                
                />
                <TouchableOpacity 
                    activeOpacity={ .5 } 
                    onPress={capturePokemon} 
                >                    
                    <Image 
                        source={ require('../assets/pokeball.jpg') }
                        style={styles.pokeball}                
                    />
                </TouchableOpacity>
                    <Text style={styles.textLeft}>Rabbit, 10</Text>
                    <Text style={styles.textRight}>1 Connection</Text>
                </View>
            </View>
        </View>  
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        borderWidth: 3,
        borderRadius: 3,
        borderColor: '#000',
        width: 200,
        height: 250,
        padding: 10
    },
    cardImage: {
        height: 260,
    },
    padlock: {
        height: 50,
        width: 50,
        alignSelf: 'flex-start'
    },
    pokeball: {
        height: 50,
        width: 50,
        alignSelf: 'flex-end'
    },
    textLeft: {
        position: 'absolute',
        left:0,
        top:0
    },
    textRight: {
        position: 'absolute',
        right: 0,
        top: 0
    ,}
})

export default withNavigation(CardPokemon);