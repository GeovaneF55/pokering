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
                        onPress={ capturePokemon }  
                    >                    
                        <Image 
                            source={ require('../assets/pokeball.jpg') }
                            style={styles.pokeball}                
                        />
                    </TouchableOpacity>
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
        borderWidth: 2,
        borderRadius: 3,
        borderColor: '#000',
        width: 300,
        height: 300,
        padding: 10
    },
    cardImage: {
        height: 250,
    },
    padlock: {
        position: 'absolute',
        left: 0,
        top: 1,
        height: 50,
        width: 50,
    },
    pokeball: {
        position: 'absolute',
        right: 0,
        top: 1,
        height: 50,
        width: 50,
    },
})

export default withNavigation(CardPokemon);
