var express = require('express');
var app = express();
app.listen(3000);
console.log('Log listening on port 3000...')
app.use(express.json())

var lastID = 8;
var juegos = [
  { id: 1, name: "Dota 2", platform: ["PC"], rate: ["7"] },
  { id: 2, name: "Mario Odyssey", platform: ["NS"], rate: ["9.5"] },
  { id: 3, name: "Zelda Breath of the Wild", platform: ["NS"], rate: ["9"] },
  { id: 4, name: "Sea of Thieves", platform: ["XBOX"], rate: ["5"] },
  { id: 5, name: "State of Decay 2", platform: ["XBOX"], rate: ["4"] },
  { id: 6, name: "Overwatch", platform: ["PC"], rate: ["7.5"] },
  { id: 7, name: "Persona 5", platform: ["PS4"], rate: ["8.5"] },
  { id: 8, name: "Digimon Cyber Sleuth", platform: ["PS4"], rate: ["8"] }
]

app.get('/api/juegos', (req, res) => {
  res.status(200).send(juegos)
});

app.get('/api/juegos/:id', (req, res) => {
  const juego = juegos.find(x => x.id === parseInt(req.params.id));
  if (!juego) {
    res.status(404).send('Game Not Found')
    return;
  }
  res.status(200).send(juego)
});

app.post('/api/juegos', (req, res) => {
  if (!req.body.name) {
    res.status(400).send('Name Required')
    return;
  }
  if (!req.body.platform) {
    res.status(400).send('Platform Required')
    return;
  }
  if (!req.body.rate) {
    res.status(400).send('Rate Required')
    return;
  }

  lastID += 1;
  const juego = {
    id: lastID,
    name: req.body.name,
    platform: req.body.platform,
    rate: req.body.rate
  };
  juegos.push(juego);
  res.status(201).send(juegos);
});

app.put('api/juegos/:id', (req, res) => {
  const juego = juegos.find(x => x.id === parseInt(req.params.id));
  if (!juego) {
    res.status(404).send('Game Not Found')
    return;
  }
  if (!req.body.name) {
    res.status(400).send('Name Required')
    return;
  }
  if (!req.body.platform) {
    res.status(400).send('Platform Required')
    return;
  }
  if (!req.body.rate) {
    res.status(400).send('Rate Required')
    return;
  }
  juego.name = req.body.name;
  juego.platform = req.body.platform;
  juego.rate = req.body.rate;
  res.status(204).send(juego);
});

app.delete('api/juegos/:id', (req, res) => {
  const juego = juegos.find(x => x.id === parseInt(req.params.id));
  if (!juego) {
    res.status(404).send('Game Not Found')
    return;
  }

  const indice = juegos.indexOf(juego);
  juegos.splice(indice,1);

  res.status(204).send(juegos)
});


