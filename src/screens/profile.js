import React, {Component} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import { db } from "../firebase/config";

import Post from "../components/Post";

class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      loading: true,
      posteos: [],
    }
  }

  componentDidMount() {
    db.collection("posts")
    .where('owner' , '==', this.props.userData.email) // el '==' pq el .where es de firebase, el firebase recibe tres datos de texto. 
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id, //numero de la columna del medio
            data: doc.data(), //funcion que se queda solo con la funcion del documento
          });
        });

        console.log(posts);

        this.setState({
          posteos: posts,
          loading: false,
        });
      });
  }

  render(){
    console.log(this.props.userData);
    return(
      <View style={styles.container}>
          <Text style={styles.welcome}> Bienvenido: {this.props.userData.email}</Text>
          <Text style={styles.welcome}> Nombre de usuario: {this.props.userData.displayName}</Text>
          <Text style={styles.element}> Usuario creado: {this.props.userData.metadata.creationTime}</Text>
          <Text style={styles.element}> Último login: {this.props.userData.metadata.lastSignInTime}</Text>
          <TouchableOpacity style={styles.touchable} onPress={()=>this.props.logout()}>
            <Text style={styles.touchableText}>Logout</Text>
          </TouchableOpacity>
          <FlatList //pasamos data de posteos, una key unica
          style={styles.post}
          data={this.state.posteos}
          keyExtractor={(post) => post.id}
          renderItem={({ item }) => <Post postData={item} />}
          />
      </View>       
    )
  }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        marginHorizontal:10,
        backgroundColor: 'rgba(241, 243, 244, 1)'
    },
    welcome:{
        fontSize:18,
        marginTop:10,
        marginBottom:10,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    element:{
      marginTop:10,
        marginBottom:10,
        paddingHorizontal: 10,
    },
    touchable:{
        backgroundColor: '#dc3545',
        marginTop: 10,
        borderRadius: 4,
        width:90,
        padding: 10,
        marginLeft:15
    },
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    post: {
    marginTop: 5,
    marginLeft:5,
    marginRight: 5,
    backgroundColor: 'rgba(241, 243, 244, 1)'
    }
});

export default Profile;