import { bech32 } from "bech32";

export function encodeLnurl(string:any){
    const words = bech32.toWords(Buffer.from(string, "utf8"));
    return bech32.encode("lnurl", words, Number.MAX_SAFE_INTEGER);
}

export function decodeLnurl(string:any){
    const {words} = bech32.decode(string, Number.MAX_SAFE_INTEGER);
    return Buffer.from(bech32.fromWords(words)).toString("utf8");
}