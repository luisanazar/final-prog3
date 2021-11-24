import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            username:'',
            password:'',
        }
    }

    render(){
        return(
           <View>
                 <LinearGradient 
      colors={['#ffebcd', '#fff0f5']} 
      start={{
        x: 0,
        y: 0
      }}
      end={{
        x: 1,
        y: 1
      }}
      style={styles.box} > 
       <View style={styles.formContainer}>
                <Text style={styles.register}>Register</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({username: text})}
                    placeholder='user name'
                    keyboardType='default'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />
                <Text style={styles.error}> 
                    {this.props.errorMessage}
                </Text>

                <TouchableOpacity style={styles.button} onPress={()=>this.props.register(this.state.email, this.state.password, this.state.username)} disabled={this.state.email.length == 0 || this.state.username.length == 0 ||this.state.password.length==0 ? true : false}>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
                </View>
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        alignItems: 'center',
        textAlign: 'center',
    },
    register: {
        marginLeft:10,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
        marginLeft:10,
        width: 300,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        marginLeft:10,
        width: 300,
    },
    textButton:{
        color: '#fff'
    },
    error: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 10
    },
    box: {
        width: '100%',
        height:720
      }

})

export default Register;