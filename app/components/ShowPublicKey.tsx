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
            <pre className="text-center">{publicKey}</pre>
        </>
    );
}
