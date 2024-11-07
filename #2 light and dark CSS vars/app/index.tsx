import { Stack } from 'expo-router';
import { Button } from '~/components/Button';
import { ThemedText } from '~/components/ThemedText';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SwitchTheme from '~/components/SwitchTheme';

export default function Home() {
 
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <SafeAreaProvider>
        <SafeAreaView className='flex flex-1 transition-colors duration-200'>
          <View className="bg-background dark:bg-background-dark flex flex-1 flex-col items-center gap-10 px-4 pt-12">
            <SwitchTheme />

            <ThemedText>
              This is my Custom text component
            </ThemedText>

            <ThemedText className="text-red-500" variant="yellow">
              And another one, but red
            </ThemedText>

            <View className='flex flex-col gap-10 border border-red-500 w-full p-4'>
              <ThemedText className='text-blue-500'>This is content is in a nested View</ThemedText>
              
              <Button>
                <ThemedText className='text-foreground dark:text-destructive-foreground-dark'>This is my custom Button</ThemedText>
              </Button>

              <Button variant="destructive">
                <ThemedText className='text-destructive-foreground dark:text-destructive-foreground-dark'>This is my variant Button</ThemedText>
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
