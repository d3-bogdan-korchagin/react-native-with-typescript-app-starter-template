//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BaseAppWithDrawerNavigationRouting from "./routing-and-navigation/routing-composition";

function AppEntry() {

    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content"/>
            <BaseAppWithDrawerNavigationRouting/>
        </NavigationContainer>
    );
}

export default AppEntry;
