"use client";

import { generateKeyPair } from "@/utils/pgp";
import { redirect } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import Button from "./Button";

export default function GenerateKeyPairForm() {
    const [passphrase, setPassphrase] = useState("");

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await generateKeyPair(passphrase);
        redirect("/");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="password"
                required
                placeholder="Passphrase"
                onChange={(e) => setPassphrase(e.currentTarget.value)}
                className="px-4 py-2 border border-black rounded-full"
            />

            <Button>Generate</Button>
        </form>
    );
}
