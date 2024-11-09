function generateKey(message, seed) {
    let key = [];
    let random = new Random(seed);
    for (let i = 0; i < message.length; i++) {
        key.push(random.nextInt(0, 255));
    }
    return key;
}

function encrypt(message) {
    const password = "20080602";
    const seed = password.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const key = generateKey(message, seed);

    let encrypted = [];
    for (let i = 0; i < message.length; i++) {
        let charCode = message.charCodeAt(i) ^ key[i];
        charCode = (charCode + i * 3) % 256;
        encrypted.push(charCode.toString(16).padStart(2, "0"));
    }

    return encrypted.join("");
}

function encryptMessage() {
    const message = document.getElementById("message").value;

    if (message === "") {
        alert("叫你輸入沒叫你空白^_____^");
        return;
    }

    const encryptedMessage = encrypt(message);
    document.getElementById("encryptedMessage").textContent = encryptedMessage;
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