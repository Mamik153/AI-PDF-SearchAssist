import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/common-utils";



const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-b from-blue-400 to-blue-600 text-primary-foreground shadow-sm bg-[length:100%_100%] bg-[bottom] hover:bg-[length:100%_150%] inset-shadow-[0_1px_rgb(255_255_255/0.25)] transition-all  ease-in-out duration-300",
        destructive:
          "bg-linear-to-b from-destructive to-red-600 text-white shadow-sm bg-[length:100%_100%] bg-[bottom] hover:bg-[length:100%_150%] inset-shadow-[0_1px_rgb(255_255_255/0.15)] transition-all ease-in-out duration-300",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground shadow-sm bg-[length:100%_100%] bg-[bottom] hover:bg-[length:100%_150%] inset-shadow-[0_1px_rgb(255_255_255/0.15)] transition-all  ease-in-out duration-300",
        secondary:
          "bg-linear-to-b from-neutral-600 to-neutral-800 text-white shadow-sm bg-[length:100%_100%] bg-[bottom] hover:bg-[length:100%_150%] inset-shadow-[0_1px_rgb(255_255_255/0.15)] transition-all  ease-in-out duration-300",
        ghost: "hover:bg-accent hover:text-accent-foreground bg-[length:100%_100%] bg-[bottom] hover:bg-[length:100%_150%] transition-all ease-in-out duration-300",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
