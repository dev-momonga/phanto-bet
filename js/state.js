const state = {
  tela: 'home',
  saldo: 1250.00,
  cupom: [], // Lista de apostas selecionadas
  liveGames: [
    {
      id: 1,
      home: "Flamengo",
      away: "Palmeiras",
      time: "AO VIVO • 42' 1T",
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
    },
    {
      id: 3,
      home: "Man. City",
      away: "Liverpool",
      time: "18:30",
      league: "Premier League",
      mainOdds: { home: 2.05, draw: 3.60, away: 3.00 },
      markets: {
        btts: { yes: 1.50, no: 2.50 },
        overUnder: { over: 1.65, under: 2.20 }
      }
    }
  ]
}
