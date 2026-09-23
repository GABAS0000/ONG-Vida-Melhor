import { ativarNavegacao } from "./navegacao.js";
import { carregarProjetos } from "./projetos.js";
import { ativarFormulario } from "./formulario.js";

document.addEventListener("DOMContentLoaded", function () {

    // Ativa a navegação SPA
    ativarNavegacao();

    // Carrega os projetos caso estejam na página
    carregarProjetos();

    // Ativa o formulário caso esteja na página
    ativarFormulario();

});