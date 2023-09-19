import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  title: {
    color: 'red',
  },
});
const Home = () => {
  return (
    <View>
      <Text style={styles.title}>VC fez login :)</Text>
    </View>
  );
};

export default Home;
