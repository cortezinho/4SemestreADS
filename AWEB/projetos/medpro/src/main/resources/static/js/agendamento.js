const API_CONSULTAS = "http://localhost:8089/consultas";
const API_PACIENTES = "http://localhost:8089/pacientes";
const API_MEDICOS = "http://localhost:8089/medicos";

document.addEventListener("DOMContentLoaded", () => {
  carregarPacientesSelect();
  carregarMedicosSelect();
  listarConsultas();
});

// --- CARREGAR SELECT DE PACIENTES ---
async function carregarPacientesSelect() {
  try {
    const response = await fetch(API_PACIENTES);
    const data = await response.json();
    const select = document.getElementById("selectPaciente");

    select.innerHTML = '<option value="">Selecione um paciente...</option>';

    if (data.content) {
      data.content.forEach((p) => {
        const option = document.createElement("option");
        option.value = p.id;
        option.text = `${p.nome} (CPF: ${p.cpf})`;
        select.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Erro ao carregar pacientes:", error);
    document.getElementById("selectPaciente").innerHTML =
      "<option>Erro ao carregar</option>";
  }
}

// --- CARREGAR SELECT DE MÉDICOS ---
async function carregarMedicosSelect() {
  try {
    const response = await fetch(API_MEDICOS);
    const data = await response.json();
    const select = document.getElementById("selectMedico");

    select.innerHTML =
      '<option value="">Selecione um médico (ou aleatório)...</option>';

    if (data.content) {
      data.content.forEach((m) => {
        const option = document.createElement("option");
        option.value = m.id;
        option.text = `${m.nome} - ${m.especialidade}`;
        select.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Erro ao carregar médicos:", error);
  }
}

// --- LISTAR CONSULTAS (TABELA DIREITA) ---
async function listarConsultas() {
  try {
    const response = await fetch(API_CONSULTAS);
    const data = await response.json();
    const tbody = document.querySelector("#tabelaConsultas tbody");
    tbody.innerHTML = "";

    if (data.content && data.content.length > 0) {
      data.content.forEach((c) => {
        const dataFormatada = new Date(c.data).toLocaleString("pt-BR");

        // Verifica se tem motivo de cancelamento
        let statusTexto = "Agendada";
        let classeCor = "status-ativo";

        if (c.motivoCancelamento) {
          statusTexto = `Cancelada: ${c.motivoCancelamento}`;
          classeCor = "status-cancelado";
        }

        const tr = document.createElement("tr");
        if (classeCor) tr.classList.add(classeCor);

        tr.innerHTML = `
            <td>${c.id}</td>
            <td>${c.medico}</td>
            <td>${c.paciente}</td>
            <td>${dataFormatada}</td>
            <td>${statusTexto}</td>
        `;
        tbody.appendChild(tr);
      });
    } else {
      tbody.innerHTML =
        '<tr><td colspan="5" style="text-align:center;">Nenhuma consulta encontrada.</td></tr>';
    }
  } catch (error) {
    console.error("Erro consultas:", error);
  }
}

// --- AGENDAR CONSULTA (POST) ---
document
  .getElementById("formAgendamento")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const resultDiv = document.getElementById("resultAgendamento");
    resultDiv.style.display = "none";

    const idPaciente = document.getElementById("selectPaciente").value;
    const idMedico = document.getElementById("selectMedico").value;
    const dataHora = document.getElementById("data").value;

    if (!idPaciente) {
      alert("Selecione um paciente!");
      return;
    }

    const payload = { idPaciente: idPaciente, data: dataHora };
    if (idMedico) payload.idMedico = idMedico;

    try {
      const response = await fetch(API_CONSULTAS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Tenta ler o corpo da resposta como JSON
      const data = await response.json().catch(() => null);

      if (response.ok) {
        resultDiv.className = "result success";
        resultDiv.innerHTML = `Sucesso! Consulta agendada.`;
        resultDiv.style.display = "block";
        listarConsultas();
      } else {
        // Lógica para extrair a mensagem de erro correta
        let msg = "Erro ao agendar.";
        
        if (data) {
          if (Array.isArray(data)) {
            // Caso 1: Lista de erros de validação (ex: campos nulos)
            msg = data.map(erro => `- ${erro.mensagem}`).join("<br>");
          } else if (data.message) {
            // Caso 2: Erro de negócio (ex: clínica fechada)
            msg = data.message;
          }
        }
        
        throw new Error(msg);
      }
    } catch (error) {
      resultDiv.className = "result error";
      resultDiv.innerHTML = error.message; // Alterado de innerText para innerHTML para suportar quebras de linha (<br>)
      resultDiv.style.display = "block";
    }
  });

// --- CANCELAR CONSULTA (DELETE) ---
document
  .getElementById("formCancelamento")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const resultDiv = document.getElementById("resultCancelamento");

    const payload = {
      idConsulta: document.getElementById("idConsulta").value,
      motivo: document.getElementById("motivo").value,
    };

    try {
      const response = await fetch(API_CONSULTAS, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (response.status === 204) {
        resultDiv.className = "result success";
        resultDiv.innerText = "Consulta cancelada!";
        resultDiv.style.display = "block";
        listarConsultas();
        document.getElementById("formCancelamento").reset();
      } else {
        // Aplica a mesma lógica de erro para o cancelamento
        let msg = "Erro ao cancelar.";
        if (data && data.message) {
             msg = data.message;
        }
        throw new Error(msg);
      }
    } catch (error) {
      resultDiv.className = "result error";
      resultDiv.innerText = error.message;
      resultDiv.style.display = "block";
    }
  });