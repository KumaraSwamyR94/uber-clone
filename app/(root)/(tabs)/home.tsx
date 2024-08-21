import GoogleTextInput from '@/components/GoogleTextInput';
import Map from '@/components/Map';
import RideCard from '@/components/RideCard';
import { icons, images } from '@/constants';
import { useLocationStore } from '@/store';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useFetch } from '@/lib/fetch';
import { Ride } from '@/types/type';

export default function Page() {
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermissions, setHasPermissions] = useState(true);
  const { signOut } = useAuth();
  const { user } = useUser();
  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/(api)/ride/${user?.id}`,
  );

  const handleSignOut = async () => {
    signOut();
    router.replace('/(auth)/sign-in');
  };
  const handleDestinationSearch = async (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push('/(root)/find-ride');
  };

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setHasPermissions(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };
    requestLocation();
  }, []);

  return (
    <SafeAreaView className='bg-general-500'>
      <FlatList
        data={recentRides?.slice(0, 5) || []}
        renderItem={({ item }) => <RideCard ride={item} />}
        className={`px-5`}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className={`flex flex-col items-center justify-center`}>
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className='w-40 h-40'
                  alt='No recent rides!'
                  resizeMode='contain'
                />
                <Text className='text-sm'>No recent rides!</Text>
              </>
            ) : (
              <ActivityIndicator size={'small'} color={'#000'} />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className='flex flex-row items-center justify-between my-5'>
              <Text className='text-2xl font-JakartaExtraBold capitalize'>
                Welcome,{' '}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split('@')[0]}{' '}
                👋
              </Text>
              <TouchableOpacity
                className='justify-center items-center w-10 h-10 rounded-full bg-white'
                onPress={handleSignOut}>
                <Image source={icons.out} className='w-4 h-4' />
              </TouchableOpacity>
            </View>
            <GoogleTextInput
              icon={icons.search}
              containerStyle='bg-white shadow-md shadow-neutral-300'
              handlePress={handleDestinationSearch}
            />
            <>
              <Text className={`text-xl font-JakartaBold mt-5 mb-3`}>
                Your current location
              </Text>
              <View
                className={`flex flex-row items-center bg-transparent h-[300px]`}>
                <Map />
              </View>
            </>
            <Text className={`text-xl font-JakartaBold mt-5 mb-3`}>
              Recent Rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
}
