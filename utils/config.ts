import fs from "fs";
import path from "path";
import os from "os";

interface Auth {
    [provider: string]: {
        type: string,
        key: string
    }
}

const CONFIG_DIR = path.join(os.homedir(), ".orx");
const AUTH_FILE = path.join(CONFIG_DIR, "auth.json");

export function readAuth(): Auth {
    if (!fs.existsSync(AUTH_FILE)) return {};
    const data = fs.readFileSync(AUTH_FILE, "utf-8");
    return JSON.parse(data) as Auth;
}

export function writeAuth(provider: string, type: string, key: string) {
    try {
        if (!fs.existsSync(CONFIG_DIR)) {
            fs.mkdirSync(CONFIG_DIR, { recursive: true })
        }
        console.log("Auth file: ", AUTH_FILE);
        const existing = readAuth();
        existing[provider] = {
            type,
            key
        };
        fs.writeFileSync(AUTH_FILE, JSON.stringify(existing));
    } catch (error) {
        console.error("Error while writing config: ", error);
    }
}

export function deleteAuth(provider: string) {
    const existing = readAuth();
    delete existing[provider];
    fs.writeFileSync(AUTH_FILE, JSON.stringify(existing));
}