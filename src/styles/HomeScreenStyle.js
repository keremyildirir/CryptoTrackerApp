import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cryptoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    
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
  searchBarVertical: {
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
    color: 'black',
  },  
  cryptoRow: {
    flexDirection: 'row'
  },
  star: {
    marginTop:7,
    marginRight: 9,
  },
  emptyWatchlistMessage: {
    margin: 10,
    fontSize: 15,
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
  watchListContainer: {
    
  },
});

export default styles;
