function render() {
  const app = document.getElementById('app');
  
  if (state.tela === 'home') {
    app.innerHTML = `
      <section class="hero-card">
        <h1 style="font-size: 24px;">BRASILEIRÃO: RODADA 32</h1>
        <p style="font-size: 13px;">As melhores cotações para os jogos de hoje.</p>
      </section>

      <div class="market-header">
        <span>Evento</span>
        <div class="odds-labels"><span>1</span><span>X</span><span>2</span></div>
      </div>

      <div class="games-table">
        ${state.liveGames.map(game => {
          const isSel = (s) => state.cupom.find(i => i.idUnico === `${game.id}-m-${s}`) ? 'selected' : '';
          return `
            <div class="game-row">
              <div class="game-meta">
                <span class="game-time">● ${game.time}</span>
                <div class="game-teams">${game.home} vs ${game.away}</div>
                <span style="font-size:10px; color:var(--text-muted)">${game.league}</span>
              </div>
              <div class="odds-labels">
                <button class="btn-odd ${isSel('1')}" onclick="toggleAposta(${game.id},'m','1',${game.mainOdds.home})">${game.mainOdds.home.toFixed(2)}</button>
                <button class="btn-odd ${isSel('X')}" onclick="toggleAposta(${game.id},'m','X',${game.mainOdds.draw})">${game.mainOdds.draw.toFixed(2)}</button>
                <button class="btn-odd ${isSel('2')}" onclick="toggleAposta(${game.id},'m','2',${game.mainOdds.away})">${game.mainOdds.away.toFixed(2)}</button>
              </div>
            </div>`;
        }).join('')}
      </div>
      <div style="height:100px"></div>
    `;
    renderCupom();
  }

  if (state.tela === 'dashboard') {
    app.innerHTML = `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
        <div class='card'>
          <p style="color:var(--text-muted)">Saldo da Conta</p>
          <h2>R$ <span id='saldo'>0,00</span></h2>
        </div>
        <div class='card'>
          <p style="color:var(--text-muted)">Apostas em Aberto</p>
          <h2>${state.cupom.length}</h2>
        </div>
      </div>
    `;
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
    <div style="background:var(--primary); padding:12px; font-weight:bold; display:flex; justify-content:space-between">
      <span>BILHETE</span>
      <span onclick="state.cupom=[];render()" style="cursor:pointer">✕</span>
    </div>
    <div style="padding:15px">
      ${state.cupom.map(i => `
        <div style="font-size:12px; margin-bottom:10px; border-bottom:1px solid var(--border); padding-bottom:5px">
          <div style="color:var(--text-muted)">${i.match}</div>
          <div style="display:flex; justify-content:space-between; font-weight:bold">
            <span>Vencedor: ${i.selecao}</span>
            <span style="color:var(--accent)">@${i.odd.toFixed(2)}</span>
          </div>
        </div>
      `).join('')}
      <div style="margin:15px 0; display:flex; justify-content:space-between; font-weight:900">
        <span>ODD TOTAL:</span>
        <span style="color:var(--accent)">${totalOdd.toFixed(2)}</span>
      </div>
      <button onclick="finalizarAposta()" style="width:100%; background:var(--accent); color:#000; border:none; padding:12px; font-weight:900; border-radius:6px; cursor:pointer">CONFIRMAR APOSTA</button>
    </div>`;
  document.body.appendChild(div);
}
