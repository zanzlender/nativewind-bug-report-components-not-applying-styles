import { Text, type TextProps } from 'react-native';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { cva, type VariantProps } from 'class-variance-authority';

const themedTextVariants = cva('text-lg text-green-500', {
  variants: {
    variant: {
      default: 'text-5xl',
      yellow: 'text-yellow-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type ThemedTextProps = TextProps & VariantProps<typeof themedTextVariants>;

export function ThemedText({ className, variant, ...rest }: ThemedTextProps) {
  console.log(cn(themedTextVariants({ variant }), className));
  return <Text className={cn(themedTextVariants({ variant }), className)} {...rest} />;
}
