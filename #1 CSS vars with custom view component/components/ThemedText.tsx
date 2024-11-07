import { Text, type TextProps } from 'react-native';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';

const themedTextVariants = cva('text-lg transition-all duration-200', {
  variants: {
    variant: {
      default: 'text-foreground',
      yellow: 'text-yellow-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type ThemedTextProps = TextProps & VariantProps<typeof themedTextVariants>;

export function ThemedText({ className, variant, ...rest }: ThemedTextProps) {
  return <Text className={cn(themedTextVariants({ variant, className }))} {...rest} />;
}
