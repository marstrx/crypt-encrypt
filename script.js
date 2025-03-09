
async function deriveKey(password) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: enc.encode("salt"), iterations: 100000, hash: "SHA-256" },
        keyMaterial, { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]
    );
}

async function encryptText() {
    const text = document.getElementById("inputText").value;
    const password = document.getElementById("key").value;
    if (!text || !password) return alert("Please enter both text and password");

    const key = await deriveKey(password);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = new TextEncoder();
    const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(text));

    const encryptedData = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    const ivString = btoa(String.fromCharCode(...iv));

    document.getElementById("output").textContent = ivString + ":" + encryptedData;
}

async function decryptText() {
    const input = document.getElementById("inputText").value;
    const password = document.getElementById("key").value;
    if (!input || !password) return alert("Please enter both encrypted data and password");

    try {
        const [ivString, encryptedData] = input.split(":");
        const iv = new Uint8Array(atob(ivString).split("").map(c => c.charCodeAt(0)));
        const encrypted = new Uint8Array(atob(encryptedData).split("").map(c => c.charCodeAt(0)));

        const key = await deriveKey(password);
        const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encrypted);

        document.getElementById("output").textContent = new TextDecoder().decode(decrypted);
    } catch {
        alert("Decryption failed. Check password or input data.");
    }
}
