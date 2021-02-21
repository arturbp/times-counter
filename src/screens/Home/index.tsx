import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import FabButton from '../../components/FabButton';
import ItemToCount from '../../components/ItemToCount';

import { useRecoilState } from 'recoil'
import { listState } from '../../atom/list';
import { getList, updateList } from '../../utils/functions';

export default function Home() {
  const [list, setList] = useRecoilState(listState)

  useEffect(() => {
    loadList()
  }, [])

  const loadList = async () => {
    setList(await getList())
  }

  const reduceTimes = useCallback((id: string) => {
    const newArray = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          times: item.times - 1
        }
      }
      return item
    })
    setList(newArray)
    updateList(newArray)
  }, [setList, list])

  const sumTimes = useCallback((id: string) => {
    const newArray = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          times: item.times + 1
        }
      }
      return item
    })
    setList(newArray)
    updateList(newArray)
  }, [setList, list])

  const removeItem = useCallback((id: string) => {
    const newArray = list.filter(item => item.id !== id)
    setList(newArray)
    updateList(newArray)
  }, [setList, list])

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={
          ({ item }) =>
            <ItemToCount
              item={item}
              reduce={reduceTimes}
              sum={sumTimes}
              remove={removeItem}
            />
        }
        style={{
          flex: 1,
          width: '100%',
          padding: 10
        }}
      />
      <FabButton
        style={{
          bottom: 80,
          right: 60
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },
});