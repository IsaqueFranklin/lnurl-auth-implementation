import { utils, verify } from "@noble/secp256k1";
import pending from "@/map";
import { NextRequest, NextResponse } from "next/server";

function verifySig(sig:any, k1:any, key:any) {
 // Verify a secp256k1 signature
 const sigB = utils.hexToBytes(sig);
 const k1B = utils.hexToBytes(k1);

 // Verify the signature using the secp256k1 library
 return verify(sigB, k1B, key);
}

export function POST(req: NextRequest) {
 const { tag, k1, sig, key }:any = req.json();

 if (tag == "login" && k1 && sig && key) {
   try {
     if (verifySig(sig, k1, key)) {
       // Update the pending map
       pending.k1 = k1;
       pending.pubkey = key;

       return NextResponse.json({ message: "OK", k1, pubkey: key}, { status: 200 }); 
     }
   } catch (e) {
     console.error(e);
   }
 }

 return NextResponse.json({ message: 'FAIL'}, { status: 200 });
}
