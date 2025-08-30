import { useState } from "react";
import { View, Button, Image, StyleSheet } from "react-native";
import api from "./src/services/api";
import { ScrollView } from "react-native";

export default function App() {
  const [cats, setCats] = useState([]);

  async function buscar() {
    try {
      const result = await api.get('https://api.thecatapi.com/v1/images/search?limit=10');
      console.log(result.data);
      setCats(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const _render = () => {
    return cats.map((item, index) => (
      <View style={styles.card} key={index}>
        <Image
          source={{ uri: item.url }}
          style={{ width: 500, height: 500 }}
        />
      </View>
    ));
  };

  return (
    <View style = {styles.container}>
      <Button
        title="Clique aqui"
        onPress={buscar}
      />
      <ScrollView>

        {_render()}
      </ScrollView>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: 'center',
    marginTop:50
  },
  card: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});