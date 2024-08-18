import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { images, icons } from '@/constants';
import { Link } from 'expo-router';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSignInPress = async () => {};

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image source={images.signUpCar} className='z-0 w-full h-[250px]' />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>
            Welcome 👋
          </Text>
        </View>
        <View className='p-5'>
          <InputField
            label={'Email'}
            placeholder={'Enter your email'}
            icon={icons.email}
            value={form.email}
            onChangeText={(value: string) =>
              setForm({
                ...form,
                email: value,
              })
            }
          />
          <InputField
            label={'Password'}
            placeholder={'Enter your password'}
            secureTextEntry
            icon={icons.lock}
            value={form.password}
            onChangeText={(value: string) =>
              setForm({
                ...form,
                password: value,
              })
            }
          />
          <CustomButton
            title='Sign In'
            onPress={onSignInPress}
            className={'mt-6'}
          />

          <OAuth />

          <Link
            href={'/(auth)/sign-up'}
            className='text-lg text-center text-general-200 mt-10'>
            <Text>Don't have an account?</Text>
            <Text className='text-primary-500'>Sign Up</Text>
          </Link>

          {/* verification modal */}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
