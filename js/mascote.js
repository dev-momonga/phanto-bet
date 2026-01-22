const frases = [
  "Boa sorte 🍀",
  "Odds boas hoje 👀",
  "Vai com calma 😉",
  "Saldo atualizado 💰"
]
document.getElementById('mascote').onclick = () => {
  fala.innerText = frases[Math.floor(Math.random()*frases.length)]
}