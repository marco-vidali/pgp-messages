import Link from "next/link";
import ShowPublicKey from "./components/ShowPublicKey";
import Button from "./components/Button";

export default function Page() {
    return (
        <div className="flex flex-col items-center gap-8">
            <h1 className="text-2xl font-bold">PGP Messages</h1>

            <ShowPublicKey />

            <div className="flex gap-4">
                <Link href="/generate-key-pair">
                    <Button>Regenerate key pair</Button>
                </Link>

                <Link href="/encrypt">
                    <Button>Encrypt message</Button>
                </Link>

                <Link href="/decrypt">
                    <Button>Decrypt message</Button>
                </Link>
            </div>
        </div>
    );
}
