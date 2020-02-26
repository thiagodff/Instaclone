import React from 'react';
import { YellowBox } from 'react-native';

//para desabilitar mensagem especifica de warning
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket'
])

import Routes from './routes';

export default function App(){
    return <Routes /> 
}