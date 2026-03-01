import { useState } from "react"
import Layout from "./components/Layout"
import { useLocalStorage } from "./hooks/useLocalStorage"

const STORAGE_KEY = "notas-v2-react"

function App() {
  const [notas, setNotas] = useLocalStorage(STORAGE_KEY, {
    Geral: { "Minha primeira nota": "Olá, mundo em React!" }
  })
  const [paginaAtiva, setPaginaAtiva] = useState(null)

  function abrirPagina(pasta, pagina) {
    setPaginaAtiva({ pasta, pagina })
  }

  function salvarConteudo(pasta, pagina, texto) {
    setNotas(prev => ({
      ...prev,
      [pasta]: { ...prev[pasta], [pagina]: texto }
    }))
  }

  function criarPagina(pasta, nomePagina) {
    if (!nomePagina) return

    setNotas(prev => {
      if (prev[pasta]?.[nomePagina]) {
        alert("Página já existe")
        return prev
      }
      return {
        ...prev,
        [pasta]: { ...prev[pasta], [nomePagina]: "" }
      }
    })

    setPaginaAtiva({ pasta, pagina: nomePagina })
  }

  function criarPasta(nomePasta) {
    if (!nomePasta) return

    setNotas(prev => {
      if (prev[nomePasta]) {
        alert("Pasta já existe")
        return prev
      }
      return { ...prev, [nomePasta]: {} }
    })
  }

  function deletarPasta(nomePasta) {
    if (!window.confirm("Deseja deletar essa pasta?")) return

    setNotas(prev => {
      const copia = { ...prev }
      delete copia[nomePasta]
      return copia
    })

    setPaginaAtiva(null)
  }

  function deletarPagina(pasta, pagina) {
    if (!window.confirm("Deseja deletar essa página?")) return

    setNotas(prev => ({
      ...prev,
      [pasta]: Object.fromEntries(
        Object.entries(prev[pasta]).filter(
          ([nomePagina]) => nomePagina !== pagina
        )
      )
    }))

    setPaginaAtiva(null)
  }

  function renomearPasta(nomeAtual) {
    const novoNome = prompt("Novo nome da pasta:", nomeAtual)
    if (!novoNome || novoNome === nomeAtual) return

    setNotas(prev => {
      if (prev[novoNome]) {
        alert("Pasta já existe")
        return prev
      }

      const copia = { ...prev }
      copia[novoNome] = copia[nomeAtual]
      delete copia[nomeAtual]
      return copia
    })
  }

  function renomearPagina(pasta, nomeAtual) {
    const novoNome = prompt("Novo nome da página:", nomeAtual)
    if (!novoNome || novoNome === nomeAtual) return

    setNotas(prev => {
      if (prev[pasta][novoNome]) {
        alert("Página já existe")
        return prev
      }

      const { [nomeAtual]: conteudo, ...restoPaginas } = prev[pasta]

      return {
        ...prev,
        [pasta]: {
          ...restoPaginas,
          [novoNome]: conteudo
        }
      }
    })
  }

  return (
    <Layout
      notas={notas}
      paginaAtiva={paginaAtiva}
      abrirPagina={abrirPagina}
      salvarConteudo={salvarConteudo}
      criarPagina={criarPagina}
      criarPasta={criarPasta}
      deletarPasta={deletarPasta}
      deletarPagina={deletarPagina}
      renomearPasta={renomearPasta}
      renomearPagina={renomearPagina}
    />
  )
}

export default App


