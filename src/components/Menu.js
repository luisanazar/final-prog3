import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../screens/home';
import Register from '../screens/register';
import Login from '../screens/login';
import PostForm from '../screens/postForm';
import Profile from '../screens/profile';

import { auth } from '../firebase/config';

const Drawer = createDrawerNavigator();

class Menu extends Component{
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            userData: '',
            errorMessage: '',
            errorCode:'',
        }
    }

    //para que la pagina tenga actualizada las cosas: si me loguie, que quede logiado
    //unica forma de salir: log out
    componentDidMount(){ //con cada cambio se mantiene la info
        auth.onAuthStateChanged(user => { //user: datos del usuario si esta logueado
            if(user){ //si hay dato (usuario log) se ejecuta el if, si hay null no se ejecuta nada (logged: false)
                this.setState({
                    loggedIn: true,
                    userData: user,
                })
            }
        })
    }

    register(email, pass, username){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( ()=>{
                auth.currentUser.updateProfile({ displayName: username }) //displayName es el dato que se crea vacío
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    errorMessage: error.message,
                    errorCode: error.code,
                })
            })
    }

    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then((response) => { //response tiene un objeto literal con los datos del usuario
                console.log('Logueado');
                console.log(response);
                this.setState({
                    loggedIn: true,
                    userData: response.user,
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    errorMessage: error.message,
                    errorCode: error.code,
                })
            })
    }

    logout(){ //desloguearme de firebase. borra datos del usuario
        auth.signOut()
        .then(()=>{
            this.setState({ //volver el estado como estaban originalmente
                loggedIn: false, //muestra login registro
                userData: '',
            });
        })
        .catch(error => {
            console.log(error);
            this.setState({
                errorMessage: error.message,
                errorCode: error.code,
            })
        })
        
    }

    render(){
        return(
            
            <NavigationContainer>
                {this.state.loggedIn == false ?
                    <Drawer.Navigator>
                        <Drawer.Screen name="Login" component={()=><Login login={ (email, pass) => this.login(email,pass) } errorMessage={this.state.errorMessage} errorCode={this.state.errorCode} /> } />
                        <Drawer.Screen name="Register" component={()=><Register register={(email, pass, username)=>this.register(email, pass, username)} errorMessage={this.state.errorMessage} errorCode={this.state.errorCode} />} />
                    </Drawer.Navigator> :
                
                
                    <Drawer.Navigator>
                        <Drawer.Screen name="Home" component={() =><Home />}></Drawer.Screen>
                        <Drawer.Screen name ="New Post" component={(drawerProps)=><PostForm drawerProps={drawerProps}/>}/>
                        <Drawer.Screen name="Mi Perfil" component={ ()=> <Profile logout={ () => this.logout()} userData={this.state.userData} /> } />
                    </Drawer.Navigator>
                }   
            </NavigationContainer>
        )
    }

}

export default Menu;