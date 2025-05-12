"use client";

import { useEffect, useState } from "react";
import { readStoredPublicKey } from "@/utils/pgp";

export default function ShowPublicKey() {
    const [publicKey, setPublicKey] = useState("");

    useEffect(() => {
        const fetchKey = async () => {
            const key = await readStoredPublicKey();
            setPublicKey(key);
        };
        fetchKey();
    }, []);

    return (
        <>
            <h2>Your public key</h2>
            <pre>{publicKey}</pre>
        </>
    );
}
