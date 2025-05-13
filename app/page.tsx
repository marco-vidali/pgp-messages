import Link from "next/link";
import ShowPublicKey from "./components/ShowPublicKey";

export default function Page() {
    return (
        <div className="flex flex-col items-center gap-8">
            <h1 className="text-xl font-bold">PGP Messages</h1>

            <ShowPublicKey />

            <div className="flex gap-4">
                <Link href="/generate-key-pair">
                    <button className="btn btn-primary">
                        Regenerate key pair
                    </button>
                </Link>

                <Link href="/encrypt">
                    <button className="btn btn-primary">Encrypt message</button>
                </Link>

                <Link href="/decrypt">
                    <button className="btn btn-primary">Decrypt message</button>
                </Link>
            </div>
        </div>
    );
}
