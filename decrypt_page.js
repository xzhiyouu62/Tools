function generateKey(message, seed) {
    let key = [];
    let random = new Random(seed);
    for (let i = 0; i < message.length; i++) {
        key.push(random.nextInt(0, 255));
    }
    return key;
}

function decrypt(encryptedMessage, password) {
    const seed = password.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const encryptedBytes = encryptedMessage.match(/.{1,2}/g).map(byte => parseInt(byte, 16));
    const key = generateKey(encryptedBytes, seed);

    let decrypted = [];
    for (let i = 0; i < encryptedBytes.length; i++) {
        let charCode = (encryptedBytes[i] - i * 3 + 256) % 256;
        decrypted.push(String.fromCharCode(charCode ^ key[i]));
    }

    return decrypted.join("");
}

function decryptMessage() {
    const encryptedMessage = document.getElementById("encryptedMessage").value;
    const password = document.getElementById("password").value;

    if (encryptedMessage === "" || password === "") {
        alert("空白是要怎麼解密啦ε=( o｀ω′)ノ");
        return;
    }

    const decryptedMessage = decrypt(encryptedMessage, password);
    const base64EncodedMessage = btoa(btoa(decryptedMessage));
    
    document.getElementById("decryptedMessage").textContent = base64EncodedMessage;
}

class Random {
    constructor(seed) {
        this.seed = seed;
    }
    nextInt(min, max) {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        const rnd = this.seed / 233280;
        return Math.floor(min + rnd * (max - min));
    }
}