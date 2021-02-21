import AsyncStorage from '@react-native-async-storage/async-storage'
import { IItem } from '../atom/list'

export const updateList = async (list: IItem[]) => {
  try {
    await AsyncStorage.setItem('@TC:List', JSON.stringify(list))
  } catch (err) {
    //?
  }
}

export const getList = async () => {
  try {
    const list = await AsyncStorage.getItem('@TC:List')
    return list !== null ? JSON.parse(list) as IItem[] : [] as IItem[];
  } catch (err) {
    //?
    return [] as IItem[]
  }
}