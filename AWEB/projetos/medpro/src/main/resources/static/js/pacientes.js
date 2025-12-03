const API_URL = "http://localhost:8089/pacientes";

document.addEventListener("DOMContentLoaded", listarPacientes);

async function listarPacientes() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    // A API retorna um Page<>, dados em data.content
    const lista = data.content || [];
    const tbody = document.querySelector("#tabelaPacientes tbody");
    tbody.innerHTML = "";

    lista.forEach((paciente) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td>${paciente.id}</td>
                <td>${paciente.nome}</td>
                <td>${paciente.email}</td>
                <td>${paciente.cpf}</td>
                <td>
                    <button class="btn-excluir" onclick="excluirPaciente(${paciente.id})">Excluir</button>
                </td>
            `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao listar pacientes:", error);
  }
}

document
  .getElementById("formPaciente")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "none";

    const payload = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      cpf: document.getElementById("cpf").value,
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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        resultDiv.className = "result success";
        resultDiv.innerHTML = "Paciente cadastrado com sucesso!";
        resultDiv.style.display = "block";
        document.getElementById("formPaciente").reset();
        listarPacientes();
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

async function excluirPaciente(id) {
  if (!confirm("Tem certeza que deseja excluir este paciente?")) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    listarPacientes();
  } catch (error) {
    alert("Erro ao excluir paciente");
  }
}
