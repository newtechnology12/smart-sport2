import { NextRequest, NextResponse } from 'next/server'
import { intouchApiService } from '@/lib/services/intouchApiService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { requestTransactionId, intouchpayTransactionId } = body

    // Validate required fields
    if (!requestTransactionId || !intouchpayTransactionId) {
      return NextResponse.json(
        { success: false, message: 'Transaction IDs are required' },
        { status: 400 }
      )
    }

    // Get transaction status from InTouch API
    const statusResponse = await intouchApiService.getTransactionStatus(
      requestTransactionId,
      intouchpayTransactionId
    )

    return NextResponse.json({
      success: statusResponse.success,
      status: statusResponse.status,
      message: statusResponse.message,
      responseCode: statusResponse.responseCode
    })
  } catch (error) {
    console.error('Transaction status check error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
