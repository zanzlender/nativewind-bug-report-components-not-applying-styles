import { Stack } from 'expo-router';
import { Button } from '~/components/Button';
import { ThemedText } from '~/components/ThemedText';
import { ThemedView } from '~/components/ThemedView';
import { View } from 'react-native';
import SwitchTheme from '~/components/SwitchTheme';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <ThemedView className="bg-background flex flex-1 flex-col items-center gap-10 px-4 pt-12">
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
            <ThemedText className='text-foreground'>This is my custom Button</ThemedText>
          </Button>

          <Button variant="destructive">
            <ThemedText className='text-destructive-foreground'>This is my variant Button</ThemedText>
          </Button>
        </View>
      </ThemedView>
    </>
  );
}
