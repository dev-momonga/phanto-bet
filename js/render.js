function render() {
  const app = document.getElementById('app');
  
  if (state.tela === 'home') {
    app.innerHTML = `
      <section class="hero-card">
        <h1>Aposte com confiança <br> nível profissional</h1>
        <p>Odds competitivas e pagamentos rápidos feitos para você.</p>
        <div style="position:absolute; right:20px; bottom:20px; font-size:60px; opacity:0.3">👻</div>
      </section>

      <div class="category-bar">
        <div class="cat-item active">⚽ Futebol</div>
        <div class="cat-item">🏀 Basquete</div>
        <div class="cat-item">🎮 eSports</div>
      </div>

      <h3>🔥 Jogos em Destaque</h3><br>
      <div id="games">
        ${state.liveGames.map(game => {
          const isSel = (tipo, sel) => state.cupom.find(i => i.idUnico === `${game.id}-${tipo}-${sel}`) ? 'selected' : '';
          return `
            <div class="card game-card">
              <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--accent)">
                <span>${game.league}</span> <span>● ${game.time}</span>
              </div>
              <div class="match-main">
                <div class="team">${game.home}</div>
                <div class="vs">VS</div>
                <div class="team">${game.away}</div>
              </div>
              <div class="odds-row">
                <button class="btn-odd ${isSel('m','1')}" onclick="toggleAposta(${game.id},'m','1',${game.mainOdds.home})">1 <b>${game.mainOdds.home.toFixed(2)}</b></button>
                <button class="btn-odd ${isSel('m','X')}" onclick="toggleAposta(${game.id},'m','X',${game.mainOdds.draw})">X <b>${game.mainOdds.draw.toFixed(2)}</b></button>
                <button class="btn-odd ${isSel('m','2')}" onclick="toggleAposta(${game.id},'m','2',${game.mainOdds.away})">2 <b>${game.mainOdds.away.toFixed(2)}</b></button>
              </div>
            </div>`;
        }).join('')}
      </div>
      <div style="height:100px"></div>
    `;
    renderCupom();
  }

  if (state.tela === 'dashboard') {
    app.innerHTML = `<div class='card' style="text-align:center">
      <p style="color:var(--text-muted)">Saldo Total</p>
      <h1 style="font-size:40px">R$ <span id='saldo'>0</span></h1>
    </div>`;
    animarSaldo(state.saldo);
  }
}

function renderCupom() {
  const old = document.getElementById('cupom-drawer');
  if(old) old.remove();
  if(state.cupom.length === 0) return;

  const totalOdd = state.cupom.reduce((acc, curr) => acc * curr.odd, 1);
  const div = document.createElement('div');
  div.id = 'cupom-drawer';
  div.innerHTML = `
    <div class="cupom-header"><span>Seu Bilhete (${state.cupom.length})</span><span onclick="state.cupom=[];render()">X</span></div>
    <div class="cupom-body">
      ${state.cupom.map(i => `<div style="font-size:12px; margin-bottom:5px"><b>${i.match}</b><br>${i.selecao} @${i.odd}</div>`).join('')}
      <hr style="opacity:0.1; margin:10px 0">
      <div style="display:flex; justify-content:space-between; margin-bottom:10px"><span>Total Odd:</span><b>${totalOdd.toFixed(2)}</b></div>
      <button class="btn-apostar" onclick="finalizarAposta()">CONFIRMAR APOSTA</button>
    </div>`;
  document.body.appendChild(div);
}
