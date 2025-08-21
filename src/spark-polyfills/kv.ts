// Lightweight polyfill for Spark's useKV hook using localStorage
// API-compatible: const [value, setValue] = useKV<T>(key, initialValue)
import { useEffect, useState } from 'react'

// NOTE (AUDIT): This file is intentionally a client-side polyfill that persists data
// in the browser's localStorage. It's suitable for demos and local testing only.
// In production, replace calls to `useKV` with server API calls that persist data
// in a shared database (Supabase, Postgres, DynamoDB, etc.). Do not store any
// sensitive data in localStorage.

function readFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore quota or serialization errors
  }
}

export function useKV<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => readFromStorage(key, initialValue))

  useEffect(() => {
    writeToStorage(key, value)
  }, [key, value])

  return [value, setValue]
}

export default {
  useKV,
}
