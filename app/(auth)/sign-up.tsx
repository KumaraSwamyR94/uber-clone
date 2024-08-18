import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';
import OAuth from '@/components/OAuth';
import { useRouter } from 'expo-router';
import { ReactNativeModal } from 'react-native-modal';
import { useSignUp } from '@clerk/clerk-expo';

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setVerification({
        ...verification,
        state: 'pending',
      });
    } catch (err: any) {
      Alert.alert('Error', err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === 'complete') {
        // TODO: create a database user
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: 'success',
        });
      } else {
        setVerification({
          ...verification,
          state: 'failed',
          error: 'Verification failed',
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: 'failed',
        error: err.errors[0].message,
      });
    }
  };

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image source={images.signUpCar} className='z-0 w-full h-[250px]' />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>
            Create your account
          </Text>
        </View>
        <View className='p-5'>
          <InputField
            label={'Name'}
            placeholder={'Enter your name'}
            icon={icons.person}
            value={form.name}
            onChangeText={(value: string) =>
              setForm({
                ...form,
                name: value,
              })
            }
          />
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
            autoCapitalize='none'
            keyboardType='email-address'
          />
          <InputField
            label={'Password'}
            placeholder={'Enter your password'}
            icon={icons.lock}
            value={form.password}
            onChangeText={(value: string) =>
              setForm({
                ...form,
                password: value,
              })
            }
            secureTextEntry={true}
          />
          <CustomButton
            title='Sign Up'
            onPress={onSignUpPress}
            className={'mt-6'}
          />

          <OAuth />

          <Link
            href={'/(auth)/sign-in'}
            className='text-lg text-center text-general-200 mt-10'>
            <Text>Already have an account?</Text>
            <Text className='text-primary-500'>Log In</Text>
          </Link>

          <ReactNativeModal
            isVisible={verification.state === 'pending'}
            onModalHide={() => {
              if (verification.state === 'success') {
                setShowSuccessModal(true);
              }
            }}>
            <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
              <Text className='font-JakartaExtraBold text-2xl mb-2'>
                Verification
              </Text>
              <Text className='font-Jakarta mb-5'>
                We've sent a verification code to {form.email}.
              </Text>
              <InputField
                label={'Code'}
                icon={icons.lock}
                placeholder={'XXXXX'}
                value={verification.code}
                keyboardType='numeric'
                onChangeText={(code: string) =>
                  setVerification({ ...verification, code })
                }
              />
              {verification.error && (
                <Text className='text-red-500 text-sm mt-1'>
                  {verification.error}
                </Text>
              )}
              <CustomButton
                title='Verify Email'
                onPress={onPressVerify}
                className='mt-5 bg-success-500'
              />
            </View>
          </ReactNativeModal>

          <ReactNativeModal isVisible={showSuccessModal}>
            <View className='bg-white px-7 py-9  rounded-2xl min-h-[300px]'>
              <Image
                source={images.check}
                className='w-[110px] h-[110px] mx-auto my-5'
              />
              <Text className='text-3xl font-JakartaBold text-center'>
                Verified
              </Text>
              <Text className='text-base text-gray-400 font-Jakarta text-center'>
                You have successfuly verified your account
              </Text>
              <CustomButton
                title='Browse Home'
                onPress={() => {
                  setShowSuccessModal(false);
                  router.push('/(root)/(tabs)/home');
                }}
                className={'mt-5'}
              />
            </View>
          </ReactNativeModal>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
