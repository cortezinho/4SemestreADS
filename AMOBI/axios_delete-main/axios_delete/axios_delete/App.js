import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import axios from "axios";

export default function App() {
  // Estado para armazenar os usuários
  const [users, setUsers] = useState([]);

  // URL da API
  const API = "http://10.110.12.31:3000/users";

  // Função assíncrona GET: busca lista de usuários
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API);
      setUsers(response.data);
    } catch (error) {
      console.error("ERROR GET: ", error.message);
    }
  };

  // Função assíncrona DELETE: remove um usuário
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("ERROR DELETE ", error.message);
    }
  };

  // Dispara o fetchUsers quando o App for inicializado
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DELETE - Remover Usuário</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userText}>
              {item.name} - {item.email}
            </Text>
            <Button
              title="DEL"
              color="#BF3604"
              onPress={() => deleteUser(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#400D01",
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  userText: {
    fontSize: 16,
    color: "#333",
  },
});
