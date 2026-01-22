// Adiciona/Remove aposta do cupom
function toggleAposta(gameId, tipo, selecao, odd) {
  const game = state.liveGames.find(g => g.id === gameId)
  // ID único para saber se essa odd específica já foi clicada
  const idUnico = `${gameId}-${tipo}-${selecao}`
  
  // Verifica se já está no cupom
  const index = state.cupom.findIndex(item => item.idUnico === idUnico)
  
  if (index >= 0) {
    state.cupom.splice(index, 1) // Se já existe, remove (deselect)
  } else {
    // Remove outras seleções do MESMO jogo (ex: não pode apostar em Casa e Empate no mesmo bilhete simples)
    state.cupom = state.cupom.filter(item => item.gameId !== gameId)
    
    // Adiciona ao cupom
    state.cupom.push({
      idUnico,
      gameId,
      match: `${game.home} x ${game.away}`,
      selecao: selecao,
      odd: odd,
      valor: 10 // Valor padrão
    })
  }
  render() // Atualiza a tela imediatamente
}

// Finaliza a compra
function finalizarAposta() {
  if(state.cupom.length === 0) return

  let totalAposta = 0
  let totalRetorno = 0
  
  state.cupom.forEach(item => {
    totalAposta += item.valor
    totalRetorno += (item.valor * item.odd)
  })

  if (state.saldo >= totalAposta) {
    state.saldo -= totalAposta
    alert(`✅ Aposta Confirmada!\nPotencial Retorno: R$ ${totalRetorno.toFixed(2)}`)
    state.cupom = [] // Limpa cupom
    render()
  } else {
    alert("❌ Saldo Insuficiente. Deposite mais.")
  }
}

// Animação do Saldo (Mantida e melhorada)
function animarSaldo(valor){
  const el = document.getElementById('saldo')
  if(!el) return
  
  let atual = 0
  const step = valor / 20
  const i = setInterval(()=>{
    atual += step
    if(atual >= valor){
      atual = valor
      clearInterval(i)
    }
    el.innerText = atual.toLocaleString('pt-BR', {minimumFractionDigits: 2})
  }, 20)
}

// Inicializa
render()
