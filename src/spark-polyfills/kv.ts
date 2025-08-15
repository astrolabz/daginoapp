// Lightweight polyfill for Spark's useKV hook using localStorage
// API-compatible: const [value, setValue] = useKV<T>(key, initialValue)
import { useEffect, useState } from 'react'

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
