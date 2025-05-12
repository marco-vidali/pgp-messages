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
            userIDs: [{ name: "", email: "" }],
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

export async function encryptMessage(
    message: string,
    recipientPublicKeyArmored: string,
    passphrase: string
) {
    try {
        const recipientPublicKey = await openpgp.readKey({
            armoredKey: recipientPublicKeyArmored,
        });

        const privateKeyArmored = localStorage.getItem("privateKey")!;

        const privateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({
                armoredKey: privateKeyArmored,
            }),
            passphrase: passphrase,
        });

        const encrypted = await openpgp.encrypt({
            message: await openpgp.createMessage({ text: message }),
            encryptionKeys: recipientPublicKey,
            signingKeys: privateKey,
            format: "armored",
        });

        return encrypted;
    } catch (error) {
        console.error("Error encrypting message:", error);
        return "";
    }
}

export async function decryptMessage(
    encryptedMessageArmored: string,
    senderPublicKeyArmored: string,
    passphrase: string
) {
    try {
        const privateKeyArmored = localStorage.getItem("privateKey")!;

        const privateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({
                armoredKey: privateKeyArmored,
            }),
            passphrase,
        });

        const message = await openpgp.readMessage({
            armoredMessage: encryptedMessageArmored,
        });

        const senderPublicKey = await openpgp.readKey({
            armoredKey: senderPublicKeyArmored,
        });

        const { data: decrypted, signatures } = await openpgp.decrypt({
            message,
            decryptionKeys: privateKey,
            verificationKeys: senderPublicKey,
            format: "utf8",
        });

        const verification = await signatures[0].verified;

        if (!verification) {
            throw new Error("Signature could not be verified or is invalid.");
        }

        return decrypted;
    } catch (error) {
        console.error("Error decrypting or verifying message:", error);
        return "";
    }
}
