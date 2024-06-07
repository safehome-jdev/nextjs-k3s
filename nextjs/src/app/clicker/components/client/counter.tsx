import { ComponentProps } from "react";

export default function Counter({ ...props }: ComponentProps<"input">) {
    return (
        <div className="bg-gray-700 p-4 mb-4 rounded-lg  max-w-[50%] items-center overflow-hidden">
            <label htmlFor="count" className="flex flex-row">
                Count:
                <input {...props} className="bg-transparent pl-4" disabled={true} />
            </label>
        </div>
    );
}
