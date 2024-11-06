# NativeWind Bug Report

## Description

I am trying to create custom component with variants inspired by Shadcn components and by following the [NativeWind - How to write custom components](https://www.nativewind.dev/guides/custom-components)

However, when defining variants in a component the styles are not applied when using it.

However, setting styles in the **className** when using the custom component works as expected.

## Steps

1. Installed dependencies:
   1. class-variance-authority
   2. clsx
   3. tailwind-merge
2. Created custom Text component `/components/ThemedText.tsx`. The component has variants and a default variant
   1. Also logging out styles to console
3. Use custom component in `/app/index.tsx`
