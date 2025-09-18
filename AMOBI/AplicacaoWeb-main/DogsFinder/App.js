import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { getMultipleDogImages } from './services/api/dogApi';
import DogImage from './components/DogImage';
import { styles } from './styles/AppStyles';

const { width } = Dimensions.get('window');

export default function App() {
  const [numberOfImages, setNumberOfImages] = useState('1');
  const [dogImages, setDogImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchDogImages = async () => {
    Keyboard.dismiss();

    const num = parseInt(numberOfImages);
    
    // Validação: número entre 1 e 50
    if (isNaN(num) || num < 1 || num > 50) {
      Alert.alert('Erro', 'Por favor, digite um número entre 1 e 50');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDogImages([]);

    try {
      console.log(`Buscando ${num} imagens...`);
      const result = await getMultipleDogImages(num);
      
      console.log('Resultado:', result);
      
      if (result.success) {
        setDogImages(result.imageUrls);
        if (result.error) {
          Alert.alert('Aviso', `Algumas imagens podem não ter carregado: ${result.error}`);
        }
      } else {
        setError(result.error);
        Alert.alert('Erro', result.error);
      }
    } catch (err) {
      const errorMsg = 'Erro inesperado: ' + err.message;
      setError(errorMsg);
      Alert.alert('Erro', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setNumberOfImages(numericValue);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>🐕 DogsFinder</Text>
          <Text style={styles.subtitle}>Encontre doguinhos fofos! (1-50)</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Quantidade de imagens:</Text>
            <TextInput
              style={styles.input}
              value={numberOfImages}
              onChangeText={handleInputChange}
              keyboardType="numeric"
              placeholder="1"
              maxLength={2}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleFetchDogImages}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Carregando...' : `Buscar ${numberOfImages || '1'} Doguinho${parseInt(numberOfImages) !== 1 ? 's' : ''} 🐶`}
            </Text>
          </TouchableOpacity>

          <DogImage 
            imageUrls={dogImages}
            isLoading={isLoading}
            error={error}
          />

          {dogImages.length > 0 && !isLoading && (
            <Text style={styles.successText}>
              {dogImages.length} doguinho{dogImages.length !== 1 ? 's' : ''} carregado{dogImages.length !== 1 ? 's' : ''} com sucesso! 🎉
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}