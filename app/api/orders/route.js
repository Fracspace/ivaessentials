import { NextResponse } from 'next/server';

// Server-side orders store (Starts EMPTY - Fully Functional)
let ordersDatabase = [];

export async function GET() {
  return NextResponse.json({
    success: true,
    orders: ordersDatabase,
    count: ordersDatabase.length
  });
}

export async function POST(request) {
  try {
    let body = {};
    try {
      body = await request.json();
    } catch (e) {
      body = {};
    }
    
    const newOrder = {
      id: body.id || `IVA-${Math.floor(10000 + Math.random() * 90000)}`,
      date: body.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Order Confirmed - Preparing in Kashi',
      trackingNumber: `AWB-IVA-${Math.floor(100000 + Math.random() * 900000)}`,
      courier: 'Bluedart Express',
      estimatedDelivery: 'Dispatched within 48 Hours',
      total: body.total || 0,
      items: body.items || [],
      shippingInfo: body.shippingInfo || {},
      sankalp: body.sankalp || null
    };

    ordersDatabase.unshift(newOrder);

    return NextResponse.json({
      success: true,
      message: 'Order placed successfully',
      order: newOrder
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
