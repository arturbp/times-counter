import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo as Icon } from '@expo/vector-icons'
import { IItem } from '../../atom/list';

interface IItemToCount {
  item: IItem;
  sum: (id: string) => void;
  reduce: (id: string) => void;
  remove: (id: string) => void;
}

const ItemToCount = ({ item, reduce, sum, remove }: IItemToCount) => {
  return (
    <TouchableOpacity onLongPress={() => remove(item.id)}>
      <View style={styles.container} key={item.id} >
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.leftSide}>
          <Icon
            name="minus"
            style={styles.rightIcon}
            size={30}
            onPress={() => reduce(item.id)}
          />
          <Text style={styles.times}>{item.times}</Text>
          <Icon
            name="plus"
            style={styles.leftIcon}
            size={30}
            onPress={() => sum(item.id)}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#00213b',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    flexDirection: 'row'
  },
  name: {
    color: 'black'
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    color: 'black'
  },
  times: {
    paddingHorizontal: 20,
    fontSize: 30,
    color: 'black'
  },
  rightIcon: {
    color: 'black'
  }
});

export default ItemToCount;