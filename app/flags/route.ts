import { readFromJSON } from "@/utils/fileSystem";
import { NextResponse } from "next/server";

export async function GET() {
  const flags = await readFromJSON();
  return NextResponse.json(flags);
}
