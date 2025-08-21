package br.com.aweb.sistema_tarefas.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.aweb.sistema_tarefas.dto.TarefasDTO;

@RestController
@RequestMapping("/tarefas")
public class TarefasController {

    private Map<Long, TarefasDTO> tarefasList = new HashMap<>();
    private Long nextId = 1L;

    // criar tarefa
    @PostMapping
    public TarefasDTO createTarefa(@RequestBody TarefasDTO tarefa) {
        tarefa.setId(nextId++);
        tarefa.setStatus("pendente"); // padrão
        tarefasList.put(tarefa.getId(), tarefa);
        return tarefa;
    }

    // filtrar por prioridade
    @GetMapping
    public List<TarefasDTO> getTarefas(@RequestParam(required = false) String prioridade) {
        if (prioridade == null) {
            return tarefasList.values().stream().collect(Collectors.toList());
        }
        return tarefasList.values().stream()
                .filter(t -> t.getPrioridade().toString().equalsIgnoreCase(prioridade))
                .collect(Collectors.toList());
    }

    // atualiza o status
    @PutMapping("/{id}/status")
    public TarefasDTO updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        TarefasDTO tarefa = tarefasList.get(id);
        if (tarefa != null && body.containsKey("status")) {
            tarefa.setStatus(body.get("status"));
        }
        return tarefa;
    }

    // deleta tarefa
    @DeleteMapping("/{id}")
    public String deleteTarefa(@PathVariable Long id) {
        TarefasDTO removed = tarefasList.remove(id);
        if (removed != null) {
            return "Tarefa removida com sucesso.";
        }
        return "Tarefa não encontrada.";
    }
}
