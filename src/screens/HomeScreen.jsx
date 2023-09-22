import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import styles from '../styles/HomeScreenStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation}) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlistCoins, setWatchlistCoins] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              // ids: 'bitcoin,ethereum, algorand',
              // per_page: 10, // Adjust the number of coins per page
              // page: 1 // Adjust the page number
            },
          },
        );

        setCryptoData(
          response.data.map(coin => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            volume: coin.total_volume,
            priceChange: coin.price_change_percentage_24h,
            logoUrl: coin.image,
          })),
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCryptoNews = async () => {
      try {
      
        const response = await axios.get('https://newsdata.io/api/1/news', {
          params: {
            apikey: 'pub_298443d2c7340603e109ade576ea5933f9bf3',
            q: 'crypto',
            language: 'en',
          },
        });
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchCryptoNews();
  }, []);

  const renderCryptoItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.cryptoItem}
        onPress={() => navigation.navigate('DetailScreen', {crypto: item})}
        key={item.id}>
        <View style={styles.cryptoRow}>
          <TouchableOpacity
            onPress={() => toggleWatchlist(item)}
            style={styles.star}>
            {watchlistCoins.includes(item) ? (
              <Ionicons name="star" size={30} color="#FFD700" />
            ) : (
              <Ionicons name="star-outline" size={30} color="gray" />
            )}
          </TouchableOpacity>
          <Image source={{uri: item.logoUrl}} style={styles.cryptoLogo} />
        </View>
        <View style={styles.cryptoInfo}>
          <Text style={styles.cryptoName}>{item.name}</Text>
          <Text>{item.symbol}</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          {item.price !== undefined && (
            <Text style={styles.cryptoPrice}>${item.price}</Text>
          )}
          {item.priceChange !== undefined && (
            <Text style={{color: item.priceChange >= 0 ? 'green' : 'red'}}>
              {item.priceChange >= 0 ? '+' : '-'}
              {item.priceChange.toFixed(2)}%
            </Text>
          )}
          {item.volume !== undefined && (
            <Text>24h Volume: ${item.volume.toFixed(2)}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const handleSearch = async query => {
    setSearchQuery(query);
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`,
      );

      if (response.data && response.data.coins) {
        const searchResults = response.data.coins.map(coin => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          // price: coin.current_price,
          // volume: coin.total_volume,
          // priceChange: coin.price_change_percentage_24h,
          logoUrl: coin.thumb,
        }));

        setCryptoData(searchResults);
      }
    } catch (error) {
      console.error('Error searching cryptocurrencies:', error);
    }
  };

  const toggleWatchlist = crypto => {
    setWatchlistCoins(prevCoins => {
      if (prevCoins.includes(crypto)) {
        return prevCoins.filter(coin => coin.id !== crypto.id);
      } else {
        return [...prevCoins, crypto];
      }
    });
  };

  const WatchlistCoinsList = () => {
    return (
      <View>
        {watchlistCoins.length === 0 ? (
          <Text style={styles.emptyWatchlistMessage}>
            Watchlist is currently empty!
          </Text>
        ) : (
          watchlistCoins.map(item => (
            <TouchableOpacity
              style={styles.cryptoItem}
              key={item.id}
              onPress={() =>
                navigation.navigate('DetailScreen', {crypto: item})
              }>
              <View style={styles.cryptoRow}>
                <TouchableOpacity
                  onPress={() => toggleWatchlist(item)}
                  style={styles.star}>
                  {watchlistCoins.includes(item) ? (
                    <Ionicons name="star" size={30} color="#FFD700" />
                  ) : (
                    <Ionicons name="star-outline" size={30} color="gray" />
                  )}
                </TouchableOpacity>
                <Image source={{uri: item.logoUrl}} style={styles.cryptoLogo} />
              </View>
              <View style={styles.cryptoInfo}>
                <Text style={styles.cryptoName}>{item.name}</Text>
                <Text>{item.symbol}</Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.cryptoPrice}>${item.price}</Text>
                <Text style={{color: item.priceChange >= 0 ? 'green' : 'red'}}>
                  {item.priceChange >= 0 ? '+' : '-'}
                  {item.priceChange.toFixed(2)}%
                </Text>
                <Text>24h Volume: ${item.volume.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    );
  };

  const NewsSection = ({news}) => {
    return (
      <View style={{borderWidth: 2, borderColor: 'grey', marginTop: 10}}>
        <FlatList
          data={news?.slice(0, 3)}
          renderItem={({item}) => (
            <View style={styles.newsItem}>
              <Text style={styles.newsTitle}>{item.title}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  return (
    <View>
      {/* News Section */}
      <Text style={styles.sectionTitle}>Crypto News</Text>
      <NewsSection news={news.results} />

      {/* Watchlist Section */}
      <Text style={styles.sectionTitle}>Watchlist</Text>
      <WatchlistCoinsList />

      <SearchBar onSearch={handleSearch} />
      {/* All Coins Section */}
      <Text style={styles.sectionTitle}>All Coins</Text>
      <FlatList
        data={cryptoData}
        renderItem={renderCryptoItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default HomeScreen;
