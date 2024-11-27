import { NextResponse } from 'next/server'

export async function POST() {
  // Здесь бы происходило реальное взаимодействие с API Bitrix24
  return NextResponse.json({ message: "Робот успешно удален" })
}

