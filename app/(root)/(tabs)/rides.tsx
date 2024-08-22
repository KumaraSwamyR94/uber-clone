import { View, Text, ActivityIndicator, FlatList, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ride } from '@/types/type';
import { useFetch } from '@/lib/fetch';
import { useUser } from '@clerk/clerk-expo';
import RideCard from '@/components/RideCard';
import { images } from '@/constants';

const Rides = () => {
  const { user } = useUser();

  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/(api)/ride/${user?.id}`,
  );
  return (
    <SafeAreaView className='bg-general-500'>
      <FlatList
        data={recentRides}
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
            <Text className={`text-2xl font-JakartaBold mt-5 mb-3`}>
              All Rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Rides;
