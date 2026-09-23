// ==============================
// EVENTO DO FORMULÁRIO
// ==============================

export function ativarFormulario() {

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


    // ==============================
    // RECUPERAÇÃO DO LOCALSTORAGE
    // ==============================

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


    // ==============================
    // ENVIO DO FORMULÁRIO
    // ==============================

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

        // Exibe mensagem usando SweetAlert2
        Swal.fire({
            title: "Cadastro realizado!",
            text: "Seus dados foram salvos com sucesso.",
            icon: "success",
            confirmButtonText: "OK"
        });

    });
}