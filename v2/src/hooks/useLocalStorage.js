import { useEffect, useState } from "react"

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch (error) {
      console.error("Erro ao ler localStorage:", error)
      localStorage.removeItem(key) // evita loop de erro
      return initialValue
    }
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error("Erro ao salvar no localStorage:", error)
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [key, value])

  return [value, setValue]
}
