import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:!cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        solid: "shadow-sm",
        outline: "border bg-transparent",
        ghost: "bg-transparent",
        dashed: "border-2 border-dashed bg-transparent",
        text: "bg-transparent underline-offset-4 hover:underline",
        link: "min-h-0 bg-transparent px-0 py-0 underline-offset-4 hover:underline",
        gradient: "shadow-lg hover:shadow-xl",
      },
      color: {
        default: "",
        primary: "",
        secondary: "",
        success: "",
        warning: "",
        danger: "",
        info: "",
        gray: "",
        red: "",
        orange: "",
        amber: "",
        yellow: "",
        lime: "",
        green: "",
        emerald: "",
        teal: "",
        cyan: "",
        sky: "",
        blue: "",
        indigo: "",
        violet: "",
        purple: "",
        fuchsia: "",
        pink: "",
        rose: "",
        white: "",
        black: "",
      },
      size: {
        xs: "min-h-7 gap-1.5 px-2.5 py-1 text-xs",
        sm: "min-h-8 gap-1.5 px-3 py-1.5 text-sm",
        md: "min-h-9 gap-2 px-4 py-2.25 text-sm",
        lg: "min-h-10 gap-2 px-5 py-2.5 text-base",
        xl: "min-h-12 gap-2.5 px-6 py-3 text-base",
      },
      shape: {
        default: "rounded-md",
        square: "rounded-none",
        rounded: "rounded-lg",
        pill: "rounded-full",
        circle: "aspect-square rounded-full p-0",
      },
    },
    compoundVariants: [
      // Solid variants - comprehensive color coverage
      {
        variant: "solid",
        color: "default",
        className:
          "bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-500 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200",
      },
      {
        variant: "solid",
        color: "primary",
        className:
          "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400",
      },
      {
        variant: "solid",
        color: "secondary",
        className:
          "bg-purple-600 text-white hover:bg-purple-700 focus-visible:ring-purple-500 dark:bg-purple-500 dark:hover:bg-purple-400",
      },
      {
        variant: "solid",
        color: "success",
        className:
          "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500 dark:bg-green-500 dark:hover:bg-green-400",
      },
      {
        variant: "solid",
        color: "warning",
        className:
          "bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-500 dark:bg-amber-400 dark:text-gray-900 dark:hover:bg-amber-300",
      },
      {
        variant: "solid",
        color: "danger",
        className:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 dark:bg-red-500 dark:hover:bg-red-400",
      },
      {
        variant: "solid",
        color: "info",
        className:
          "bg-cyan-600 text-white hover:bg-cyan-700 focus-visible:ring-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400",
      },
      {
        variant: "solid",
        color: "gray",
        className:
          "bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-500 dark:bg-gray-500 dark:hover:bg-gray-400",
      },
      {
        variant: "solid",
        color: "red",
        className:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 dark:bg-red-500 dark:hover:bg-red-400",
      },
      {
        variant: "solid",
        color: "orange",
        className:
          "bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-500 dark:bg-orange-500 dark:hover:bg-orange-400",
      },
      {
        variant: "solid",
        color: "amber",
        className:
          "bg-amber-600 text-white hover:bg-amber-700 focus-visible:ring-amber-500 dark:bg-amber-500 dark:hover:bg-amber-400",
      },
      {
        variant: "solid",
        color: "yellow",
        className:
          "bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-500 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-300",
      },
      {
        variant: "solid",
        color: "lime",
        className:
          "bg-lime-600 text-white hover:bg-lime-700 focus-visible:ring-lime-500 dark:bg-lime-500 dark:hover:bg-lime-400",
      },
      {
        variant: "solid",
        color: "green",
        className:
          "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500 dark:bg-green-500 dark:hover:bg-green-400",
      },
      {
        variant: "solid",
        color: "emerald",
        className:
          "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400",
      },
      {
        variant: "solid",
        color: "teal",
        className:
          "bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-500 dark:bg-teal-500 dark:hover:bg-teal-400",
      },
      {
        variant: "solid",
        color: "cyan",
        className:
          "bg-cyan-600 text-white hover:bg-cyan-700 focus-visible:ring-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400",
      },
      {
        variant: "solid",
        color: "sky",
        className:
          "bg-sky-600 text-white hover:bg-sky-700 focus-visible:ring-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400",
      },
      {
        variant: "solid",
        color: "blue",
        className:
          "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400",
      },
      {
        variant: "solid",
        color: "indigo",
        className:
          "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400",
      },
      {
        variant: "solid",
        color: "violet",
        className:
          "bg-violet-600 text-white hover:bg-violet-700 focus-visible:ring-violet-500 dark:bg-violet-500 dark:hover:bg-violet-400",
      },
      {
        variant: "solid",
        color: "purple",
        className:
          "bg-purple-600 text-white hover:bg-purple-700 focus-visible:ring-purple-500 dark:bg-purple-500 dark:hover:bg-purple-400",
      },
      {
        variant: "solid",
        color: "fuchsia",
        className:
          "bg-fuchsia-600 text-white hover:bg-fuchsia-700 focus-visible:ring-fuchsia-500 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-400",
      },
      {
        variant: "solid",
        color: "pink",
        className:
          "bg-pink-600 text-white hover:bg-pink-700 focus-visible:ring-pink-500 dark:bg-pink-500 dark:hover:bg-pink-400",
      },
      {
        variant: "solid",
        color: "rose",
        className:
          "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500 dark:bg-rose-500 dark:hover:bg-rose-400",
      },
      {
        variant: "solid",
        color: "white",
        className:
          "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50 focus-visible:ring-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
      },
      {
        variant: "solid",
        color: "black",
        className:
          "bg-black text-white hover:bg-gray-900 focus-visible:ring-gray-500 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200",
      },

      // Outline variants - comprehensive color coverage
      {
        variant: "outline",
        color: "default",
        className:
          "border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
      },
      {
        variant: "outline",
        color: "primary",
        className:
          "border-blue-600 text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500 dark:hover:bg-blue-950",
      },
      {
        variant: "outline",
        color: "secondary",
        className:
          "border-purple-600 text-purple-600 hover:bg-purple-50 focus-visible:ring-purple-500 dark:hover:bg-purple-950",
      },
      {
        variant: "outline",
        color: "success",
        className:
          "border-green-600 text-green-600 hover:bg-green-50 focus-visible:ring-green-500 dark:hover:bg-green-950",
      },
      {
        variant: "outline",
        color: "warning",
        className:
          "border-amber-500 text-amber-600 hover:bg-amber-50 focus-visible:ring-amber-500 dark:hover:bg-amber-950",
      },
      {
        variant: "outline",
        color: "danger",
        className:
          "border-red-600 text-red-600 hover:bg-red-50 focus-visible:ring-red-500 dark:hover:bg-red-950",
      },
      {
        variant: "outline",
        color: "info",
        className:
          "border-cyan-600 text-cyan-600 hover:bg-cyan-50 focus-visible:ring-cyan-500 dark:hover:bg-cyan-950",
      },
      {
        variant: "outline",
        color: "gray",
        className:
          "border-gray-600 text-gray-600 hover:bg-gray-50 focus-visible:ring-gray-500 dark:hover:bg-gray-950",
      },
      {
        variant: "outline",
        color: "red",
        className:
          "border-red-600 text-red-600 hover:bg-red-50 focus-visible:ring-red-500 dark:hover:bg-red-950",
      },
      {
        variant: "outline",
        color: "orange",
        className:
          "border-orange-600 text-orange-600 hover:bg-orange-50 focus-visible:ring-orange-500 dark:hover:bg-orange-950",
      },
      {
        variant: "outline",
        color: "amber",
        className:
          "border-amber-600 text-amber-600 hover:bg-amber-50 focus-visible:ring-amber-500 dark:hover:bg-amber-950",
      },
      {
        variant: "outline",
        color: "yellow",
        className:
          "border-yellow-500 text-yellow-600 hover:bg-yellow-50 focus-visible:ring-yellow-500 dark:hover:bg-yellow-950",
      },
      {
        variant: "outline",
        color: "lime",
        className:
          "border-lime-600 text-lime-600 hover:bg-lime-50 focus-visible:ring-lime-500 dark:hover:bg-lime-950",
      },
      {
        variant: "outline",
        color: "green",
        className:
          "border-green-600 text-green-600 hover:bg-green-50 focus-visible:ring-green-500 dark:hover:bg-green-950",
      },
      {
        variant: "outline",
        color: "emerald",
        className:
          "border-emerald-600 text-emerald-600 hover:bg-emerald-50 focus-visible:ring-emerald-500 dark:hover:bg-emerald-950",
      },
      {
        variant: "outline",
        color: "teal",
        className:
          "border-teal-600 text-teal-600 hover:bg-teal-50 focus-visible:ring-teal-500 dark:hover:bg-teal-950",
      },
      {
        variant: "outline",
        color: "cyan",
        className:
          "border-cyan-600 text-cyan-600 hover:bg-cyan-50 focus-visible:ring-cyan-500 dark:hover:bg-cyan-950",
      },
      {
        variant: "outline",
        color: "sky",
        className:
          "border-sky-600 text-sky-600 hover:bg-sky-50 focus-visible:ring-sky-500 dark:hover:bg-sky-950",
      },
      {
        variant: "outline",
        color: "blue",
        className:
          "border-blue-600 text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500 dark:hover:bg-blue-950",
      },
      {
        variant: "outline",
        color: "indigo",
        className:
          "border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus-visible:ring-indigo-500 dark:hover:bg-indigo-950",
      },
      {
        variant: "outline",
        color: "violet",
        className:
          "border-violet-600 text-violet-600 hover:bg-violet-50 focus-visible:ring-violet-500 dark:hover:bg-violet-950",
      },
      {
        variant: "outline",
        color: "purple",
        className:
          "border-purple-600 text-purple-600 hover:bg-purple-50 focus-visible:ring-purple-500 dark:hover:bg-purple-950",
      },
      {
        variant: "outline",
        color: "fuchsia",
        className:
          "border-fuchsia-600 text-fuchsia-600 hover:bg-fuchsia-50 focus-visible:ring-fuchsia-500 dark:hover:bg-fuchsia-950",
      },
      {
        variant: "outline",
        color: "pink",
        className:
          "border-pink-600 text-pink-600 hover:bg-pink-50 focus-visible:ring-pink-500 dark:hover:bg-pink-950",
      },
      {
        variant: "outline",
        color: "rose",
        className:
          "border-rose-600 text-rose-600 hover:bg-rose-50 focus-visible:ring-rose-500 dark:hover:bg-rose-950",
      },
      {
        variant: "outline",
        color: "white",
        className:
          "border-white text-white hover:bg-white/10 focus-visible:ring-gray-500 dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300/10",
      },
      {
        variant: "outline",
        color: "black",
        className:
          "border-black text-black hover:bg-black/10 focus-visible:ring-gray-500 dark:border-gray-100 dark:text-gray-100 dark:hover:bg-gray-100/10",
      },

      // Ghost variants - comprehensive color coverage
      {
        variant: "ghost",
        color: "default",
        className:
          "text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800",
      },
      {
        variant: "ghost",
        color: "primary",
        className:
          "text-blue-600 hover:bg-blue-100 focus-visible:ring-blue-500 dark:hover:bg-blue-950",
      },
      {
        variant: "ghost",
        color: "secondary",
        className:
          "text-purple-600 hover:bg-purple-100 focus-visible:ring-purple-500 dark:hover:bg-purple-950",
      },
      {
        variant: "ghost",
        color: "success",
        className:
          "text-green-600 hover:bg-green-100 focus-visible:ring-green-500 dark:hover:bg-green-950",
      },
      {
        variant: "ghost",
        color: "warning",
        className:
          "text-amber-600 hover:bg-amber-100 focus-visible:ring-amber-500 dark:hover:bg-amber-950",
      },
      {
        variant: "ghost",
        color: "danger",
        className: "text-red-600 hover:bg-red-100 focus-visible:ring-red-500 dark:hover:bg-red-950",
      },
      {
        variant: "ghost",
        color: "info",
        className:
          "text-cyan-600 hover:bg-cyan-100 focus-visible:ring-cyan-500 dark:hover:bg-cyan-950",
      },
      {
        variant: "ghost",
        color: "gray",
        className:
          "text-gray-600 hover:bg-gray-100 focus-visible:ring-gray-500 dark:hover:bg-gray-950",
      },
      {
        variant: "ghost",
        color: "red",
        className: "text-red-600 hover:bg-red-100 focus-visible:ring-red-500 dark:hover:bg-red-950",
      },
      {
        variant: "ghost",
        color: "orange",
        className:
          "text-orange-600 hover:bg-orange-100 focus-visible:ring-orange-500 dark:hover:bg-orange-950",
      },
      {
        variant: "ghost",
        color: "amber",
        className:
          "text-amber-600 hover:bg-amber-100 focus-visible:ring-amber-500 dark:hover:bg-amber-950",
      },
      {
        variant: "ghost",
        color: "yellow",
        className:
          "text-yellow-600 hover:bg-yellow-100 focus-visible:ring-yellow-500 dark:hover:bg-yellow-950",
      },
      {
        variant: "ghost",
        color: "lime",
        className:
          "text-lime-600 hover:bg-lime-100 focus-visible:ring-lime-500 dark:hover:bg-lime-950",
      },
      {
        variant: "ghost",
        color: "green",
        className:
          "text-green-600 hover:bg-green-100 focus-visible:ring-green-500 dark:hover:bg-green-950",
      },
      {
        variant: "ghost",
        color: "emerald",
        className:
          "text-emerald-600 hover:bg-emerald-100 focus-visible:ring-emerald-500 dark:hover:bg-emerald-950",
      },
      {
        variant: "ghost",
        color: "teal",
        className:
          "text-teal-600 hover:bg-teal-100 focus-visible:ring-teal-500 dark:hover:bg-teal-950",
      },
      {
        variant: "ghost",
        color: "cyan",
        className:
          "text-cyan-600 hover:bg-cyan-100 focus-visible:ring-cyan-500 dark:hover:bg-cyan-950",
      },
      {
        variant: "ghost",
        color: "sky",
        className: "text-sky-600 hover:bg-sky-100 focus-visible:ring-sky-500 dark:hover:bg-sky-950",
      },
      {
        variant: "ghost",
        color: "blue",
        className:
          "text-blue-600 hover:bg-blue-100 focus-visible:ring-blue-500 dark:hover:bg-blue-950",
      },
      {
        variant: "ghost",
        color: "indigo",
        className:
          "text-indigo-600 hover:bg-indigo-100 focus-visible:ring-indigo-500 dark:hover:bg-indigo-950",
      },
      {
        variant: "ghost",
        color: "violet",
        className:
          "text-violet-600 hover:bg-violet-100 focus-visible:ring-violet-500 dark:hover:bg-violet-950",
      },
      {
        variant: "ghost",
        color: "purple",
        className:
          "text-purple-600 hover:bg-purple-100 focus-visible:ring-purple-500 dark:hover:bg-purple-950",
      },
      {
        variant: "ghost",
        color: "fuchsia",
        className:
          "text-fuchsia-600 hover:bg-fuchsia-100 focus-visible:ring-fuchsia-500 dark:hover:bg-fuchsia-950",
      },
      {
        variant: "ghost",
        color: "pink",
        className:
          "text-pink-600 hover:bg-pink-100 focus-visible:ring-pink-500 dark:hover:bg-pink-950",
      },
      {
        variant: "ghost",
        color: "rose",
        className:
          "text-rose-600 hover:bg-rose-100 focus-visible:ring-rose-500 dark:hover:bg-rose-950",
      },
      {
        variant: "ghost",
        color: "white",
        className:
          "text-white hover:bg-white/20 focus-visible:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-300/20",
      },
      {
        variant: "ghost",
        color: "black",
        className:
          "text-black hover:bg-black/20 focus-visible:ring-gray-500 dark:text-gray-100 dark:hover:bg-gray-100/20",
      },

      // Dashed variants - inherit from outline colors
      {
        variant: "dashed",
        color: "default",
        className:
          "border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
      },
      {
        variant: "dashed",
        color: "primary",
        className:
          "border-blue-600 text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500 dark:hover:bg-blue-950",
      },
      {
        variant: "dashed",
        color: "secondary",
        className:
          "border-purple-600 text-purple-600 hover:bg-purple-50 focus-visible:ring-purple-500 dark:hover:bg-purple-950",
      },
      {
        variant: "dashed",
        color: "success",
        className:
          "border-green-600 text-green-600 hover:bg-green-50 focus-visible:ring-green-500 dark:hover:bg-green-950",
      },
      {
        variant: "dashed",
        color: "warning",
        className:
          "border-amber-500 text-amber-600 hover:bg-amber-50 focus-visible:ring-amber-500 dark:hover:bg-amber-950",
      },
      {
        variant: "dashed",
        color: "danger",
        className:
          "border-red-600 text-red-600 hover:bg-red-50 focus-visible:ring-red-500 dark:hover:bg-red-950",
      },
      {
        variant: "dashed",
        color: "info",
        className:
          "border-cyan-600 text-cyan-600 hover:bg-cyan-50 focus-visible:ring-cyan-500 dark:hover:bg-cyan-950",
      },
      {
        variant: "dashed",
        color: "white",
        className:
          "border-white text-white hover:bg-white/10 focus-visible:ring-gray-500 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800",
      },
      {
        variant: "dashed",
        color: "black",
        className:
          "border-black text-black hover:bg-black/10 focus-visible:ring-gray-500 dark:border-gray-100 dark:text-gray-100 dark:hover:bg-gray-100/10",
      },

      // Text variants - comprehensive color coverage
      {
        variant: "text",
        color: "default",
        className:
          "text-gray-700 hover:text-gray-900 focus-visible:ring-gray-500 dark:text-gray-300 dark:hover:text-gray-100",
      },
      {
        variant: "text",
        color: "primary",
        className:
          "text-blue-600 hover:text-blue-700 focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:text-blue-300",
      },
      {
        variant: "text",
        color: "secondary",
        className:
          "text-purple-600 hover:text-purple-700 focus-visible:ring-purple-500 dark:text-purple-400 dark:hover:text-purple-300",
      },
      {
        variant: "text",
        color: "success",
        className:
          "text-green-600 hover:text-green-700 focus-visible:ring-green-500 dark:text-green-400 dark:hover:text-green-300",
      },
      {
        variant: "text",
        color: "warning",
        className:
          "text-amber-600 hover:text-amber-700 focus-visible:ring-amber-500 dark:text-amber-400 dark:hover:text-amber-300",
      },
      {
        variant: "text",
        color: "danger",
        className:
          "text-red-600 hover:text-red-700 focus-visible:ring-red-500 dark:text-red-400 dark:hover:text-red-300",
      },
      {
        variant: "text",
        color: "info",
        className:
          "text-cyan-600 hover:text-cyan-700 focus-visible:ring-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300",
      },
      {
        variant: "text",
        color: "white",
        className:
          "text-white hover:text-gray-200 focus-visible:ring-gray-500 dark:text-gray-300 dark:hover:text-white",
      },
      {
        variant: "text",
        color: "black",
        className:
          "text-black hover:text-gray-800 focus-visible:ring-gray-500 dark:text-gray-100 dark:hover:text-white",
      },

      // Link variant - always uses primary color
      {
        variant: "link",
        className: "text-blue-600 focus-visible:ring-blue-500 dark:text-blue-400",
      },

      // Gradient variants
      {
        variant: "gradient",
        color: "primary",
        className:
          "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 dark:from-blue-500 dark:to-cyan-500 dark:hover:from-blue-400 dark:hover:to-cyan-400",
      },
      {
        variant: "gradient",
        color: "secondary",
        className:
          "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-400 dark:hover:to-pink-400",
      },
      {
        variant: "gradient",
        color: "success",
        className:
          "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-400 dark:hover:to-emerald-400",
      },
      {
        variant: "gradient",
        color: "warning",
        className:
          "bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 dark:from-amber-400 dark:to-orange-500 dark:hover:from-amber-300 dark:hover:to-orange-400",
      },
      {
        variant: "gradient",
        color: "danger",
        className:
          "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 dark:from-red-500 dark:to-rose-500 dark:hover:from-red-400 dark:hover:to-rose-400",
      },
      {
        variant: "gradient",
        color: "white",
        className:
          "bg-gradient-to-r from-gray-100 to-white text-gray-900 hover:from-gray-200 hover:to-gray-50 dark:from-gray-800 dark:to-gray-700 dark:text-white dark:hover:from-gray-700 dark:hover:to-gray-600",
      },
      {
        variant: "gradient",
        color: "black",
        className:
          "bg-gradient-to-r from-gray-900 to-black text-white hover:from-gray-800 hover:to-gray-900 dark:from-gray-200 dark:to-gray-100 dark:text-gray-900 dark:hover:from-gray-100 dark:hover:to-white",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "default",
      size: "md",
      shape: "default",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
