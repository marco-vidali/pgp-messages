"use client";

import { generateKeyPair } from "@/utils/pgp";
import { redirect } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function GenerateKeyPairForm() {
    const [passphrase, setPassphrase] = useState("");

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await generateKeyPair(passphrase);
        redirect("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                required
                placeholder="Passphrase"
                onChange={(e) => setPassphrase(e.currentTarget.value)}
            />

            <input type="submit" value="Generate" />
        </form>
    );
}
