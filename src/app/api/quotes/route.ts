import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // In a real application with a provisioned PostgreSQL database, we would do:
    // await prisma.quote.create({ data: { ... } })
    
    // For this prototype, we simulate a network delay and return success
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate a mock ID
    const quoteId = `QR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json({ 
      success: true, 
      quoteId,
      message: "Quote requested successfully." 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to process request." },
      { status: 500 }
    );
  }
}
