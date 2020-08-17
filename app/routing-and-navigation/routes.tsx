//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from "react";
import {
    _404_VIEW,
    APP_DEV_MOCKS_SCREEN_ROUTE,
    MY_RECIPE_HOME_SCREEN_ROUTE,
    MY_RECIPE_LOGIN_SCREEN_ROUTE,
    MY_RECIPE_REQUESTS_SCREEN_ROUTE,
    PAGE1EXAMPLE_SCREEN_ROUTE,
    PAGE2EXAMPLE_SCREEN_ROUTE,
    PAGE3EXAMPLE_SCREEN_ROUTE,
    PAGE4_SUB_ITEM_EXAMPLE_SCREEN_ROUTE,
    PAGE4EXAMPLE_SCREEN_ROUTE
} from "./views-routes-declarations";
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {inject, observer} from "mobx-react";
import {makeId} from "../util/util";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {WINDOW_DIMENSIONS} from "../../App";

//expose names of internal routes, mostly as a result of nested routing,
//for availability for calls globally
export const InternalRoutes = {
    RNAST_HOME: 'RNAST_HOME',
    MY_RECIPE_TABBING: 'MY_RECIPE_TABBING',
};

/**
 * Manifest of all "main activity level" screens _ Kaybarax
 * @constructor
 */
export default function AppWithRouting() {

    const AppStack = createStackNavigator();
    const Tab = createMaterialTopTabNavigator();
    const DefaultTabbedViewsDrawer = createDrawerNavigator();

    const defaultViewTabbedViewsRouteMap = [
        <Tab.Screen
            name={PAGE1EXAMPLE_SCREEN_ROUTE.name}
            component={PAGE1EXAMPLE_SCREEN_ROUTE.screen}
            key={PAGE1EXAMPLE_SCREEN_ROUTE.name}
        />,
        <Tab.Screen
            name={PAGE2EXAMPLE_SCREEN_ROUTE.name}
            component={PAGE2EXAMPLE_SCREEN_ROUTE.screen}
            key={PAGE2EXAMPLE_SCREEN_ROUTE.name}
        />,
        <Tab.Screen
            name={PAGE3EXAMPLE_SCREEN_ROUTE.name}
            component={PAGE3EXAMPLE_SCREEN_ROUTE.screen}
            key={PAGE3EXAMPLE_SCREEN_ROUTE.name}
        />,
        <Tab.Screen
            name={PAGE4EXAMPLE_SCREEN_ROUTE.name}
            component={PAGE4EXAMPLE_SCREEN_ROUTE.screen}
            key={PAGE4EXAMPLE_SCREEN_ROUTE.name}
        />,
    ];

    const DefaultViewTabbedViewsRouteMap = () => (
        <Tab.Navigator
            children={defaultViewTabbedViewsRouteMap}
        />
    );

    const DefaultTabbedViewsWithDrawer = () => (
        <DefaultTabbedViewsDrawer.Navigator
            drawerType={WINDOW_DIMENSIONS.width >= 768 ? 'permanent' : 'front'}
        >
            <DefaultTabbedViewsDrawer.Screen
                name={InternalRoutes.RNAST_HOME}
                component={DefaultViewTabbedViewsRouteMap}
                key={makeId(16)}
            />
            <DefaultTabbedViewsDrawer.Screen
                name={APP_DEV_MOCKS_SCREEN_ROUTE.name}
                component={AppDevMocksWithRouting}
                key={makeId(16)}
            />
            <DefaultTabbedViewsDrawer.Screen
                name={'My Recipe Sub-app'}
                component={RecipeBoxAppWithRouting}
                key={makeId(16)}
            />
        </DefaultTabbedViewsDrawer.Navigator>
    );


    const appStackRouteMap = [
        <AppStack.Screen
            name={InternalRoutes.RNAST_HOME}
            component={DefaultTabbedViewsWithDrawer}
            key={makeId(16)}
        />,
        <AppStack.Screen
            name={PAGE4_SUB_ITEM_EXAMPLE_SCREEN_ROUTE.name}
            component={PAGE4_SUB_ITEM_EXAMPLE_SCREEN_ROUTE.screen}
            key={PAGE4_SUB_ITEM_EXAMPLE_SCREEN_ROUTE.name}
        />,
        <AppStack.Screen
            name={_404_VIEW.name}
            component={_404_VIEW.screen}
            key={_404_VIEW.name}
        />,
    ];

    //uncomment to run dev mocks only
    // return <AppDevMocksWithRouting/>;

    return (
        <AppStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            headerMode={'screen'}
        >
            {appStackRouteMap}
        </AppStack.Navigator>
    );

}

export function RecipeBoxAppWithRouting() {

    const AppStack = createStackNavigator();
    const AppTabs = createBottomTabNavigator();

    const appTabsRouteMap = [
        <AppTabs.Screen
            name={MY_RECIPE_HOME_SCREEN_ROUTE.name}
            component={MY_RECIPE_HOME_SCREEN_ROUTE.screen}
            key={makeId(16)}
        />,
        <AppTabs.Screen
            name={MY_RECIPE_REQUESTS_SCREEN_ROUTE.name}
            component={MY_RECIPE_REQUESTS_SCREEN_ROUTE.screen}
            key={makeId(16)}
        />,
    ];

    const AppTabbing = () => (
        <AppTabs.Navigator
            children={appTabsRouteMap}
        />
    );

    const appStackRouteMap = [
        <AppStack.Screen
            name={MY_RECIPE_LOGIN_SCREEN_ROUTE.name}
            component={MY_RECIPE_LOGIN_SCREEN_ROUTE.screen}
            key={makeId(16)}
        />,
        <AppStack.Screen
            name={InternalRoutes.MY_RECIPE_TABBING}
            component={AppTabbing}
            key={makeId(16)}
        />,
    ];

    return (
        <AppStack.Navigator children={appStackRouteMap}/>
    );

}

export function AppDevMocksWithRouting() {

    const Stack = createStackNavigator();
    const AppDevMocks =
        (inject('authStore', 'appStore')(observer(APP_DEV_MOCKS_SCREEN_ROUTE.screen)));

    return (
        <Stack.Navigator
            initialRouteName={APP_DEV_MOCKS_SCREEN_ROUTE.name}
            screenOptions={{
                title: 'App Dev Scratch Pad'
            }}
        >
            <Stack.Screen
                name={APP_DEV_MOCKS_SCREEN_ROUTE.name}
                component={AppDevMocks}
            />
        </Stack.Navigator>
    );

}
