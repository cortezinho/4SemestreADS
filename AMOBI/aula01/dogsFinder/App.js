import { useState } from "react";
import { View, Button, Image, StyleSheet, TextInput, ScrollView, Alert, Text } from "react-native";
import axios from "axios";

export default function App() {
  const [dogs, setDogs] = useState([]);
  const [quantidade, setQuantidade] = useState("1");

  async function buscar() {
    if (!quantidade || isNaN(quantidade) || Number(quantidade) <= 0) {
      Alert.alert("Erro", "Digite um número válido maior que 0");
      return;
    }

    try {
      const qtd = Number(quantidade);

      const result = await axios.get(`https://dog.ceo/api/breeds/image/random/${qtd}`);

      setDogs(Array.isArray(result.data.message) ? result.data.message : [result.data.message]);
    } catch (error) {
      Alert.alert("Erro de rede", "Não foi possível buscar imagens. Tente novamente.");
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Digite quantos cachorros você </Text>
      <Text style={styles.Text}> quer que seja mostrado</Text>
      <Text></Text>
      <TextInput
        style={styles.input}
        placeholder="Quantas imagens?"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />
      <Button  title="Buscar cachorro" onPress={buscar} />

      <Text></Text>

      <ScrollView>
        {dogs.map((url, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={{ uri: url }}
              style={{ width: 300, height: 300 }}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#2e3136ff",
    alignItems: "center",
    marginTop: 50,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "80%",
    marginBottom: 10,
    borderRadius: 8,
    textAlign: "center",
    backgroundColor: "#fff"
  },
  Text: {
    color: '#fff',
    fontWeight: "900",
    fontSize: 20,
  },
});
