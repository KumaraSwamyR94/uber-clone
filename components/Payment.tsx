import { View, Text } from 'react-native';
import React from 'react';
import CustomButton from './CustomButton';

const Payment = () => {
  const openPaymentSheet = async () => {};
  return (
    <>
      <CustomButton
        title='Confirm Ride'
        className={'my-10'}
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;
