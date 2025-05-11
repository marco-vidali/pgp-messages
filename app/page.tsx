"use client";

import { isStoredPublicKeyValid, readStoredPublicKey } from "@/utils/pgp";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [publicKey, setPublicKey] = useState("");

    useEffect(() => {
        const initKeyPair = async () => {
            if (!(await isStoredPublicKeyValid()))
                redirect("/generate-key-pair");
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
