import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/home';
import Login from '../screens/login';
import Register from '../screens/register';

import { auth } from '../firebase/config';

const Drawer = createDrawerNavigator();

class Menu extends Component{
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            user: '',
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.setState({
                    loggedIn:true,
                    user: user,
                })
            }
        })
    }

    login(email,pass){
        auth.signInWithEmailAndPassword(email,pass)
        .then( response => {
            this.setState({
                loggedIn: true,
                user:response.user,
            })
        })
        .catch(e => console.log(e))
    }

    register(email,pass){
        auth.createUserWithEmailAndPassword(email, pass)
        .then( () =>{
            console.log('Registrado');
        })
        .catch (error => {
            console.log(error);
        })
    }

    logout(){
        auth.signOut()
            .then( (res) =>{
                this.setState({
                    user:'',
                    loggedIn: false,
                })
            })
            .catch()
    }


    render(){
        return(
            <NavigationContainer>
                {this.state.loggedIn == false ? 
                    <Drawer.Navigator> 
                        <Drawer.Screen name="Login" component={()=><Login login={ () => this.login(email, pass)}/>} />
                        <Drawer.Screen name="Register" component={()=><Register register={ () => this.register(email, pass)} />} />
                    </Drawer.Navigator> :
                    <Drawer.Navigator>
                        <Drawer.Screen name="Home" component={()=><Home />} />
                        <Drawer.Screen name ="New Post" component={(drawerProps)=><PostForm drawerProps={drawerProps}/>}/>
                        <Drawer.Screen name="Perfil" component={()=><Perfil userData={this.state.user} logout={()=>this.logout() } />} />
                    </Drawer.Navigator>
                }
            </NavigationContainer>
        )
    }
}

export default Menu;