import { tv } from 'tailwind-variants';

export const StyledText = tv({
    base: 'text-gray-50 leading-relaxed',
    variants: {
        color: {
            primary: 'text-red-50',
            secundary: 'text-blue-400',
            primary40: 'text-gray-400'
        },
        size: {
            sm: "text-sm",
            md: "text-base",
            lg: "text-2xl",
            xl: 'text-4xl',
        },
        weight: {
            '400': 'font-normal',
            '600': 'font-medium',
            '700': 'font-bold'
        },
        transform: {
            uppercase: 'uppercase',
            capitalize: 'capitalize',
            lowecase: 'lowercase'
        }
    },
    defaultVariants: {
        color: "primary",
        size: "md",
        weight: '400',
        capitalize: 'capitalize'
    }
})

export const button = tv({
    base: "bg-zinc-900 px-4 py-4 rounded-md font-bold hover:opacity-80",
    variants: {
        color: {
            primary: "bg-zinc-900 border-zinc-800",
            secondary: "bg-blue-600 text-white",
            deleted: 'bg-red-400'
        },
        size: {
            sm: 'px-4 p-2 text-sm',
            md: "px-3 py-4",
            lg: "px-4 py-4 text-base",
        },
        center: {
            flex: "flex items-center justify-center gap-2"
        }
    },
    defaultVariants: {
        size: "lg",
        color: "primary",
    }
});

export const input = tv({
    base: "text-gray-200 bg-zinc-900 rounded-md outline-none py-4 px-2 w-full focus:border focus:border-blue-400"
})
