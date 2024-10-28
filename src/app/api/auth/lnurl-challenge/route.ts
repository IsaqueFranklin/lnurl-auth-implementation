import { encodeLnurl } from "@/utils";
import { utils } from "@noble/secp256k1";
import { NextRequest, NextResponse } from "next/server";

export function POST(req: NextRequest){
    //Get the host from request headers
    const { host }:any = req.headers;

    const generateK1 = utils.bytesToHex(utils.randomBytes(32));

    //generate the lnurl-auth login URL using the full URL and generated k1 value
    const fullUrl = `https://${host}/api/auth/lnurl-auth`;
    const lnurl = generateLnurl(fullUrl, generateK1);

    return NextResponse.json({ message: lnurl }, { status: 200 });
}

function generateLnurl(url: any, k1: any){
    // Generate the lnurl-auth URL with the provided k1 value
    // The login URL should include the tag, k1 value, and action
    return encodeLnurl(`${url}?tag=login&k1=${k1}&action=login`);
}