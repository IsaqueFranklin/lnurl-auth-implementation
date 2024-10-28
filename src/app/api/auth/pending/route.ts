import pending from "@/map";
import { NextRequest, NextResponse } from "next/server";

export function POST(req:NextRequest) {
 const { k1, pubkey } = pending;
 return NextResponse.json({ message: k1, pubkey }, {status: 200});
}
