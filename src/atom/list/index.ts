import { atom, RecoilState } from 'recoil'

export interface IItem {
  id: string;
  name: string;
  times: number;
}

export const listState: RecoilState<IItem[]> = atom({
  key: 'listState',
  default: [] as IItem[]
})