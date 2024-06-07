"use client";

import Link from "next/link";
import { useState } from "react";
import Counter from "./components/client/counter";
import { CounterButtons, DecrementButton, IncrementButton } from "./components/client/counterButtons";
import HomeIcon from "./components/client/homeIcon";

export default function Page() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col justify-center min-h-screen min-w-fit p-6 items-center text-center">
            <div className="flex flex-col border-2 border-gray-400 p-10 items-center rounded-xl bg-gray-800">
                <Counter value={count} name="count" required type="number" />
                <CounterButtons>
                    <DecrementButton onClick={() => setCount((v) => v - 1)} />
                    <IncrementButton onClick={() => setCount((v) => v + 1)} />
                </CounterButtons>
            </div>
            <Link className="p-2" href="/">
                <HomeIcon />
            </Link>
        </div>
    );
}
