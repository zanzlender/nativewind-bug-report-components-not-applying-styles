import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { ThemedText } from '~/components/ThemedText';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <View className="flex flex-1 flex-col items-center gap-2 px-4 py-12">
          <Text className="text-blue-600">Basic text - should be blue - set in classname</Text>

          <ThemedText className="text-red-500">
            Custom text - Should be red - set in classname when using component
          </ThemedText>

          <ThemedText>
            Custom component - default variant - should be green - set in component variant
            definitions
          </ThemedText>
        </View>
      </Container>
    </>
  );
}
