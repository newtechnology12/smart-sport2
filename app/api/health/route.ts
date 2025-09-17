import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health check
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'SmartSports Rwanda Frontend',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024),
      },
      checks: {
        api: await checkBackendAPI(),
      }
    };

    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

async function checkBackendAPI(): Promise<{ status: string; responseTime?: number }> {
  try {
    const startTime = Date.now();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    
    const response = await fetch(`${apiUrl.replace('/api/v1', '')}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout
      signal: AbortSignal.timeout(5000),
    });

    const responseTime = Date.now() - startTime;

    if (response.ok) {
      return {
        status: 'healthy',
        responseTime,
      };
    } else {
      return {
        status: 'unhealthy',
        responseTime,
      };
    }
  } catch (error) {
    return {
      status: 'unhealthy',
    };
  }
}
