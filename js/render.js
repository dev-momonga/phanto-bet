function render() {
  const app = document.getElementById('app');
  
  if (state.tela === 'home') {
    app.innerHTML = `
      <div class="hero-banner">
        <h2>BÔNUS DE <br>ATÉ R$ 500</h2>
        <p>No seu primeiro depósito na Phanto Bet.</p>
        <div class="btn-promo">Resgatar Agora</div>
        <div style="position:absolute; right:-20px; bottom:-10px; font-size:100px; opacity:0.2;">👻</div>
      </div>

      <div class="categories">
        <div class="cat-item active">⚽ Futebol</div>
        <div class="cat-item">🏀 Basquete</div>
        <div class="cat-item">🎮 eSports</div>
        <div class="cat-item">🥊 UFC</div>
        <div class="cat-item">🎾 Tênis</div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
        <h3 style="font-size:18px;">🔥 Principais Jogos</h3>
        <span style="color:var(--primary); font-size:12px; font-weight:bold;">Ver todos</span>
      </div>

      <div id="games-list">
        ${state.liveGames.map(game => {
          const isSel = (tipo, sel) => state.cupom.find(i => i.idUnico === `${game.id}-${tipo}-${sel}`) ? 'selected' : '';
          
          return `
            <div class="card match-card">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:11px; color:var(--text-muted);">${game.league}</span>
                <span class="live-badge">AO VIVO</span>
              </div>
              
              <div class="teams">
                <div style="display:flex; align-items:center; gap:10px;">
                  <div style="width:24px; height:24px; background:#333; border-radius:50%;"></div> 
                  ${game.home}
                </div>
                <span class="vs">vs</span>
                <div style="display:flex; align-items:center; gap:10px; flex-direction:row-reverse;">
                  <div style="width:24px; height:24px; background:#333; border-radius:50%;"></div>
                  ${game.away}
                </div>
              </div>

              <div class="odds-container">
                <button class="odd-btn ${isSel('main','home')}" onclick="toggleAposta(${game.id}, 'main', '${game.home}', ${game.mainOdds.home})">
                  <span style="font-size:10px">CASA</span> 
                  <span class="odd-val">${game.mainOdds.home.toFixed(2)}</span>
                </button>
                <button class="odd-btn ${isSel('main','draw')}" onclick="toggleAposta(${game.id}, 'main', 'Empate', ${game.mainOdds.draw})">
                  <span style="font-size:10px">EMPATE</span> 
                  <span class="odd-val">${game.mainOdds.draw.toFixed(2)}</span>
                </button>
                <button class="odd-btn ${isSel('main','away')}" onclick="toggleAposta(${game.id}, 'main', '${game.away}', ${game.mainOdds.away})">
                  <span style="font-size:10px">FORA</span> 
                  <span class="odd-val">${game.mainOdds.away.toFixed(2)}</span>
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div style="height:100px;"></div> `;
    
    // Chama o cupom para garantir que ele apareça se houver apostas
    renderCupom();
  }
  
  // Lógica das outras telas (Dashboard, etc) continua igual...
}
