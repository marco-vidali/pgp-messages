import { PropsWithChildren } from "react";

export default function Button({ children }: PropsWithChildren) {
    return (
        <button className="bg-black text-white px-4 py-2 rounded-full cursor-pointer">
            {children}
        </button>
    );
}
