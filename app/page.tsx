import Link from "next/link";
import ShowPublicKey from "./components/ShowPublicKey";

export default function Page() {
    return (
        <>
            <ShowPublicKey />

            <div>
                <Link href="/generate-key-pair">
                    <button>Regenerate key pair</button>
                </Link>

                <Link href="/encrypt">
                    <button>Encrypt message</button>
                </Link>

                <Link href="/decrypt">
                    <button>Decrypt message</button>
                </Link>
            </div>
        </>
    );
}
