/* eslint-disable */
import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'tailwind-react-native-classnames';

const CardCategory = ({
  iconName,
  iconColor,
  backgroundColor,
  ...props
}: any) => {
  return (
    <View style={[styles.category, {backgroundColor: backgroundColor}]}>
      <View style={styles.icon}>
        <Image
          // name={iconName} size={26} color={iconColor}
          style={styles.logo}
          source={require('./kucing3.jpg')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default CardCategory;
