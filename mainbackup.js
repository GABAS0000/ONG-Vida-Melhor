document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // NAVEGAÇÃO SPA
    // ==============================

    const links = document.querySelectorAll(
        'a[href="index.html"], a[href="projetos.html"], a[href="cadastro.html"]'
    );

    links.forEach(function (link) {

        link.addEventListener("click", function (evento) {

            // Impede o navegador de abrir outra página normalmente
            evento.preventDefault();

            // Descobre qual página foi clicada
            const pagina = link.getAttribute("href");

            console.log("Página selecionada:", pagina);

            // Busca o conteúdo da página
            fetch(pagina)
                .then(function (resposta) {

                    if (!resposta.ok) {
                        throw new Error("Não foi possível carregar a página.");
                    }

                    return resposta.text();
                })

                .then(function (html) {

                    // Transforma o HTML recebido em um documento
                    const parser = new DOMParser();

                    const documentoNovo = parser.parseFromString(
                        html,
                        "text/html"
                    );

                    // Procura o main da página carregada
                    const novoMain = documentoNovo.querySelector("main");

                    // Procura o main atual
                    const mainAtual = document.querySelector(
                        "#conteudo-principal"
                    );

                    if (!novoMain || !mainAtual) {
                        throw new Error(
                            "Não foi possível encontrar o conteúdo principal."
                        );
                    }

                    // Troca o conteúdo da página
                    mainAtual.innerHTML = novoMain.innerHTML;

                    // Troca a classe para manter o layout correto
                    mainAtual.className = novoMain.className;

                    // Mantém o ID usado pela SPA
                    mainAtual.id = "conteudo-principal";

                    // Carrega os projetos caso esteja na página de projetos
                    carregarProjetos();

                    // Ativa o formulário caso esteja na página de cadastro
                    ativarFormulario();

                    console.log("Página carregada com sucesso!");
                })

                .catch(function (erro) {
                    console.error("Erro ao carregar a página:", erro);
                });

        });

    });


    // ==============================
    // PROJETOS DINÂMICOS
    // ==============================

    function carregarProjetos() {

        const listaProjetos = document.querySelector("#lista-projetos");

        // Se não estiver na página de projetos, encerra a função
        if (!listaProjetos) {
            return;
        }

        const projetos = [
            {
                categoria: "Doações",
                titulo: "Arrecadação de alimentos",
                descricao: "Projeto destinado à arrecadação de alimentos para famílias da comunidade."
            },
            {
                categoria: "Educação",
                titulo: "Apoio à educação",
                descricao: "Projeto destinado ao apoio educacional de crianças e jovens da comunidade."
            },
            {
                categoria: "Voluntariado",
                titulo: "Trabalho voluntário",
                descricao: "Projeto que reúne voluntários para auxiliar nas atividades sociais da ONG."
            }
        ];

        // Limpa a lista antes de criar os projetos
        listaProjetos.innerHTML = "";

        // Cria os projetos dinamicamente
        projetos.forEach(function (projeto) {

            listaProjetos.innerHTML += `
                <article>
                    <span class="badge">${projeto.categoria}</span>

                    <h3>${projeto.titulo}</h3>

                    <p>${projeto.descricao}</p>
                </article>
            `;

        });

    }


    // ==============================
    // EVENTO DO FORMULÁRIO
    // ==============================

    function ativarFormulario() {

        const formulario = document.querySelector("form");

        // Se não existir formulário na página, encerra a função
        if (!formulario) {
            return;
        }

        // Evita adicionar o mesmo evento mais de uma vez
        if (formulario.dataset.eventoAtivado === "true") {
            return;
        }

        formulario.dataset.eventoAtivado = "true";
// Recupera os dados salvos no localStorage
const dadosSalvos = localStorage.getItem("cadastroVoluntario");

if (dadosSalvos) {

    // Converte os dados de texto para objeto JavaScript
    const dados = JSON.parse(dadosSalvos);

    // Coloca os dados novamente nos campos
    document.querySelector("#nome").value = dados.nome;
    document.querySelector("#email").value = dados.email;
    document.querySelector("#telefone").value = dados.telefone;

    console.log("Dados recuperados do localStorage:", dados);
}
    formulario.addEventListener("submit", function (evento) {

    // Impede o formulário de recarregar a página
    evento.preventDefault();

    // Pega os dados preenchidos no formulário
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const telefone = document.querySelector("#telefone").value;

    // Cria um objeto com os dados
    const dadosCadastro = {
        nome: nome,
        email: email,
        telefone: telefone
    };

    // Salva os dados no localStorage
    localStorage.setItem(
        "cadastroVoluntario",
        JSON.stringify(dadosCadastro)
    );

    console.log("Dados salvos:", dadosCadastro);

    Swal.fire({
    title: "Cadastro realizado!",
    text: "Seus dados foram salvos com sucesso.",
    icon: "success",
    confirmButtonText: "OK"
});

});

    }


    // ==============================
    // INICIALIZAÇÃO
    // ==============================

    // Executa caso a página inicial já tenha esses elementos
    carregarProjetos();

    ativarFormulario();

});