import { View, Text } from 'react-native';
import React from 'react';
import { useLocationStore } from '@/store';

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
  return (
    <View>
      <Text className='text-2xl'>You are here: {userAddress}</Text>
      <Text className='text-2xl'>You want to go: {destinationAddress}</Text>
    </View>
  );
};

export default FindRide;
