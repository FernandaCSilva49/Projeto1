// buscar o elemento no html da minha lista onde irei inserir as vagas
const lista = document.getElementById("lista");

// atribuindo a endpoint da api do backend em um constante
const apiUrl = "http://localhost:3000/filmes";

var edicao = false;
let idEdicao = 0;

// pegar os dados que o usuario digita no input (Elementos)
let nome = document.getElementById('nome');
let imagem = document.getElementById('imagem');
let genero = document.getElementById('genero');
let nota = document.getElementById('nota');


// faz uma resquisicao do tipo [GET] para o back que recebe todas as vagas cadastradas
const getFilmes = async () => {
  // FETCH API api do javascript responsavel por fazer comunicacao entre requicoes http. (chamando a url)
  const response = await fetch(apiUrl); // -> espera o fetch(); ser realizado e depois da realização guarda o resultado nesta const
  // é a lista de objetos vagas (array de objetos)
  const filmes = await response.json(); /// -> espera o response receber u resultado, e guarda esse resultado como .jsom
  console.log(filmes);
  filmes.map((filme) => {
    lista.insertAdjacentHTML('beforeend',
      ` <div class='d-flex align-items-center'>
    <div class='col pb-5 mt-5'> 
    <div class='card d-flex align-items-center border border-light mt-5' style='width: 13rem'> 
      <h3 class='card-title p-3 text-light'>${filme.nome}</h2>
        <img src='${filme.imagem}' class='card-img-top ps-4 pe-4' alt='...'>
        <div class='card-body d-flex flex-row'>
          <div class='d-flex flex-column text-center pe-2 border border-light border-start-0 border-bottom-0 border-top-0'>
          <h5 class='card-text text-light'> Gênero </h5>
          <p class='card-text text-light'> ${filme.genero}</p>
          </div>
          <div class='d-flex flex-column text-center ps-2 border border-light border-end-0 border-bottom-0 border-top-0'>
          <h5 class='card-text text-light'>Nota </h5>
          <p class='card-text text-light'> ${filme.nota}</p>
          </div>
        </div>
        <button type='button' class='btn btn-light pe-5 ps-5' onclick="editFilmes('${filme.id}')">Editar</button>
        <button type='button' class='btn btn-outline-danger pe-5 ps-5 mb-3' onclick="deleteFilmes('${filme.id}')">Excluir</button>
    </div>
  </div>
</div> ` );
});
}

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
      putFilmes(filme, idEdicao);
    } else {
      createFilmes(filme);
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
        'Content-Type': "application/json",
      }),
    });

    // chamamos a funcao fetch de acordo com as nossa configuracaoes de requisicao.
    const response = await fetch(request);

    const result = await response.json();
    // pego o objeto que vem do backend e exibo a msg de sucesso em um alerta.
    alert(result.message);
    // vaga cadastrada com sucesso.

     // limpando as informações do html para ela não ser duplicada quando houver um cadastro novo

    getFilmes();
  };
 
  const putFilmes = async (filme, id) => {
    // estou construindo a requisicao para ser enviada para o backend.
    const request = new Request(`${apiUrl}/edit/${id}`, {
        method:  'PUT',
        body: JSON.stringify(filme),
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
    getFilmes();
}


// [DELETE] funcao que exclui um vaga de acordo com o seu id
const deleteFilmes = async (id) => {
    // construir a requiscao de delete
    const request = new Request(`${apiUrl}/deletar/${id}`, {
        method: 'DELETE'
    })

    const response = await fetch(request);
    const result = await response.json();

    alert(result.message);
    
    lista.innerHTML = '';
    getFilmes();
}


// [GET] /Vaga/{id} - funcao onde recebe um id via paramtero envia uma requisicao para o backend
// e retorna o filme de acordo com esse id.
const getFilmesById = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
}


// ao clicar no botao editar
// ela vai preencher os campos dos inputs
// para montar o objeto para ser editado
const editFilmes = async (id) => {
    // habilitando o modo de edicao e enviando o id para variavel global de edicao.
    edicao = true;
    idEdicao = id;

    //precismo buscar a informacao da vaga por id para popular os campos
    // salva os dados da vaga que vamos editar na variavel vaga.
    const filme = await getFilmesById(id);

    //preencher os campos de acordo com o filme que vamos editar.
    nome.value = filme.nome;
    imagem.value =  filme.imagem;
    genero.value = filme.genero;
    nota.value = filme.nota;;
}


const clearFields = () => {
    nome.value = '';
    imagem.value = '';
    genero.value = '';
    nota.value = '';
}

getFilmes();
