import { type ViewProps } from 'react-native';
import { useColorScheme } from 'nativewind';
import { themes } from '../constants/themes';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '~/lib/utils';

export function ThemedView({ className, style, children, ...props }: ViewProps) {
  const colorScheme = useColorScheme().colorScheme ?? 'light';

  return (
    <SafeAreaProvider>
      <SafeAreaView 
        className={cn('flex flex-1 transition-colors duration-200', className)} 
        style={[themes[colorScheme], style]} 
        {...props} 
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}