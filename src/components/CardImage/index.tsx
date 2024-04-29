/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const CardImage = ({uri, text, ...props}: any) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: uri,
        }}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginRight: 20,
  },
  image: {
    width: 130,
    height: 160,
    borderRadius: 15,
  },
  text: {
    fontSize: 17,
    position: 'absolute',
    bottom: 20,
    left: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CardImage;
