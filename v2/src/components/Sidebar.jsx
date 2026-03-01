import { useState, useEffect } from "react"
import Botao from "./Botao"

function Sidebar({
  notas = {},
  paginaAtiva,
  abrirPagina,
  criarPagina,
  criarPasta,
  deletarPasta,
  deletarPagina,
  renomearPasta,
  renomearPagina,
  style
}) {
  const [pastasAbertas, setPastasAbertas] = useState({})
  const [busca, setBusca] = useState("")

  function togglePasta(pasta) {
    setPastasAbertas(prev => ({
      ...prev,
      [pasta]: !prev[pasta]
    }))
  }

  // Abre automaticamente a pasta da página ativa
  useEffect(() => {
    if (paginaAtiva) {
      setPastasAbertas(prev => ({
        ...prev,
        [paginaAtiva.pasta]: true
      }))
    }
  }, [paginaAtiva])

  return (
    <div style={{ background:"#181818", color:"white", padding:"20px", overflowY:"auto", ...style }}>
      <h2>Notas</h2>

      <input
        type="text"
        placeholder="Buscar..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{ width:"100%", marginBottom:"10px", padding:"5px" }}
      />

      <Botao
        onClick={() => {
          const nome = prompt("Nome da nova pasta:")
          criarPasta(nome)
        }}
        style={{ width:"100%", marginBottom:"10px" }}
      >
        📁 Nova Pasta
      </Botao>

      {Object.keys(notas).map(pasta => {
        const paginas = Object.keys(notas[pasta] || {})
        const paginasFiltradas = paginas.filter(p =>
          p.toLowerCase().includes(busca.toLowerCase())
        )

        if (
          busca &&
          !pasta.toLowerCase().includes(busca.toLowerCase()) &&
          paginasFiltradas.length === 0
        ) return null

        const aberta = !!pastasAbertas[pasta]
        const pastaAtiva = paginas.some(
          p => paginaAtiva?.pasta === pasta && paginaAtiva?.pagina === p
        )

        return (
          <div key={pasta} style={{ marginBottom:"15px" }}>
            <div
              onClick={() => togglePasta(pasta)}
              style={{
                cursor:"pointer",
                fontWeight:"bold",
                display:"flex",
                justifyContent:"space-between",
                backgroundColor: pastaAtiva ? "#2a2a2a" : "transparent",
                padding: pastaAtiva ? "4px 6px" : "2px 0",
                borderRadius:"4px"
              }}
            >
              <span>{aberta ? "📂" : "📁"} {pasta}</span>
              <div>
                <span onClick={e => { e.stopPropagation(); renomearPasta(pasta) }}>✏️</span>
                <span onClick={e => { e.stopPropagation(); deletarPasta(pasta) }} style={{ marginLeft:"5px" }}>🗑</span>
              </div>
            </div>

            {aberta && (
              <div style={{ marginTop:"5px", marginLeft:"10px" }}>
                {paginasFiltradas.map(pagina => {
                  const ativa = paginaAtiva?.pasta === pasta && paginaAtiva?.pagina === pagina

                  return (
                    <div
                      key={pagina}
                      style={{
                        display:"flex",
                        justifyContent:"space-between",
                        fontSize:"14px",
                        marginBottom:"4px",
                        cursor:"pointer",
                        backgroundColor: ativa ? "#2a2a2a" : "transparent",
                        padding: ativa ? "4px 6px" : "2px 6px",
                        borderRadius:"4px"
                      }}
                    >
                      <span onClick={() => abrirPagina(pasta, pagina)}>📄 {pagina}</span>
                      <div>
                        <span onClick={() => renomearPagina(pasta, pagina)}>✏️</span>
                        <span onClick={() => deletarPagina(pasta, pagina)} style={{ marginLeft:"5px" }}>🗑</span>
                      </div>
                    </div>
                  )
                })}

                <Botao
                  onClick={() => {
                    const nome = prompt("Nome da nova página:")
                    criarPagina(pasta, nome)
                  }}
                  style={{ width:"100%", fontSize:"12px", marginTop:"5px" }}
                >
                  + Nova Página
                </Botao>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Sidebar



