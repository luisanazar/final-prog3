import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

class Buscador extends Component{
    constructor(props){
        super(props);
        this.state = {
            search:''
        }
    }

    render(){
        return(
            <View style= {styles.containerBuscador}>
               
                <TextInput
                style= {styles.input}
                onChangeText={(texto)=>this.setState ({search: texto})}
                placeholder= 'Buscar'
                keyboardType='default' />
  
            <TouchableOpacity style= {styles.botonBuscar} onPress={() => this.props.buscar (this.state.search)}> 
            <Text>Buscar</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.botonMostrarTodo} onPress={() => this.props.mostrarTodo()}> 
            <Text>Mostrar todos los posteos</Text>
            </TouchableOpacity>  
            </View>
          
        )
    }
}
const styles = StyleSheet.create({
   containerBuscador:{
        paddingHorizontal: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginRight: 10,
        marginTop: 15,
        paddingTop: 2,
        paddingBottom: 2,
        paddingHorizontal: 5,
        marginLeft: 10,
        width: 180
    },
    error: {
        marginBottom: 10,
    },
    botonBuscar:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'rgba(241, 243, 244, 1)',
        justifyContent: 'center',
        marginTop: 15,
        paddingTop: 2,
        paddingBottom: 2,
        paddingHorizontal: 5,
        borderRadius: 6,
        border: 'grey solid 1px',
        width: 60,
        marginRight: 50,
    },
    botonMostrarTodo:{
        backgroundColor: 'rgba(241, 243, 244, 1)',
        justifyContent: 'center',
        marginTop: 15,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 5,
        marginLeft: 10,
        border: 'grey solid 1px',
        borderRadius: 6,
        width: 180,
    }
})


export default Buscador;