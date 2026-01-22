const state = {
  tela: 'home',
  saldo: 1250.00,
  cupom: [], 
  liveGames: [
    {
      id: 1,
      home: "Flamengo",
      away: "Palmeiras",
      time: "AO VIVO • 42'",
      league: "Brasileirão Série A",
      mainOdds: { home: 2.10, draw: 3.05, away: 2.80 },
      markets: {
        btts: { yes: 1.75, no: 2.05 },
        overUnder: { over: 1.90, under: 1.85 }
      }
    },
    {
      id: 2,
      home: "Real Madrid",
      away: "Barcelona",
      time: "16:00",
      league: "La Liga",
      mainOdds: { home: 1.95, draw: 3.50, away: 3.10 },
      markets: {
        btts: { yes: 1.60, no: 2.20 },
        overUnder: { over: 1.55, under: 2.40 }
      }
    }
  ]
}
