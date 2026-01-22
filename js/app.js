function toggleAposta(gameId, tipo, selecao, odd) {
  const game = state.liveGames.find(g => g.id === gameId);
  const idUnico = `${gameId}-${tipo}-${selecao}`;
  const index = state.cupom.findIndex(i => i.idUnico === idUnico);

  if (index >= 0) {
    state.cupom.splice(index, 1);
  } else {
    state.cupom = state.cupom.filter(i => i.gameId !== gameId); // Apenas uma seleção por jogo
    state.cupom.push({ idUnico, gameId, match: `${game.home} x ${game.away}`, selecao, odd });
  }
  render();
}

function finalizarAposta() {
  if (state.saldo >= 10) {
    state.saldo -= 10;
    state.cupom = [];
    alert("Aposta realizada com sucesso! 🍀");
    render();
  } else {
    alert("Saldo insuficiente!");
  }
}

function animarSaldo(valor){
  let atual=0;
  const el=document.getElementById('saldo');
  if(!el) return;
  const i=setInterval(()=>{
    atual+=Math.ceil(valor/30);
    if(atual>=valor){atual=valor;clearInterval(i)}
    el.innerText=atual.toLocaleString('pt-BR', {minimumFractionDigits:2});
  },20);
}

render();
