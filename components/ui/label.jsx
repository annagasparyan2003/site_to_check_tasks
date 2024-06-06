"use client";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const labelVariants = cva("peer-disabled:cursor-not-allowed peer-disabled:opacity-70", {
    variants: {
        variant: {
            default: "leading-none",
        },
        size: {
            default: "text-sm font-medium ",
            normal: "text-base font-normal",

        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const Label = React.forwardRef(({ variant, size, className, ...props }, ref) => (<LabelPrimitive.Root ref={ref} className={cn(labelVariants({ variant, size, className }))} {...props}/>));
Label.displayName = LabelPrimitive.Root.displayName;
export { Label };
