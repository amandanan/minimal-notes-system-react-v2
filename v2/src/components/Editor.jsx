import { useEffect, useState } from "react"

function Editor({ paginaAtiva, notas, salvarConteudo, style }) {
  const [texto, setTexto] = useState("")

  useEffect(() => {
    if (!paginaAtiva) return

    const conteudo =
      notas?.[paginaAtiva.pasta]?.[paginaAtiva.pagina] ?? ""

    setTexto(conteudo)
  }, [paginaAtiva, notas])

  if (!paginaAtiva) {
    return (
      <div
        style={{
          flex: 1,
          color: "#777",
          padding: "40px",
          ...style
        }}
      >
        Selecione uma página
      </div>
    )
  }

  return (
    <div
      style={{
        flex: 1,
        padding: "40px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        ...style
      }}
    >
      <h2>{paginaAtiva.pagina}</h2>

      <textarea
        value={texto}
        onChange={(e) => {
          const valor = e.target.value
          setTexto(valor)
          salvarConteudo(
            paginaAtiva.pasta,
            paginaAtiva.pagina,
            valor
          )
        }}
        style={{
          flex: 1,
          background: "#121212",
          color: "white",
          border: "1px solid #333",
          padding: "10px",
          resize: "none"
        }}
      />
    </div>
  )
}

export default Editor

