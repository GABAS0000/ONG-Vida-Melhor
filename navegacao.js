// Importa as funções necessárias
import { carregarProjetos } from "./projetos.js";
import { ativarFormulario } from "./formulario.js";


// ==============================
// NAVEGAÇÃO SPA
// ==============================

export function ativarNavegacao() {

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
                        throw new Error(
                            "Não foi possível carregar a página."
                        );
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
                    const novoMain =
                        documentoNovo.querySelector("main");


                    // Procura o main atual
                    const mainAtual =
                        document.querySelector("#conteudo-principal");


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


                    // Se for projetos, cria os projetos
                    carregarProjetos();


                    // Se for cadastro, ativa o formulário
                    ativarFormulario();


                    console.log(
                        "Página carregada com sucesso!"
                    );

                })

                .catch(function (erro) {

                    console.error(
                        "Erro ao carregar a página:",
                        erro
                    );

                });

        });

    });
}