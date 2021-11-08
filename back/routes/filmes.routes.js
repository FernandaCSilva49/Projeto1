const express = require('express');
// inicializar as rotas do express
const router = express.Router();

const filmes = [
    {
        id: Date.now(),
        nome: 'Interestelar',
        imagem: 'https://th.bing.com/th/id/OIP.qkZuWKUJK6XeRzYe31RZvADQEs?pid=ImgDet&rs=1',
        genero: 'Ação',
        nota: '9',
    },
    {
        id: Date.now(),
        nome: 'Castelo Animado',
        imagem: 'https://cps-static.rovicorp.com/2/Open/Brainstorm_Media_1300/Program/6180693/_derived_jpg_q90_600x800_m0/6180693_Howls_Moving_Castle_2000x3000.jpg',
        genero: 'Animação',
        nota: '10',
    },
    {
        id: Date.now(),
        nome: 'Matrix',
        imagem: 'https://cps-static.rovicorp.com/2/Open/Warner%20Brothers%20Distribution/Movies/The%20Matrix/_2by3/_derived_jpg_q90_584x800_m0/098710-036C_CR.jpg',
        genero: 'Ação',
        nota: '8',
    },
    {
        id: Date.now(),
        nome: 'Mary Shelley',
        imagem: 'https://www.hostfilmes.com/wp-content/uploads/2018/12/Mary-Shelley-Dublado.jpg',
        genero: 'Biografia',
        nota: '6',
    },
]

// [GET] /filmes - Retornar uma lista de filmes
router.get('/', (req, res) => {
    res.send(filmes);
});

// [GET] /filmes/{id} - Retornar um filme específico por id.
router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const filme = filmes.find(filme => filme.id == idParam); // filme = no objeto 'filmes' vai procurar o filme que tem o id igual ao id param (id que aparece no link)
    
    if(!filme) {
        res.status(404).send({error: 'Filme nao encontrada'});
        return;
    }
    
    res.send(filmes);
})

// [POST] /filmes/add - Cadastro de um novo filme
router.post('/add', (req, res) => {
    // requerindo o objeto que o cliente inseriu (no body)
    const filme = req.body;
    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({    // o 'status(201)' diz que aquela ação deu certo
        message: `${filme.nome} foi cadastrado com sucesso.`,
        data: filme
    });
})

// [PUT] /filmes/edit/{id} - Edita um filme de acordo com o seu id e objeto recebido
router.put('/edit/:id', (req, res) => {
    // o objeto que veio do front para atualizar o filme com o id recebido
    const filmeEdit = req.body;
    // o id recebido via parametro
    const idParam = req.params.id;
    // procura o indice do filme pre cadastrada na lista de acordo com o id recebido para atualiza-la
    let index = filmes.findIndex(filme => filme.id == idParam);

    // spread operator ...
    // faz um espelho do item na lista e um espelho do objeto atualizado e junta os 2
    filmes[index] = {
        ...filmes[index],
        ...filmeEdit       // faz um espelho dos dois para poder manter o id do primeiro
    }

    res.send({
        message: `Filme ${filmes[index].titulo} editado com sucesso`,
        data: filmes[index]
    });
})

// [DELETE] /filme/delete/{id} = exclui um item da lista de acordo com o seu id

router.delete('/deletar/:id', (req, res) => {
    // acessamos o id recebido via parametro
    const idParam = req.params.id;

    const index = filmes.findIndex(filme => filme.id == idParam);
    const filmeExcluido = filmes[index];
    filmes.splice(index, 1);
    res.send({
        message: `${filmeExcluido.nome} foi excluido com sucesso !`,
    })
})





module.exports = router;