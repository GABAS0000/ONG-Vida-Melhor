// ==============================
// PROJETOS DINÂMICOS
// ==============================

export function carregarProjetos() {

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