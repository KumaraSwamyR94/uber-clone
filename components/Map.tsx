import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useDriverStore, useLocationStore } from '@/store';
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from '@/lib/map';
import { Driver, MarkerData } from '@/types/type';
import { icons } from '@/constants';
import { useFetch } from '@/lib/fetch';
import MapViewDirections from 'react-native-maps-directions';

const Map = () => {
  const { data: drivers, loading, error } = useFetch<Driver[]>('/(api)/driver');
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  const { setDrivers, setSelectedDriver, selectedDriver } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) return;
      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });
      setMarkers(newMarkers);
    }
  }, [drivers, userLatitude, userLongitude]);

  useEffect(() => {
    if (markers.length > 0 && destinationLatitude && destinationLongitude) {
      calculateDriverTimes({
        markers,
        userLongitude,
        userLatitude,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => setDrivers(drivers as MarkerData[]));
    }
  }, [markers, destinationLatitude, destinationLongitude]);

  if (loading || !userLatitude || !userLongitude) {
    return (
      <View className='flex justify-center items-center w-full'>
        <ActivityIndicator size={'small'} color={'#000'} />
      </View>
    );
  }

  if (error) {
    return (
      <View className='flex justify-center items-center w-full'>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className='w-full h-full rounded-2xl'
      tintColor='blcak'
      mapType='mutedStandard'
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle='light'>
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}
      {destinationLatitude && destinationLongitude ? (
        <>
          <Marker
            key={'destination'}
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title='Destination'
            image={icons.pin}
          />
          <Marker
            key={'origin'}
            coordinate={{
              latitude: userLatitude,
              longitude: userLongitude,
            }}
            title='Destination'
            image={icons.point}
          />
          <MapViewDirections
            origin={{
              latitude: userLatitude,
              longitude: userLongitude,
            }}
            destination={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
            strokeColor='#0286FF'
            strokeWidth={3}
          />
        </>
      ) : null}
    </MapView>
  );
};

export default Map;
