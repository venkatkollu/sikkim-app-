import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Simple test screens first
function MapScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Heritage Map</Text>
      <Text style={styles.subText}>Explore sacred monasteries across Sikkim</Text>
    </View>
  );
}

function DashboardScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Monastery Details</Text>
      <Text style={styles.subText}>Detailed information and live statistics</Text>
    </View>
  );
}

function Viewer3DScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>3D Virtual Tour</Text>
      <Text style={styles.subText}>Immersive 360° monastery experience</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>My Profile</Text>
      <Text style={styles.subText}>Track your heritage exploration journey</Text>
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Notifications</Text>
      <Text style={styles.subText}>Stay updated with events and alerts</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#d97706" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: any = 'help-outline';

              if (route.name === 'Map') {
                iconName = focused ? 'map' : 'map-outline';
              } else if (route.name === 'Dashboard') {
                iconName = focused ? 'grid' : 'grid-outline';
              } else if (route.name === '3D Viewer') {
                iconName = focused ? 'cube' : 'cube-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'Notifications') {
                iconName = focused ? 'notifications' : 'notifications-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#d97706',
            tabBarInactiveTintColor: '#9ca3af',
            tabBarStyle: {
              backgroundColor: '#ffffff',
              borderTopColor: '#e5e7eb',
              paddingBottom: 5,
              paddingTop: 5,
              height: 60,
            },
            headerStyle: {
              backgroundColor: '#d97706',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen 
            name="Map" 
            component={MapScreen}
            options={{ title: 'Heritage Map' }}
          />
          <Tab.Screen 
            name="Dashboard" 
            component={DashboardScreen}
            options={{ title: 'Monastery Details' }}
          />
          <Tab.Screen 
            name="3D Viewer" 
            component={Viewer3DScreen}
            options={{ title: '3D Experience' }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ title: 'My Profile' }}
          />
          <Tab.Screen 
            name="Notifications" 
            component={NotificationsScreen}
            options={{ title: 'Alerts' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f4',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef7ed',
    padding: 20,
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#a16207',
    textAlign: 'center',
    lineHeight: 22,
  },
});
