import { View, Text, TextInput, Button, StyleSheet, FlatList, Modal, Image } from 'react-native'
import { useState } from 'react'
import logo from './assets/retro-tv.png'


const App = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [idSelected, setIdSelected] = useState("");
  const [newFilm, setNewFilm] = useState({
    id: new Date().getTime(),
    title: "",
    description: ""
  })
  const [film, setFilms] = useState([])

  const addFilm = () => {
    setFilms([...film, newFilm])
    setNewFilm({
      id: new Date().getTime(),
      title: "",
      description: ""
    })
  }

  const onHandlerTitle = (t) => {
    setNewFilm({...newFilm, title:t})
  }
  const onHandlerDescription = (t) => {
    setNewFilm({...newFilm, description:t})
  }

  const onHandlerModalDelete = (id) => {
    setIdSelected(id)
    setModalVisible(true);
  }
  const deleteFilm = () => {
    setFilms(film.filter(film => film.id !== idSelected));
  }

  return (
    <View style= {styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.titulo}>Pelis / Series</Text>
        <View>
        <Image
        style={styles.logo}
        source={{
          uri: 'https://icons8.com/icon/DUNTjiV5KYya/retro',
        }}
      />
      </View>
        <TextInput value={newFilm.title} onChangeText={onHandlerTitle} placeholder='Título' style={styles.inputTitulo}/>
        <TextInput value={newFilm.description} onChangeText={onHandlerDescription} placeholder='Sinópsis' style={styles.inputSinopsis}/>
        <Button color= "#ffcfd2" title='Agregar' onPress={addFilm}/>
      </View>
      <View style={styles.filmContainer}>
          <FlatList
            data={film}
            keyExtractor={item => item.id}
            renderItem={({item}) =>(
              <View style={styles.filmCard}>
                <Text style={styles.text}>Título: {item.title}</Text>
                <Text style={styles.text}>Sinópsis: {item.description}</Text>
                <View style={styles.boton}>
                  <Button color= "#ffcfd2" title= "Borrar" onPress={() => onHandlerModalDelete(item.id)}/>
                </View>
              </View>
            )} />

        <Modal 
        visible={modalVisible}
        >
          <View style={styles.modal}>
            <Text>¿Está seguro que quiere eliminar?</Text>
            <Button color= "#ffcfd2" title= "si" onPress={()=> {
              deleteFilm()
              setModalVisible (false);
              }}/>
            <Button color= "#ffcfd2" title= "no" onPress={()=> setModalVisible(false)}/>
          </View>
        </Modal>
      </View>

      </View>
  )
}


export default App 

const styles = StyleSheet.create({
  titulo: {
    color: "#000000",
    padding: 50,
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 90,
    
  },
  container:{
    backgroundColor:"#bae2e4",
    alignItems:"center",
    height:"100%",
    width:"100%",

  },
  inputTitulo:{
    borderWidth:3,
    borderColor:"white",
    marginHorizontal:10,
    marginVertical:5,
    paddingVertical:5,
    paddingHorizontal:10,
    borderRadius:7,
    color:"white",
    fontSize:20,
    textAlignVertical:"top"
  },
  inputSinopsis: {
    borderWidth:3,
    borderColor:"white",
    marginHorizontal:10,
    marginVertical:8,
    paddingHorizontal:10,
    borderRadius:7,
    color:"white",
    fontSize:20,
    textAlignVertical:"top",
    height:80,
  },
  filmContainer: {
    backgroundColor:"#cfe2f3",
    flexDirection: "row",
    padding: 30,
    margin: 20,
    borderRadius:10,
   },
  filmCard: {
    padding: 10,
    color:"white",
  },
  text: {
    fontSize:20,
  },
  logo: {
    width: 10,
    height: 10,
    zIndex: 1,
  },
  modal:{
    borderWidth:3,
    borderColor:"white",
    backgroundColor:"#dae5ef",
    marginHorizontal:5,
    marginVertical:300,
    paddingHorizontal:20,
    borderRadius:10,
    fontWeight: "bold",
  }
})