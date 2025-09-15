import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get the callback data
    const body = await request.text()
    let callbackData: any

    try {
      // Try to parse as JSON first
      callbackData = JSON.parse(body)
    } catch {
      // If JSON parsing fails, try to parse as form data
      const formData = new URLSearchParams(body)
      callbackData = Object.fromEntries(formData.entries())
    }

    // Check if we have jsonpayload (as mentioned in the documentation)
    if (callbackData.jsonpayload) {
      try {
        callbackData = JSON.parse(callbackData.jsonpayload)
      } catch {
        // If parsing fails, use the original data
      }
    }

    console.log('Payment callback received:', callbackData)

    // Extract callback information
    const {
      requesttransactionid: requestTransactionId,
      transactionid: intouchpayTransactionId,
      status,
      responsecode: responseCode,
      statusdesc: statusDesc,
      referenceno: referenceNo
    } = callbackData

    // Validate required fields
    if (!requestTransactionId || !status) {
      console.error('Invalid callback data - missing required fields')
      return NextResponse.json(
        { success: false, message: 'Invalid callback data' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Update your database with the transaction status
    // 2. Send notifications to users
    // 3. Trigger any business logic based on payment status
    
    // For now, we'll just log the callback and return success
    console.log('Payment callback processed:', {
      requestTransactionId,
      intouchpayTransactionId,
      status,
      responseCode,
      statusDesc,
      referenceNo
    })

    // TODO: Implement database update logic here
    // Example:
    // await updateTransactionStatus(requestTransactionId, {
    //   status: status.toLowerCase(),
    //   responseCode,
    //   statusDesc,
    //   referenceNo,
    //   intouchpayTransactionId
    // })

    // Send success response back to IntouchPay
    return NextResponse.json({
      message: 'success',
      success: true,
      request_id: requestTransactionId
    })
  } catch (error) {
    console.error('Payment callback error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
