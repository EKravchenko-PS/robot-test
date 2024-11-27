import { NextResponse } from 'next/server'

export async function GET() {
  // Здесь бы происходило реальное взаимодействие с API Bitrix24
  return NextResponse.json({ robots: ['robot1', 'robot2', 'robot3'] })
}

