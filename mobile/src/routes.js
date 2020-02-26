import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';

import Feed from './pages/Feed';
import New from './pages/New';

import logo from '../assets/logo.png';

export default createAppContainer(
    createStackNavigator({
        Feed,
        New,
    }, {
        defaultNavigationOptions: { //para configurar coisas no header da navegacao
            headerTintColor: '#000',
            headerTitle: <Image style={{ alignSelf: 'center', marginHorizontal: 20 }} source={logo}/>,
            headerBackTitle: null,
        },
        mode: 'modal'   //faz a animacao de baixo pra cima
    })
);