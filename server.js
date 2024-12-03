const express = require('express');

const app = express();
const port = 3000;
// midleware para parsear JSON
app.use(express.json());

//Armazenamento em memória para as reservas
let reservas = [];

//Rota para agendar mesa (CRIAR RESERVA)

app.post('/agendar', (req, res) => {
    const { nome, data, horario} = req.body;

// Validação simples
if (!nome || !data || !horario ) {
    return res.status(400).json({ error: `Nome, data e horário são obrigatórios.`});
}
// Criação da reserva
const novaReserva = { id: reservas.length + 1, nome, data, horario };
reservas.push(novaReserva);
res.status(201).json(novaReserva);
});

// Rota para listar todas as rservas    

app.get('/reservas', (req, res) => {
    res.json(reservas);
});

// rota para obter reserva expecifíca 

app.get('/reservas/:id' , (req, res) => {
    const { id } = req.params;
    const reserva = reservas.find(r => r.id === parseInt(id));
    
    if (!reserva){
        return res.status(404).json({ error: 'Reserva não encontrada'});
    }
    res.json(reserva);
});

// rota para atualizar uma reserva
app.put('/reservas/:id' , (req, res) => {
    const { id } = req.params;
    const { nome, data, horario} = req.body;
    const reserva = reservas.find(r => r.id === parseInt(id));
    
    if (!reserva){
        return res.status(404).json({ error: 'Reserva não encontrada'});
    }
    res.json(reserva);

// Atualizar dados da reserva 

if (nome) reserva.nome = nome;
if (data) reserva.data = data;
if (horario) reserva.horario = horario;

res.json(reserva);
});

// rota para deletar uma reserva

app.delete('/reservas/:id' , (req, res) => {
    const { id } = req.params;
    const index = reservas.findIndex(r => r.id === parseInt(id));

    if (index === -1);
    res.status(204).send(); // 204 mp content 
});

// inicializar o servidor 

app.listen(port, () => {
    console.log(`API rodando em http:localhost:${port}`);
});
