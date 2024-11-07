import { Pressable, View, type PressableProps } from 'react-native';

import { cn } from '../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

/**
 * Text classes will not be passed to the Text component
 * if it's a descendant of a ThemedText component.
 *
 * You need to set it yourself to match the variant of the
 * Button you are using.
 *
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary border border-primary-dark/30 dark:bg-primary-dark text-primary-foreground dark:text-primary-foreground-dark hover:bg-primary/90 dark:hover:bg-primary-dark/90', 
        destructive: 'bg-destructive text-destructive-foreground dark:bg-destructive-dark dark:text-destructive-foreground-dark hover:bg-destructive/90 dark:hover:bg-destructive-dark/90',
      },
      size: {
        default: 'h-12 px-4 py-2',
        sm: 'h-10 rounded-md px-3',
        lg: 'h-14 rounded-md px-8',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',

      size: 'default',
    },
  }
);

export type ThemedButtonProps = PressableProps & { asChild?: boolean } & VariantProps<
    typeof buttonVariants
  >;

const Button = forwardRef<View, ThemedButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    return (
      <Pressable
        className={`${cn(buttonVariants({ variant, size, className }))}`}
        ref={ref}
        {...props}>
        {children}
      </Pressable>
    );
  }
);


export { Button, buttonVariants };
