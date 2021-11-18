import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, Image} from 'react-native';
import firebase from 'firebase';
import {db, auth} from '../firebase/config';


class Buscador extends Component{
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            userData: '',
            errorMessage: '',
            errorCode:'',
        }
    }

    render(){
        return(
            <View style= {styles.container}>
            
            </View>
          
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
})


export default Buscador;