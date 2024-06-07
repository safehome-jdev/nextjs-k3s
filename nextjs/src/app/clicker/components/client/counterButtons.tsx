import { ComponentProps } from "react";

export function CounterButtons({ children, ...props }: ComponentProps<"div">) {
    return (
        <div {...props} className="flex flex-row gap-4">
            {children}
        </div>
    );
}

export function IncrementButton({ ...props }: ComponentProps<"button">) {
    return (
        <button
            {...props}
            type="button"
            className="h-fit transition duration-300 ease-in-out rounded-lg p-2.5 bg-blue-700 text-white hover:bg-blue-600 active:scale-95"
        >
            Increment
        </button>
    );
}
export function DecrementButton({ ...props }: ComponentProps<"button">) {
    return (
        <button
            {...props}
            type="button"
            className="h-fit transition duration-300 ease-in-out rounded-lg p-2.5 bg-rose-800 hover:bg-rose-700 active:scale-95 text-white"
        >
            Decrement
        </button>
    );
}
