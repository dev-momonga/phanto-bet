function animarSaldo(valor){
  let atual=0
  const el=document.getElementById('saldo')
  const i=setInterval(()=>{
    atual+=Math.ceil(valor/40)
    if(atual>=valor){atual=valor;clearInterval(i)}
    el.innerText=atual.toLocaleString('pt-BR')
  },20)
}
render()