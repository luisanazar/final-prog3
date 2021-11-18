import React, {Component} from 'react';
import { View, StyleSheet, FlatList,  ActivityIndicator, Image} from 'react-native';
import { db } from "../firebase/config";

import Post from '../components/Post'
import Buscador from '../components/Buscador'

class Home extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos: [],
      loading: true,
      verTodo: true
    }
  }

  componentDidMount(){
    this.mostrarTodo ()
  }

  buscar (textoABuscar){
    db.collection ('posts').where('owner', '==', textoABuscar).onSnapshot(
    docs => {
    let posts = [];
    docs.forEach(doc => {
        posts.push({
          id: doc.id, //numero de la columna del medio
          data: doc.data(), //funcion que se queda solo con la funcion del documento
        })
    })
    console.log (posts);
  
    this.setState ({
      posteos: posts,
      loading: false,
      mostrarTodo: false,
    })
  })
  }

  mostrarTodo (){
    db.collection ('posts').orderBy('createdAt', 'desc').onSnapshot (
      docs => {
    let posts = [];
    docs.forEach(doc => {
        posts.push({
          id: doc.id, //numero de la columna del medio
          data: doc.data(), //funcion que se queda solo con la funcion del documento
        })
    })

    console.log (posts);
  
    this.setState ({
      posteos: posts,
      loading: false
    })
  })
  }

  render(){
    return(
      <View style={styles.container}>

        <Buscador buscar={(texto)=> this.buscar (texto)}
        mostrarTodo={()=>this.mostrarTodo()}/>

       

        <FlatList //pasamos data de posteos, una key unica
        data= { this.state.posteos }
        keyExtractor = { post => post.id}
        renderItem = { ({item}) => 
        <Post postData={item} /> }
        
       
        // =>  <Text>{item.data.texto}</Text>}
        //armar componente post <Post> mas complejo y renderizarlo con los datos de cada documento
      /> 
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:10,
  },
  formContainer:{
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    padding:10,
  },
  field:{
    borderColor: '#444',
    borderWidth:1,
    borderStyle: 'solid',
    height: 20,
    paddingHorizontal: 20,
    paddingVertical:10
  },
  image:{
    height: 250,
  },
  touchable:{
    backgroundColor: '#ccc',
    borderRadius:4,
    marginVertical:10,
  }
})

export default Home;