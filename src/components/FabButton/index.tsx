import React, { useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  Animated,
  Alert
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import NewItem from '../NewItem';
import { isModalNewItemVisibleState } from '../../atom/isModalNewItemVisible';
import { useRecoilState } from 'recoil';
import { updateList } from '../../utils/functions';
import { listState } from '../../atom/list';

interface IFabButton {
  style?: StyleProp<ViewStyle>
}

const FabButton = ({ style }: IFabButton) => {
  const [open, setOpen] = useState<boolean>(false)
  const [list, setList] = useRecoilState(listState)
  const [isModalNewItemVisible, setIsModalNewItemVisible] = useRecoilState(isModalNewItemVisibleState)
  let animation = useRef(new Animated.Value(0)).current

  const resetStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140]
        })
      }
    ]
  }

  const plusStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70]
        })
      }
    ]
  }

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg']
        })
      }
    ]
  }

  const toggleMenu = () => {
    const toValue = open ? 0 : 1

    Animated.spring(animation, {
      toValue,
      friction: 6,
      useNativeDriver: true
    }).start()

    setOpen(!open)
  }

  const handleNewItem = () => {
    setIsModalNewItemVisible(true)
    toggleMenu()
  }

  const handleResetList = () => {
    if (!!!list.length) return Alert.alert('Ainda não há itens.')
    return Alert.alert('Deseja zerar todos os contadores?', '', [
      {
        text: 'Não',
        style:  'cancel'
      },
      {
        text: 'Sim',
        onPress: resetList,
        style: 'default'
      }
    ])
  }

  const resetList = () => {
    const newArray = list.map(item => ({ ...item, times: 0 }))
    setList(newArray)
    updateList(newArray)
    toggleMenu()
  }

  return (
    <>
      <View style={[style, styles.container]}>
        <TouchableWithoutFeedback onPress={handleResetList}>
          <Animated.View
            style={[
              styles.button,
              styles.submenu,
              resetStyle
            ]}
          >
            <Entypo name="time-slot" size={24} color="#fff" />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleNewItem}>
          <Animated.View
            style={[
              styles.button,
              styles.submenu,
              plusStyle
            ]}
          >
            <AntDesign name="addfile" size={24} color="#fff" />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <Animated.View
            style={[
              styles.button,
              styles.menu,
              rotation
            ]}>
            <AntDesign name="plus" size={24} color="#fff" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
      <Modal
        isVisible={isModalNewItemVisible}
        swipeDirection={['down', 'up', 'left', 'right']}
        onSwipeComplete={() => setIsModalNewItemVisible(false)}
        onBackdropPress={() => setIsModalNewItemVisible(false)}
      >
        <NewItem />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute'
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 10,
    shadowColor: '#00213b',
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 10,
      width: 0
    }
  },
  menu: {
    backgroundColor: '#00213b'
  },
  submenu: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: '#00213b'
  }
})

export default FabButton;