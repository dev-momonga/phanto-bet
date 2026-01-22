function render(){
  const app = document.getElementById('app')
  if(state.tela==='home'){
    app.innerHTML = `<h1>Bem-vindo à Phanto Bet</h1>`
  }
  if(state.tela==='dashboard'){
    app.innerHTML = `<div class='card'><h2>Saldo</h2><h1>R$ <span id='saldo'>0</span></h1></div>`
    animarSaldo(state.saldo)
  }
  if(state.tela==='bets'){
    app.innerHTML = `<div class='card'><p>⚽ Flamengo x Palmeiras</p></div>`
  }
}