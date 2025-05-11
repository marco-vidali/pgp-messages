"use client";

import {
    generateKeyPair,
    isStoredPublicKeyValid,
    readStoredPublicKey,
} from "@/utils/pgp";
import { useEffect, useState } from "react";

export default function Page() {
    const [publicKey, setPublicKey] = useState("");

    useEffect(() => {
        const initKeyPair = async () => {
            if (!(await isStoredPublicKeyValid())) generateKeyPair("test");
            setPublicKey(await readStoredPublicKey());
        };

        initKeyPair();
    }, []);

    return (
        <div>
            <h1>PGP Test</h1>
            {publicKey}
        </div>
    );
}
