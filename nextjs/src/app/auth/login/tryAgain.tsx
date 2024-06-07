import Link from "next/link";

export function TryAgain({ callbackURL }: { callbackURL?: string }) {
    return (
        <div className="flex flex-row justify-center items-center min-h-screen">
            <div className="flex flex-col bg-gray-700 p-8 border-2 rounded-lg justify-center items-center">
                <h3 className="text-xl font-bold py-5">Something went wrong ☹️.</h3>
                <p className="py-2">Please try again</p>
                <Link
                    href={`/auth/login${callbackURL ? `?callback=${callbackURL}` : ""}`}
                    className="text-white w-[60%] text-center content-center h-8 bg-blue-800 active:scale-95 hover:bg-blue-600 rounded-md"
                >
                    <button className="">Login</button>
                </Link>
            </div>
        </div>
    );
}
