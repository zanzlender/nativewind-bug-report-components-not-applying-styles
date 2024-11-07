import React from 'react'
import { Switch, View } from 'react-native'
import { ThemedText } from './ThemedText'
import { useColorScheme } from 'nativewind'

const SwitchTheme = () => {
  const colorScheme = useColorScheme()

  return (
    <View className='flex flex-row gap-2 items-center'>
      <ThemedText className='text-md text-foreground dark:text-foreground-dark'>Light</ThemedText>
      <Switch 
        value={colorScheme.colorScheme === "dark" ? true : false} 
        onValueChange={() => colorScheme.toggleColorScheme()} 
      />
      <ThemedText className='text-md text-foreground dark:text-foreground-dark'>Dark</ThemedText>
    </View>
  )
}

export default SwitchTheme