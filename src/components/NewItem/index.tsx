import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native'
import { useRecoilState } from 'recoil'
import { listState } from '../../atom/list'
import { Entypo } from '@expo/vector-icons'
import uuid from 'react-native-uuid'
import { isModalNewItemVisibleState } from '../../atom/isModalNewItemVisible'
import { updateList } from '../../utils/functions'

const NewItem = () => {
  const [name, setName] = useState<string>('')
  const [list, setList] = useRecoilState(listState)
  const [isModalNewItemVisible, setIsModalNewItemVisible] = useRecoilState(isModalNewItemVisibleState)

  const inputRef: React.RefObject<TextInput> = useRef(null)

  useEffect(() => {
    Platform.OS === 'ios'
      ? inputRef.current?.focus()
      : setTimeout(() => inputRef.current?.focus(), 40);
  }, [])

  const handleAddItem = () => {
    if (!name) return Alert.alert('Nome vazio!', 'Informe o nome.')

    let exist = false
    for (let item of list) {
      if (item.name === name) {
        exist = true
        return Alert.alert(
          'Nome já existe!',
          'Algum item da sua lista já tem esse nome.'
        )
      }
    }

    if (exist) return

    const newList = [...list]
    newList.push({
      id: uuid.v4(),
      name,
      times: 0
    })

    setList(newList)
    updateList(newList)
    setIsModalNewItemVisible(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        ref={inputRef}
        onEndEditing={handleAddItem}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setIsModalNewItemVisible(false)}>
          <Entypo name="cross" style={styles.iconCross} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddItem}>
          <Entypo name="check" style={styles.iconCheck} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  label: {
    fontSize: 25
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 20
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  iconCheck: {
    fontSize: 40,
    color: 'green'
  },
  iconCross: {
    fontSize: 50,
    color: 'red',
    marginRight: 10
  }
})

export default NewItem;