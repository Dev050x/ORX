import fs from "fs";
import path from "path";
import os from "os";

interface Auth {
    [provider: string]: {
        type: string,
        key: string,
        model: string,
        default: boolean
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
            key,
            model: (provider === "gemini" ? "gemini-2.5-flash" : ""),
            default: (provider === "gemini" ? true : false),
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


export function setDefault(provider: string, model: string) {
    const existing = readAuth();
    for (const [p, data] of Object.entries(existing)) {
        if (existing[p]?.default === true) {
            existing[p].default = false;
            break;
        }
    }
    if (existing[provider]) {
        existing[provider].default = true;
        existing[provider].model = model;
        fs.writeFileSync(AUTH_FILE, JSON.stringify(existing))
    } else {
        console.log("please login with this model first");
    }
}

export function getDeault() {
    const existing = readAuth();
    for(const [p, data] of Object.entries(existing)) {
        if(data.default === true) {
            return {
                model: data.model,
                key: data.key
            }
        }
    }
    return null;
}