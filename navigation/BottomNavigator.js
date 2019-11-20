import React, { Component } from 'react';
import { BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Profil from '../src/login/profil';
import Home from '../src/home/home';

export const BottomNavigator = (props) => {
  const onTabSelect = (selectedIndex) => {
    console.log(selectedIndex);
    console.log(props.navigation);
    const routes = props.navigation.state.routes;
    const selectedRoute = routes[selectedIndex];
    props.navigation.navigate(selectedRoute.routeName);
  }

  return (
    <BottomNavigation
      selectedIndex={props.navigation.state.index}
      onSelect={onTabSelect}
    >
      <BottomNavigationTab title='Profil' />
      <BottomNavigationTab title='Home' />
      <BottomNavigationTab title='New Event' />
    </BottomNavigation>
  );
}