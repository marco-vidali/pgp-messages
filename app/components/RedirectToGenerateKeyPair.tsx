"use client";

import { isStoredPublicKeyValid } from "@/utils/pgp";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function RedirectToGenerateKeyPair() {
    useEffect(() => {
        const initKeyPair = async () => {
            if (!(await isStoredPublicKeyValid()))
                redirect("/generate-key-pair");
        };

        initKeyPair();
    }, []);

    return <></>;
}
