import { vars } from 'nativewind';

export const themes = {
  light: vars({
    '--primary': 'hsl(210 40% 98%)',
    '--primary-foreground': 'hsl(222.2 47.4% 11.2%)',
    '--background': "hsl(0 0% 100%)",
    "--foreground": "hsl(222.2 84% 4.9%)",
    "--destructive": "hsl(0 84.2% 60.2%)",
    "--destructive-foreground": "hsl(210 40% 98%)",
    "--border": "hsl(214.3 31.8% 91.4%)",
  }),
  dark: vars({
    '--primary': 'hsl(222.2 47.4% 11.2%)',
    '--primary-foreground': 'hsl(210 40% 98%)',
    '--background': "hsl(222.2 84% 4.9%)",
    "--foreground": "hsl(210 40% 98%)",
    "--destructive": "hsl(0 62.8% 30.6%)",
    "--destructive-foreground": "hsl(210 40% 98%)",
    "--border": "hsl(217.2 32.6% 17.5%)",
  }),
} as const;