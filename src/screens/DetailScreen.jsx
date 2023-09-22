import React, {useState, useEffect} from 'react';
import {View, Text, Image, Dimensions, FlatList} from 'react-native';
import styles from '../styles/DetailScreenStyle';
import {LineChart} from 'react-native-chart-kit';
import axios from 'axios';
import {ActivityIndicator, Button} from 'react-native-paper';

const DetailScreen = ({route}) => {
  const {crypto} = route.params;
  const [priceChartData, setPriceChartData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState('7d');
  const [detailNews, setDetailNews] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isNewsLoading, setIsNewsLoading] = useState(true);

  const fetchPriceChartData = async interval => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: interval === '1y' ? 365 : parseInt(interval), // Adjust the number of days
            interval: 'daily',
            precision: 2, // Adjust decimal places
          },
        },
      );
      setPriceChartData(response.data.prices);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching price chart data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPriceChartData(selectedInterval);
  }, [crypto.id, selectedInterval]);

  useEffect(() => {
    const fetchCryptoNews = async () => {
      try {
        setIsNewsLoading(true);
        const response = await axios.get('https://newsdata.io/api/1/news', {
          params: {
            apikey: 'pub_298443d2c7340603e109ade576ea5933f9bf3',
            q: `${crypto.name}`,
            language: 'en',
          },
        });

        setDetailNews(response.data);
        setIsNewsLoading(false);
      } catch (error) {
        setIsNewsLoading(false);
        console.error('Error fetching news:', error);
      }
    };

    fetchCryptoNews();
  }, []);

  const MyLineChart = () => {
    if (isLoading) {
      return (
        <View style={{flex: 1, alignItems: 'center', marginTop: 100}}>
          <ActivityIndicator size="large" color="#6610c9" />
        </View>
      );
    }

    const labels = priceChartData.map(data =>
      new Date(data[0]).toLocaleDateString(),
    );
    console.log(labels);
    const prices = priceChartData.map(data => data[1]);
    console.log(prices);

    return (
      <>
        {/* <Text style={styles.header}>Price Change</Text> */}
        <LineChart
          data={{
            datasets: [
              {
                data: prices,
                strokeWidth: 2,
              },
            ],
          }}
          width={Dimensions.get('window').width - 16}
          height={300}
          chartConfig={{
            backgroundColor: '#6610c9',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            fillShadowGradientFrom: '#6610c9',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            marginLeft: 8,
          }}
        />
      </>
    );
  };

  const NewsSection = ({news}) => {
    if (isNewsLoading) {
      return (
        <View style={{flex: 1, alignItems: 'center', marginTop: 100}}>
          <ActivityIndicator size="large" color="#6610c9" />
        </View>
      );
    }

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
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{`${crypto.name} News`}</Text>
      <NewsSection news={detailNews.results} />
      <View style={styles.cryptoItem}>
        <Image source={{uri: crypto.logoUrl}} style={styles.cryptoLogo} />
        <View style={styles.cryptoInfo}>
          <Text style={styles.cryptoName}>{crypto.name}</Text>
          <Text>{crypto.symbol}</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          {crypto.price !== undefined && (
            <Text style={styles.cryptoPrice}>${crypto.price}</Text>
          )}
          {crypto.priceChange !== undefined && (
            <Text style={{color: crypto.priceChange >= 0 ? 'green' : 'red'}}>
              {crypto.priceChange >= 0 ? '+' : '-'}
              {crypto.priceChange.toFixed(2)}%
            </Text>
          )}
          {crypto.volume !== undefined && (
            <Text>24h Volume: ${crypto.volume.toFixed(2)}</Text>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 8,
        }}>
        <Button
          mode="contained"
          onPress={() => {
            setIsLoading(true);
            setSelectedInterval('7d');
            fetchPriceChartData('7d');
          }}
          disabled={isLoading || selectedInterval === '7d'}>
          7 Days
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            setIsLoading(true);
            setSelectedInterval('30d');
            fetchPriceChartData('30d');
          }}
          disabled={isLoading || selectedInterval === '30d'}>
          30 Days
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            setIsLoading(true);
            setSelectedInterval('1y');
            fetchPriceChartData('1y');
          }}
          disabled={isLoading || selectedInterval === '1y'}>
          1 Year
        </Button>
      </View>
      {MyLineChart()}
    </View>
  );
};

export default DetailScreen;
