const express = require('express');
// inicializar as rotas do express
const router = express.Router();

const filmes = [
    {
        id: Date.now(),
        nome: 'Interestelar',
        imagem: 'url',
        genero: 'Ação',
        nota: '10',
        assistido: 'true'
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
        res.status(404).send({error: 'Vaga nao encontrada'});
        return;
    }
    
    res.send(filme);
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
        message: `${filmes[index].titulo} atualizado com sucesso.`,
        data: filmes[index]
    })
})

// [DELETE] /filme/delete/{id} = exclui um item da lista de acordo com o seu id

router.delete('/delete/:id', (req, res) => {
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