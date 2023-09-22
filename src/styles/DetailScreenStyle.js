import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
      
    container: {
        flex: 1,
        marginTop: 20,
      },
    cryptoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        margin: 20,
        // borderBottomWidth: 1,
        // borderColor: '#ccc',
      },
      cryptoLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
      },
      cryptoInfo: {
        flex: 1,
      },
      cryptoName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      cryptoSymbol: {
        // Add any specific styles for the symbol text here
      },
      cryptoPrice: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10,
        color: 'black',
      },  
      header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: 'black',
      },
      newsItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'black',
      },
      newsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 2,
      },  
  });
  
  export default styles;
  