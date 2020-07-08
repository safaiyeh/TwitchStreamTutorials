import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

const Card = ({time, price, size, side, trade_id}) => {
  const localTime = new Date(time); 
  return (
  <View style={[styles.cardContainer, {'backgroundColor': side === 'sell' ? '#F08080' : 'lightgreen'}]}>
    <Text style={styles.tradeId}>{trade_id}</Text>
    <Text>{`${localTime.getMonth()}/${localTime.getDay()} ${localTime.getHours()}:${localTime.getMinutes()}`}</Text>
    <Text style={styles.price}>{`$${(price * size).toFixed(2)}`}</Text>
  </View>
  );
}

const App = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    // Not that great, can be optmized to handle requests better
    setInterval(() => getData(), 1000);
  });

  getData = () => {
    fetch('https://api.pro.coinbase.com/products/BTC-USD/trades')
      .then(response => response.json())
      .then(data => setTrades(data));
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.cardViewContainer}>
              {trades.map((trade) => <Card {...trade}/>)}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  cardViewContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  cardContainer: {
    borderRadius: 5,
    backgroundColor: 'lightgreen',
    padding: 10,
    marginBottom: 5,
  },
  tradeId: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#474747'
  },
  price: {
    fontSize: 25
  }
})


export default App;
