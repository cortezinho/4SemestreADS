import React from 'react';
import { View, Image, ActivityIndicator, Text, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DogImage = ({ imageUrls, isLoading, error }) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando imagens...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>❌ {error}</Text>
      </View>
    );
  }

  if (!imageUrls || imageUrls.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.placeholderText}>
          Digite um número e clique no botão para ver doguinhos!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.imagesGrid}>
          {imageUrls.map((url, index) => (
            <View key={`${url}-${index}`} style={styles.imageCard}>
              <Image 
                source={{ uri: url }} 
                style={styles.image}
                resizeMode="cover"
                onError={(e) => console.log('Erro ao carregar imagem:', e.nativeEvent.error)}
              />
              <Text style={styles.imageNumber}>#{index + 1}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    width: width * 0.95,
    height: 400,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
    padding: 10,
    marginVertical: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  imageCard: {
    width: (width * 0.95 - 40) / 3, // 3 colunas com gap
    height: (width * 0.95 - 40) / 3,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageNumber: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 10,
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: 10,
    color: '#6c757d',
    fontSize: 16,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeaa7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#856404',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  placeholderText: {
    color: '#6c757d',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 150,
  },
};

export default DogImage;