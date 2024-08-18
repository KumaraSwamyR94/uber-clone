import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { onboarding } from '@/constants';
import CustomButton from '@/components/CustomButton';

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className='flex h-full items-center justify-between'>
      <TouchableOpacity
        onPress={() => router.replace('/(auth)/sign-up')}
        className='w-full flex justify-end items-end p-5'>
        <Text className='text-black text-md font-JakartaBold'>Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className='w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full' />
        }
        activeDot={
          <View className='w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full' />
        }
        index={activeIndex}
        onIndexChanged={setActiveIndex}>
        {onboarding.map((item) => (
          <View
            key={item.id.toString()}
            className='flex justify-center items-center p-5'>
            <Image
              source={item.image}
              className='w-full h-[300px]'
              resizeMode='contain'
            />
            <View className='flex flex-row items-center justify-center w-full mt-10'>
              <Text className='text-black text-3xl font-bold mx-10 text-center'>
                {item.title}
              </Text>
            </View>
            <Text className='tex-md font-JakartaSemiBold text-center tex-[#858585] mx-10 mt-3'>
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? 'Get Started' : 'Next'}
        className={'w-11/12 mt-10'}
        onPress={() => {
          if (isLastSlide) {
            router.replace('/(auth)/sign-up');
          } else {
            swiperRef.current?.scrollBy(1);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default Welcome;
