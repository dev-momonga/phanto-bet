function render(){
  const app = document.getElementById('app')

  /* HOME */
  if(state.tela === 'home'){
    app.innerHTML = `
      <section class="hero">
        <div>
          <h1>Aposte com <span>confiança</span><br>nível profissional</h1>
          <p>Odds competitivas, pagamentos rápidos e uma plataforma moderna feita para quem leva apostas a sério.</p>
          <button class="btn" onclick="go('dashboard')">
            Entrar na plataforma
          </button>
        </div>

        <div class="hero-img">
          <img src="assets/mascote-phanto.png" style="width:100%;max-width:340px">
        </div>
      </section>
    `
  }

  /* DASHBOARD */
  if(state.tela === 'dashboard'){
    app.innerHTML = `
      <div class="card">
        <h2>Saldo disponível</h2>
        <h1>R$ <span id="saldo">0</span></h1>
      </div>

      <div class="grid">
        <div class="card"><h3>🎯 Apostas abertas</h3><p>3</p></div>
        <div class="card"><h3>🎁 Bônus</h3><p>R$ 150</p></div>
        <div class="card"><h3>🛡️ Status</h3><p>Conta ativa</p></div>
      </div>
    `
    animarSaldo(state.saldo)
  }

  /* APOSTAS */
  if(state.tela === 'bets'){
    app.innerHTML = `
      <div class="card">
        <h2>Apostas em destaque</h2>

        <div class="bet">
          <span>⚽ Flamengo x Palmeiras</span>
          <button>Apostar</button>
        </div>

        <div class="bet">
          <span>⚽ Corinthians x Santos</span>
          <button>Apostar</button>
        </div>

        <div class="bet">
          <span>🏀 Lakers x Bulls</span>
          <button>Apostar</button>
        </div>
      </div>
    `
  }
}
