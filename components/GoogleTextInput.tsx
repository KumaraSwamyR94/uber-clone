import { View, Text, Image } from 'react-native';
import React from 'react';
import { GoogleInputProps } from '@/types/type';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { icons } from '@/constants';

const GOOGLE_PLACES_API = process.env.EXPO_PUBLIC_GOOGLE_API_KEY!;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder='Search your destination'
        debounce={200}
        styles={{
          textInputContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            borderRadius: 20,
            marginHorizontal: 20,
            shadowColor: '#D4D4D4',
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || '#FFF',
            fontSize: 16,
            marginTop: 5,
            fontWeight: '600',
            width: '100%',
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || '#FFF',
            position: 'relative',
            top: 0,
            borderRadius: 10,
            shadowColor: '#D4D4D4',
            zIndex: 9,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: GOOGLE_PLACES_API,
          language: 'en',
        }}
        renderLeftButton={() => (
          <View className='justify-center items-center w-6 h-6'>
            <Image
              source={icon ? icon : icons.search}
              className='w-6 h-6'
              resizeMode='contain'
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: 'gray',
          placeholder: initialLocation ?? 'Where you want to go?',
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
