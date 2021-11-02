// buscar o elemento no html da minha lista onde irei inserir as vagas
const lista = document.getElementById("lista");

// atribuindo a endpoint da api do backend em um constante
const apiUrl = "http://localhost:3000/filmes";

const edicao = false;
const idEdicao = id;


// faz uma resquisicao do tipo [GET] para o back que recebe todas as vagas cadastradas
const getFilmes = async () => {
  // FETCH API api do javascript responsavel por fazer comunicacao entre requicoes http. (chamando a url)
  const response = await fetch(apiUrl); // -> espera o fetch(); ser realizado e depois da realização guarda o resultado nesta const
  // é a lista de objetos vagas (array de objetos)
  const filmes = await response.json(); /// -> espera o response receber u resultado, e guarda esse resultado como .jsom
  console.log(filmes);
  filmes.map((filme) => {
    lista.insertAdjacentHTML(
      "beforeend",
      `  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col">
    <div class="card h-100">
      <h5 class="card-title">${filme.nome}</h5>
      <img src="${filme.imagem}" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">Gênero: ${filme.genero}</p>
        <p class="card-text">Nota: ${filme.nota}</p>
        </div>
        <button type="button" class="btn btn-primary" onclick="putFilmes("${filme.id}")">Editar</button>
        <button type="button" class="btn btn-outline-success" onclick="deleteFilmes("${filme.id}")">Excluir</button>
    </div>
  </div>
        `
    );
  });

  // [POST] envia uma vaga para o backend para ser cadastrada

  const submitForm = async (event) => {
    // previnir que o navegador atualiza a pagina por causa o evento de submit (que geralmente quando você envia as info pelo botão a pag atualiza)
    event.preventDefault();

    // Estamos construindo um objeto com os valores que estamos pegando no input.
    const filme = {
      nome: nome.value,
      imagem: imagem.value,
      genero: genero.value,
      nota: parseFloat(nota.value),
    };
    // é o objeto preenchido com os valores digitados no input

    if (edicao) {
      putVaga(filme, idEdicao);
    } else {
      createVaga(filme);
    }

    clearFields();
    lista.innerHTML = "";
  };

  const createFilmes = async (filme) => {
    // estou construindo a requisicao para ser enviada para o backend.
    const request = new Request(`${apiUrl}/add`, {
      method: "POST", // método que a informação será levada
      body: JSON.stringify(filme), // transformando a informação em .json
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    // chamamos a funcao fetch de acordo com as nossa configuracaoes de requisicao.
    const response = await fetch(request);

    const result = await response.json();
    // pego o objeto que vem do backend e exibo a msg de sucesso em um alerta.
    alert(result.message);
    // vaga cadastrada com sucesso.

    lista.innerHTML = ""; // limpando as informações do html para ela não ser duplicada quando houver um cadastro novo

    getFilmes();
  };
 
  const putFilmes = async(filme, id) => {
    // estou construindo a requisicao para ser enviada para o backend.
    const request = new Request(`${apiUrl}/edit/${id}`, {
        method:  'PUT',
        body: JSON.stringify(vaga),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    // chamamos a funcao fetch de acordo com as nossa configuracaoes de requisicao.
    const response = await fetch(request);

    const result = await response.json();
    // pego o objeto que vem do backend e exibo a msg de sucesso em um alerta.
    alert(result.message)
    edicao = false;
    idEdicao = 0;
    getVagas();
}


// [DELETE] funcao que exclui um vaga de acordo com o seu id
const deleteFilmes = async (id) => {
    // construir a requiscao de delete
    const request = new Request(`${apiUrl}/delete/${id}`, {
        method: 'DELETE'
    })

    const response = await fetch(request);
    const result = await response.json();

    alert(result.message);
    
    lista.innerHTML = '';
    getVagas();
}


// [GET] /Vaga/{id} - funcao onde recebe um id via paramtero envia uma requisicao para o backend
// e retorna o filme de acordo com esse id.
const getFilmeById = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
}


// ao clicar no botao editar
// ela vai preencher os campos dos inputs
// para montar o objeto para ser editado
const editVaga = async (id) => {
    // habilitando o modo de edicao e enviando o id para variavel global de edicao.
    edicao = true;
    idEdicao = id;

    //precismo buscar a informacao da vaga por id para popular os campos
    // salva os dados da vaga que vamos editar na variavel vaga.
    const vaga = await getVagaById(id);

    //preencher os campos de acordo com a vaga que vamos editar.
    titulo.value = vaga.titulo;
    empresa.value =  vaga.empresa;
    logo.value = vaga.logo;
    salario.value = vaga.salario;
    senioridade.value = vaga.senioridade;
    descricao.value = vaga.descricao;
}


const clearFields = () => {
    nome.value = '';
    imagem.value = '';
    genero.value = '';
    nota.value = '';
}


};

getFilmes();
