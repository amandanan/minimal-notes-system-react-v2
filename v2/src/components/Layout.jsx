import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import Editor from "./Editor"

const MOBILE_BREAKPOINT = 768

function Layout({
  notas,
  paginaAtiva,
  abrirPagina,
  salvarConteudo,
  criarPagina,
  criarPasta,
  deletarPasta,
  deletarPagina,
  renomearPasta,
  renomearPagina
}) {
  const [sidebarAberta, setSidebarAberta] = useState(true)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      setMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setSidebarAberta(!mobile)
  }, [mobile])

  return (
    <div
      style={{
        display:"flex",
        height:"100vh",
        width:"100vw",
        background:"#121212",
        overflow:"hidden"
      }}
    >
      {sidebarAberta && (
        <Sidebar
          notas={notas}
          paginaAtiva={paginaAtiva}
          abrirPagina={abrirPagina}
          criarPagina={criarPagina}
          criarPasta={criarPasta}
          deletarPasta={deletarPasta}
          deletarPagina={deletarPagina}
          renomearPasta={renomearPasta}
          renomearPagina={renomearPagina}
          style={{ width:"260px", maxWidth:"30%", minWidth:"200px" }}
        />
      )}

      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        {mobile && (
          <button
            onClick={() => setSidebarAberta(prev => !prev)}
            aria-label="Alternar menu"
            style={{
              margin:"10px",
              padding:"5px 10px",
              background:"#2a2a2a",
              color:"white",
              border:"none",
              borderRadius:"4px",
              cursor:"pointer"
            }}
          >
            {sidebarAberta ? "Fechar Menu" : "Abrir Menu"}
          </button>
        )}

        <Editor
          paginaAtiva={paginaAtiva}
          notas={notas}
          salvarConteudo={salvarConteudo}
        />
      </div>
    </div>
  )
}

export default Layout


