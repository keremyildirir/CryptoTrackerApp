import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={text => setQuery(text)}
        value={query}
        placeholderTextColor="#777"
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Ionicons name='search' size={30}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    margin: 5,
    marginHorizontal: 10,
    borderWidth: 2,
    
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: '#333',
  },
  searchButton: {
    padding: 10,
    // backgroundColor: '#333', 
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SearchBar;
