import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { RecoilRoot } from 'recoil'
import Home from './src/screens/Home';

export default function App() {
  return (
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  )
}