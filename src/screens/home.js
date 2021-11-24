import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { db } from "../firebase/config";

import Post from "../components/Post";
import Buscador from "../components/Buscador";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
      loading: true,
      mostrarTodo: true,
    };
  }

  componentDidMount() {
    this.mostrarTodo();
  }

  buscar(textoABuscar) {
    db.collection("posts")
      .where("owner", "==", textoABuscar)
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
          mostrarTodo: false,
        });
      });
  }

  mostrarTodo() {
    db.collection("posts")
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

  render() {
    return (
      <View style={styles.container}>
   
        <Buscador
          buscar={(texto) => this.buscar(texto)}
          mostrarTodo={() => this.mostrarTodo()}
        />
{this.state.posteos.length > 0 ?

        <FlatList //pasamos data de posteos, una key unica
          style={styles.formContainer}
          data={this.state.posteos}
          keyExtractor={(post) => post.id}
          renderItem={({ item }) => <Post postData={item} />} 

          // =>  <Text>{item.data.texto}</Text>}
          //armar componente post <Post> mas complejo y renderizarlo con los datos de cada documento
        /> :
     
  <Text style= {styles.error}>El usuario no existe o aún no tiene publicaciones</Text>
  }
      </View>
    )
}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(241, 243, 244, 1)'
  },
  formContainer: {
    marginTop: 5,
marginRight:  10,
marginLeft: 10,

  },
error : {
  color: 'red',
  marginLeft: 20,
  marginTop: 10
},

});

export default Home;
