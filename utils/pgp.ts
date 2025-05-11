import * as openpgp from "openpgp";

async function isPublicKeyValid(key: string) {
    try {
        const parsedKey = await openpgp.readKey({ armoredKey: key });
        return !parsedKey.isPrivate();
    } catch (error) {
        console.error("Failed to parse key:", error);
        return false;
    }
}

export async function isStoredPublicKeyValid() {
    const publicKey = localStorage.getItem("publicKey");

    if (publicKey) {
        const isValid = await isPublicKeyValid(publicKey);

        if (isValid) {
            console.log("Valid public key found in localStorage.");
            return true;
        } else {
            console.log("Invalid or private key found in localStorage.");
            return false;
        }
    } else {
        console.log("No public key in localStorage.");
        return false;
    }
}

export async function generateKeyPair(passphrase: string) {
    try {
        const { privateKey, publicKey } = await openpgp.generateKey({
            userIDs: [{ name: "John Doe", email: "johndoe@example.com" }],
            passphrase: passphrase,
            format: "armored",
        });

        localStorage.setItem("publicKey", publicKey);
        localStorage.setItem("privateKey", privateKey);

        console.log("Key pair generated and stored in localStorage.");
    } catch (error) {
        console.error("Error generating key pair:", error);
    }
}

export async function readStoredPublicKey() {
    return localStorage.getItem("publicKey")!;
}
