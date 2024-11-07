# NativeWind with ShadCN inspired component pattern

> A working example of my take on shadcn's component pattern in NativeWind.

> **IMO:** #1 is the best pattern

This repo showcases 3 different ways of implementing the same component pattern.

However, neither are 100% like Shadcn's component pattern, and each comes with their own tradeoffs.

There might be more patterns and ways you could make this work but these ones were my favorites.

## Idea

The main idea behind this approach is using **CSS variables for styling** to make it easier to change the theme, while using variants for components.

Technically you could decide to not use CSS variables, and just use the :dark selector for everything and it would be fine - with the exception of [Restrictions & considerations](#restrictions--considerations)

## Content

- [NativeWind with ShadCN inspired component pattern](#nativewind-with-shadcn-inspired-component-pattern)
  - [Idea](#idea)
  - [Content](#content)
  - [#1 - Using CSS Variables (kind of) with the NativeWind vars() method, and a custom View component](#1---using-css-variables-kind-of-with-the-nativewind-vars-method-and-a-custom-view-component)
  - [#2- Using different CSS variables for light and dark mode](#2--using-different-css-variables-for-light-and-dark-mode)
  - [#3 - Not using CSS variables](#3---not-using-css-variables)
  - [Restrictions \& considerations](#restrictions--considerations)
    - [Some parent properties are not passed onto children](#some-parent-properties-are-not-passed-onto-children)
    - [Setting "dark" class on the root component doesn't affect descendants](#setting-dark-class-on-the-root-component-doesnt-affect-descendants)
    - [Other](#other)
  - [Comparison](#comparison)
    - [#1](#1)
    - [#2](#2)
    - [#3](#3)

## #1 - Using CSS Variables (kind of) with the NativeWind vars() method, and a custom View component

Is basically like Shadcn, however:

- CSS Variables are defined in an object, like shown in `/constants/theme.ts`
- you need to create a custom View component (or similar), or a Context provider in which you need to inject the **light** OR **dark** properties of the themes object into the **styles** prop of that component - those values will be passed to all descendants
- all other [Restrictions & considerations](#restrictions--considerations) apply

<br />

Following these differences, you have to do this:

`/constants/theme.ts`

```ts
import { vars } from 'nativewind';

export const themes = {
  light: vars({
    '--primary': 'hsl(222.2 47.4% 11.2%)',
    '--primary-foreground': 'hsl(210 40% 98%)',
  }),
  dark: vars({
    '--primary': 'hsl(210 40% 98%)',
    '--primary-foreground': 'hsl(222.2 47.4% 11.2%)',
  }),
} as const;
```

the `tailwind.config.js` file will look like normal:

```js
module.exports = {
  ...
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
      },
    },
  },
};
```

Example of a custom View component which HAS to be used in all screens.

`/components/ThemedView.tsx`

```tsx
import { View, type ViewProps } from 'react-native';
import { useColorScheme } from 'nativewind';
import { themes } from '@/constants/themes';

export function ThemedView({ style, children, ...props }: ViewProps) {
  const colorScheme = useColorScheme().colorScheme ?? 'light';

  return (
    <View {...props} style={[themes[colorScheme], style]}>
      {children}
    </View>
  );
}
```

Finally, your code will look like this:

```tsx
<ThemedView>
   <Button className="bg-primary">
      <Text className="text-primary-foreground">Login</Text>
   <Button>
</ThemedView>
```

## #2- Using different CSS variables for light and dark mode

> TLDR; create light and dark vars, **-dark** is just appended to the normal variable name

Is basically like Shadcn when using it with CSS Variables, the differences are:

- you need to specify CSS vars for both light and dark mode
- You need to define additional colors in the `tailwind.config.js` so that you can use those variables
- You must use the **:dark** selector for styling, and NOT update the CSS vars via the **.dark** class in your CSS file
- all other [Restrictions & considerations](#restrictions--considerations) apply

<br/>

Following those differences we have to do this:

`/app/global.css`

```css
@layer base {
  :root {
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --primary__dark: 222.2 47.4% 11.2%;
    --primary-foreground__dark: 210 40% 98%;
  }
  /* NOTICE no .dark{} modifier */
}
```

which in turn means you have to do the same in `tailwind.config.js`

```js
module.exports = {
  ...
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          dark: 'hsl(var(--primary__dark))',
          "foreground-dark": 'hsl(var(--primary-foreground__dark))',
        },
      }
    }
  }
};
```

Finally, your code will look like this:

```tsx
<Button className="bg-primary dark:bg-primary-dark">
  <Text className="text-primary-foreground dark:bg-primary-foreground-dark">Login</Text>
<Button>
```

## #3 - Not using CSS variables

If you are not using CSS variables, you can just use the :dark selector and it will work fine.

- all other [Restrictions & considerations](#restrictions--considerations) apply

Your code will look like this, which is normall when not using CSS vars:

```tsx
<Button className="bg-red-500 dark:bg-blue-500">
  <Text className="text-white dark:text-gray-200">Login</Text>
<Button>
```

## Restrictions & considerations

Sadly, as was already mentioned, it's not possible to be 100% the same as Shadcn's pattern because of mobile restrictions.

These are the main considerations you have to take into account:

### Some parent properties are not passed onto children

For example, a **Button** with `className="text-blue-500"` will not pass the text color to a **Text** child component - [NativeWind - Colors are not working](https://www.nativewind.dev/guides/troubleshooting#colors-are-not-working). Because of this you need to pass the color down yourself. So when using a button with a text child you would have to do it like this:

```tsx
<Button>
  <Text className="dark:text-primary-foreground_dark text-primary-foreground">Login</Text>
</Button>
```

### Setting "dark" class on the root component doesn't affect descendants

On the web, when you set the className of the **html** tag to **dark** it will affect all descendants, and all styles will apply correctly. On mobile, however, this doesn't work.

Example #1 tries to solve this by only applying the "dark" or "light" color variables to it's descendants - so that we can keep a single name like **bg-primary**.

Example #2 tries to solve this by defining additional modifiers for the CSS variables, like \_\_dark so that we can easily see and use them.

### Other

There are more things to consider, but the "sometimes not passing styles to children" one is one of the biggest differences in the way you write the variants.

For everything else, read the [offical NativeWind docs](https://www.nativewind.dev/).

## Comparison

From the goals I had in mind when I started to try this pattern, the one that made me decide on which approach to use was - "how will I write the final classNames"

So to summarize and compare those approaches:

### #1

**Drawbacks:**

- you need to create a custom View component (or similar, or context) in which you inject the color varaibles into the styles prop
- you need to always use the Custom componenta as a wrapper or the styles won't apply

```tsx
{/** EVERY SCREEN MUST USE THE THEMED VIEW COMPONENT OR STYLES WONT APPLY*/}
<ThemedView>
   <Button className="bg-primary">
      <Text className="text-primary-foreground">Login</Text>
   <Button>
</ThemedView>
```

### #2

**Drawbacks:**

- you need to write styles with the :dark selector

```tsx
<Button className="bg-primary dark:bg-primary-dark">
  <Text className="text-primary-foreground dark:bg-primary-foreground-dark">Login</Text>
<Button>
```

### #3

**Drawbacks:**

- you need to write styles with the :dark selector
- you don't have a unified place where you define colors, making themeing more difficult

```tsx
<Button className="bg-red-500 dark:bg-blue-500">
  <Text className="text-white dark:text-gray-200">Login</Text>
<Button>
```
