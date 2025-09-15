'use client'

import React, { useState, useEffect } from 'react'
import { 
  X, 
  Smartphone, 
  CheckCircle,
  AlertCircle,
  Loader2,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface IntouchPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  description: string
  onPaymentComplete?: (paymentData: any) => void
  onPaymentError?: (error: string) => void
}

interface PaymentState {
  step: 'input' | 'processing' | 'success' | 'error'
  phoneNumber: string
  transactionId?: string
  intouchpayTransactionId?: string
  errorMessage?: string
  statusCheckInterval?: NodeJS.Timeout
}

export function IntouchPaymentModal({
  isOpen,
  onClose,
  amount,
  description,
  onPaymentComplete,
  onPaymentError
}: IntouchPaymentModalProps) {
  const [paymentState, setPaymentState] = useState<PaymentState>({
    step: 'input',
    phoneNumber: ''
  })

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (paymentState.statusCheckInterval) {
        clearInterval(paymentState.statusCheckInterval)
      }
    }
  }, [paymentState.statusCheckInterval])

  if (!isOpen) return null

  const validatePhoneNumber = (phone: string): boolean => {
    // Remove any spaces or special characters
    const cleanPhone = phone.replace(/\D/g, '')
    
    // Must be exactly 12 digits and start with 250
    if (!/^250\d{9}$/.test(cleanPhone)) {
      return false
    }
    
    // Check if it starts with valid Rwandan prefixes
    const validPrefixes = [
      '250078', '250079', // MTN
      '250072', '250073', '250075', '250076', '250077', // Airtel
      '250781', '250782', '250783', '250784', '250785', '250786', '250787', '250788', '250789', // MTN
      '250720', '250721', '250722', '250723', '250724', '250725', '250726', '250727', '250728', '250729' // Airtel
    ]
    
    return validPrefixes.some(prefix => cleanPhone.startsWith(prefix))
  }

  const formatPhoneNumber = (phone: string): string => {
    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length <= 3) return cleanPhone
    if (cleanPhone.length <= 6) return `${cleanPhone.slice(0, 3)} ${cleanPhone.slice(3)}`
    if (cleanPhone.length <= 9) return `${cleanPhone.slice(0, 3)} ${cleanPhone.slice(3, 6)} ${cleanPhone.slice(6)}`
    return `${cleanPhone.slice(0, 3)} ${cleanPhone.slice(3, 6)} ${cleanPhone.slice(6, 9)} ${cleanPhone.slice(9, 12)}`
  }

  const handlePhoneNumberChange = (value: string) => {
    const formatted = formatPhoneNumber(value)
    if (formatted.replace(/\D/g, '').length <= 12) {
      setPaymentState(prev => ({ ...prev, phoneNumber: formatted }))
    }
  }

  const handlePaymentRequest = async () => {
    const cleanPhone = paymentState.phoneNumber.replace(/\D/g, '')
    
    if (!validatePhoneNumber(cleanPhone)) {
      setPaymentState(prev => ({ 
        ...prev, 
        step: 'error', 
        errorMessage: 'Please enter a valid Rwandan phone number (12 digits starting with 250)' 
      }))
      return
    }

    setPaymentState(prev => ({ ...prev, step: 'processing' }))

    try {
      const response = await fetch('/api/payments/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: cleanPhone,
          amount,
          description
        })
      })

      const data = await response.json()

      if (data.success) {
        setPaymentState(prev => ({
          ...prev,
          transactionId: data.transactionId,
          intouchpayTransactionId: data.intouchpayTransactionId
        }))
        
        // Start checking payment status
        startStatusChecking(data.transactionId, data.intouchpayTransactionId)
      } else {
        setPaymentState(prev => ({
          ...prev,
          step: 'error',
          errorMessage: data.message || 'Payment request failed'
        }))
        
        if (onPaymentError) {
          onPaymentError(data.message || 'Payment request failed')
        }
      }
    } catch (error) {
      console.error('Payment request error:', error)
      setPaymentState(prev => ({
        ...prev,
        step: 'error',
        errorMessage: 'Network error. Please check your connection and try again.'
      }))
      
      if (onPaymentError) {
        onPaymentError('Network error')
      }
    }
  }

  const startStatusChecking = (transactionId: string, intouchpayTransactionId: string) => {
    let attempts = 0
    const maxAttempts = 60 // Check for 5 minutes (60 * 5 seconds)
    
    const interval = setInterval(async () => {
      attempts++
      
      try {
        const response = await fetch('/api/payments/status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestTransactionId: transactionId,
            intouchpayTransactionId
          })
        })

        const data = await response.json()

        if (data.success && data.status) {
          const status = data.status.toLowerCase()
          
          if (status === 'successful' || status === 'success' || data.responseCode === '01') {
            clearInterval(interval)
            setPaymentState(prev => ({ ...prev, step: 'success', statusCheckInterval: undefined }))
            
            if (onPaymentComplete) {
              onPaymentComplete({
                transactionId,
                intouchpayTransactionId,
                amount,
                description,
                status: 'completed',
                phoneNumber: paymentState.phoneNumber
              })
            }
          } else if (status === 'failed' || status === 'error' || data.responseCode !== '1000') {
            clearInterval(interval)
            setPaymentState(prev => ({
              ...prev,
              step: 'error',
              errorMessage: data.message || 'Payment failed',
              statusCheckInterval: undefined
            }))
            
            if (onPaymentError) {
              onPaymentError(data.message || 'Payment failed')
            }
          }
        }
        
        // Stop checking after max attempts
        if (attempts >= maxAttempts) {
          clearInterval(interval)
          setPaymentState(prev => ({
            ...prev,
            step: 'error',
            errorMessage: 'Payment timeout. Please check your mobile money account.',
            statusCheckInterval: undefined
          }))
          
          if (onPaymentError) {
            onPaymentError('Payment timeout')
          }
        }
      } catch (error) {
        console.error('Status check error:', error)
        // Continue checking on network errors
      }
    }, 5000) // Check every 5 seconds

    setPaymentState(prev => ({ ...prev, statusCheckInterval: interval }))
  }

  const handleClose = () => {
    if (paymentState.statusCheckInterval) {
      clearInterval(paymentState.statusCheckInterval)
    }
    setPaymentState({ step: 'input', phoneNumber: '' })
    onClose()
  }

  const renderContent = () => {
    switch (paymentState.step) {
      case 'input':
        return (
          <>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Smartphone className="w-6 h-6 text-primary" />
                Mobile Money Payment
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Pay {amount.toLocaleString()} RWF using MTN Mobile Money or Airtel Money
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Mobile Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="250 7XX XXX XXX"
                  value={paymentState.phoneNumber}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                  className="text-center text-lg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your MTN or Airtel mobile money number
                </p>
              </div>
              
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm font-medium">Payment Details:</p>
                <p className="text-sm text-muted-foreground">{description}</p>
                <p className="text-lg font-bold text-primary">{amount.toLocaleString()} RWF</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={handlePaymentRequest}
                  disabled={!validatePhoneNumber(paymentState.phoneNumber.replace(/\D/g, ''))}
                  className="flex-1"
                >
                  Pay Now
                </Button>
              </div>
            </CardContent>
          </>
        )

      case 'processing':
        return (
          <>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Clock className="w-6 h-6 text-primary animate-pulse" />
                Processing Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
              <div>
                <p className="font-medium">Payment request sent!</p>
                <p className="text-sm text-muted-foreground">
                  Please check your phone and enter your PIN to complete the payment
                </p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm">Amount: <span className="font-bold">{amount.toLocaleString()} RWF</span></p>
                <p className="text-sm">Phone: <span className="font-bold">{paymentState.phoneNumber}</span></p>
              </div>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </CardContent>
          </>
        )

      case 'success':
        return (
          <>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                Payment Successful!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 font-medium">
                  Your payment of {amount.toLocaleString()} RWF has been processed successfully.
                </p>
                {paymentState.transactionId && (
                  <p className="text-sm text-green-600 mt-2">
                    Transaction ID: {paymentState.transactionId}
                  </p>
                )}
              </div>
              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            </CardContent>
          </>
        )

      case 'error':
        return (
          <>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-red-600">
                <AlertCircle className="w-6 h-6" />
                Payment Failed
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-800">
                  {paymentState.errorMessage || 'An error occurred while processing your payment.'}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Close
                </Button>
                <Button 
                  onClick={() => setPaymentState(prev => ({ ...prev, step: 'input', errorMessage: undefined }))}
                  className="flex-1"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        {renderContent()}
      </Card>
    </div>
  )
}
