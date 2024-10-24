import { NextResponse } from 'next/server'

export async function Get() {
  const data = {
    message: 'Hello, next,js!',
  }
  return NextResponse.json(data)
}
