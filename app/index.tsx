import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={'/(root)/(tabs)/home'} />;
  }
  return <Redirect href={'/(auth)/welcome'} />;
}
