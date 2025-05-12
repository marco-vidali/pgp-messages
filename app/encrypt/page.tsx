export default function Page() {
    return (
        <>
            <h1>Encrypt Message</h1>

            <div style={{ display: "flex", height: "calc(100vh - 100px)" }}>
                <textarea
                    placeholder="Recipient public key"
                    style={{ flex: 1, height: "100%", resize: "none" }}
                />

                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <textarea
                        placeholder="Message"
                        style={{ resize: "none", flex: 1 }}
                    />
                    <textarea
                        placeholder="Encrypted message"
                        readOnly
                        style={{ resize: "none", flex: 1 }}
                    />
                </div>
            </div>
        </>
    );
}
