const API_URL = "http://localhost:8089/medicos";

// Carrega a lista ao abrir a página
document.addEventListener("DOMContentLoaded", listarMedicos);

async function listarMedicos() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    // A API retorna um Page<>, então os dados estão em data.content
    const lista = data.content || [];
    const tbody = document.querySelector("#tabelaMedicos tbody");
    tbody.innerHTML = "";

    lista.forEach((medico) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td>${medico.id}</td>
                <td>${medico.nome}</td>
                <td>${medico.email}</td>
                <td>${medico.crm}</td>
                <td>${medico.especialidade}</td>
                <td>
                    <button class="btn-excluir" onclick="excluirMedico(${medico.id})">Excluir</button>
                </td>
            `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao listar médicos:", error);
  }
}

document.getElementById("formMedico").addEventListener("submit", async (e) => {
  e.preventDefault();
  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "none";

  // Monta o objeto conforme DadosCadastroMedico
  const payload = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    crm: document.getElementById("crm").value,
    especialidade: document.getElementById("especialidade").value,
    endereco: {
      logradouro: document.getElementById("logradouro").value,
      bairro: document.getElementById("bairro").value,
      cep: document.getElementById("cep").value,
      cidade: document.getElementById("cidade").value,
      uf: document.getElementById("uf").value,
      numero: document.getElementById("numero").value,
      complemento: document.getElementById("complemento").value,
    },
  };

  try {
    const response = await fetch(`${API_URL}/cadastro`, {
      // Atenção ao endpoint /cadastro
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.status === 201) {
      resultDiv.className = "result success";
      resultDiv.innerHTML = "Médico cadastrado com sucesso!";
      resultDiv.style.display = "block";
      document.getElementById("formMedico").reset();
      listarMedicos(); // Atualiza a tabela
    } else {
      const erro = await response.json();
      throw new Error(JSON.stringify(erro));
    }
  } catch (error) {
    resultDiv.className = "result error";
    resultDiv.innerHTML = `Erro: ${error.message}`;
    resultDiv.style.display = "block";
  }
});

async function excluirMedico(id) {
  if (!confirm("Tem certeza que deseja excluir este médico?")) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    listarMedicos();
  } catch (error) {
    alert("Erro ao excluir médico");
  }
}
