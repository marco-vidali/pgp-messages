"use client";

import { isStoredPublicKeyValid, readStoredPublicKey } from "@/utils/pgp";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

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

            <div>
                <h2>Your public key</h2>
                <p>{publicKey}</p>
            </div>

            <div>
                <Link href="/encrypt">
                    <button>Encrypt message</button>
                </Link>
                <Link href="/decrypt">
                    <button>Decrypt message</button>
                </Link>
            </div>
        </div>
    );
}
