function render(){
  const app = document.getElementById('app')
  
  // --- TELA HOME ---
  if(state.tela === 'home'){
    let html = `<div style="margin-bottom:20px"><h2>🔥 Destaques</h2></div>`
    
    state.liveGames.forEach(game => {
      // Função auxiliar para checar se está selecionado (para pintar de roxo)
      const isSel = (tipo, sel) => state.cupom.find(i => i.idUnico === `${game.id}-${tipo}-${sel}`) ? 'selected' : ''

      html += `
        <div class="card match-card">
          <div style="font-size:12px; color:var(--accent); font-weight:bold;">${game.league} • ${game.time}</div>
          
          <div class="teams">
            <span>${game.home}</span> <span class="vs">X</span> <span>${game.away}</span>
          </div>

          <div class="market-title">Resultado Final</div>
          <div class="odds-container">
            <button class="odd-btn ${isSel('main','home')}" onclick="toggleAposta(${game.id}, 'main', '${game.home}', ${game.mainOdds.home})">
              <span>1</span> <span class="odd-val">${game.mainOdds.home.toFixed(2)}</span>
            </button>
            <button class="odd-btn ${isSel('main','draw')}" onclick="toggleAposta(${game.id}, 'main', 'Empate', ${game.mainOdds.draw})">
              <span>X</span> <span class="odd-val">${game.mainOdds.draw.toFixed(2)}</span>
            </button>
            <button class="odd-btn ${isSel('main','away')}" onclick="toggleAposta(${game.id}, 'main', '${game.away}', ${game.mainOdds.away})">
              <span>2</span> <span class="odd-val">${game.mainOdds.away.toFixed(2)}</span>
            </button>
          </div>

          <div class="extra-markets">
            <div>
              <div class="market-title">Ambas Marcam</div>
              <div class="odds-row">
                <button class="odd-small ${isSel('btts','Sim')}" onclick="toggleAposta(${game.id}, 'btts', 'Sim', ${game.markets.btts.yes})">
                  Sim <b>${game.markets.btts.yes}</b>
                </button>
                <button class="odd-small ${isSel('btts','Não')}" onclick="toggleAposta(${game.id}, 'btts', 'Não', ${game.markets.btts.no})">
                  Não <b>${game.markets.btts.no}</b>
                </button>
              </div>
            </div>
            <div>
              <div class="market-title">Gols +/- 2.5</div>
              <div class="odds-row">
                <button class="odd-small ${isSel('ou','Over')}" onclick="toggleAposta(${game.id}, 'ou', 'Over', ${game.markets.overUnder.over})">
                  + <b>${game.markets.overUnder.over}</b>
                </button>
                <button class="odd-small ${isSel('ou','Under')}" onclick="toggleAposta(${game.id}, 'ou', 'Under', ${game.markets.overUnder.under})">
                  - <b>${game.markets.overUnder.under}</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      `
    })
    
    // Espaço para não ficar atrás do cupom
    html += `<div style="height:150px"></div>`
    app.innerHTML = html
    
    // Renderiza o Cupom se tiver itens
    renderCupom()
  }

  // --- TELA DASHBOARD ---
  if(state.tela === 'dashboard'){
    // Remove cupom antigo se existir
    const existingCupom = document.getElementById('cupom-drawer');
    if(existingCupom) existingCupom.remove();

    app.innerHTML = `
      <div class='card' style="text-align:center; border:1px solid var(--primary);">
        <p style="color:var(--text-muted); margin-bottom:10px;">Saldo Disponível</p>
        <h1 style="font-size:32px; color:#fff;">R$ <span id='saldo'>...</span></h1>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:20px;">
          <button style="background:var(--accent); color:#000; padding:12px; border-radius:8px; font-weight:bold;">Depositar</button>
          <button style="background:var(--surface); border:1px solid var(--border); color:#fff; padding:12px; border-radius:8px;">Sacar</button>
        </div>
      </div>
      <h3>Histórico</h3>
      <div class="card" style="opacity:0.5; text-align:center;">
        <p>Sem apostas recentes</p>
      </div>
    `
    animarSaldo(state.saldo)
  }
}

// Renderiza o HTML do Cupom Flutuante
function renderCupom() {
  const existing = document.getElementById('cupom-drawer')
  if(existing) existing.remove()

  if(state.cupom.length === 0) return

  // Cálculos
  let totalOdds = 1
  let totalStake = 0
  state.cupom.forEach(i => {
    totalOdds *= i.odd
    totalStake += i.valor
  })
  const retorno = totalStake * totalOdds

  const div = document.createElement('div')
  div.id = 'cupom-drawer'
  div.innerHTML = `
    <div class="cupom-header">
      <span>Boletim (${state.cupom.length})</span>
      <span onclick="state.cupom=[]; render()" style="cursor:pointer">Limpar 🗑️</span>
    </div>
    <div class="cupom-body">
      ${state.cupom.map(item => `
        <div class="cupom-item">
          <div style="font-weight:bold">${item.match}</div>
          <div class="cupom-row">
            <span style="color:var(--primary)">${item.selecao}</span>
            <span style="color:var(--accent); font-weight:bold">@${item.odd.toFixed(2)}</span>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="cupom-footer">
      <div style="flex:1; font-size:12px; color:var(--text-muted)">
        <div>Aposta Total: R$ ${totalStake.toFixed(2)}</div>
        <div style="color:var(--accent); font-weight:bold; font-size:14px">Retorno: R$ ${retorno.toFixed(2)}</div>
      </div>
      <button onclick="finalizarAposta()" class="btn-apostar">Apostar</button>
    </div>
  `
  document.body.appendChild(div)
}
