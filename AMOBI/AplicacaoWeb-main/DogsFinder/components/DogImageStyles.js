import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
    padding: 10,
    marginVertical: 5,
  },
  singleImageContainer: {
    minHeight: 200,
    maxHeight: 300,
  },
  multipleImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    minHeight: 100,
  },
  imageWrapper: {
    margin: 5,
    width: width * 0.4, // 40% da largura para múltiplas imagens
    height: width * 0.4,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e9ecef',
  },
  singleImageWrapper: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    maxHeight: 280,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    height: 200,
  },
  loadingText: {
    marginTop: 10,
    color: '#6c757d',
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeaa7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 100,
  },
  errorText: {
    color: '#856404',
    fontSize: 16,
    textAlign: 'center',
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    height: 200,
  },
  placeholderText: {
    color: '#6c757d',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  imageCounter: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    borderRadius: 10,
    padding: 3,
    fontSize: 10,
    minWidth: 20,
    textAlign: 'center',
  },
});