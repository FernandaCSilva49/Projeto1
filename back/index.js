const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const filmesRouter = require('./router/filmes.routes');

// quando a rota /filmes iniciar, vai ser com as configurações do arquivo 'filmesRouter'
app.use("/filmes", filmesRouter);



const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
})
