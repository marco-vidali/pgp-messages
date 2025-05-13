import GenerateKeyPairForm from "../components/GenerateKeyPairForm";

export default function Page() {
    return (
        <div className="flex flex-col items-center gap-8">
            <h1 className="text-2xl font-bold">Generate Key Pair</h1>
            <GenerateKeyPairForm />
        </div>
    );
}
