package br.com.aweb.sistema_reservas.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.aweb.sistema_reservas.dto.reservasDTO;

@RestController
@RequestMapping("/reservas")
public class reservasController {

    private Map<Long, reservasDTO> reservasList = new HashMap<>();
    private Long nextId = 1L;

    // criar reservas
    @PostMapping
    public reservasDTO createReserva(@RequestBody reservasDTO reservas) {
        reservas.setId(nextId++);
        reservasList.put(reservas.getId(), reservas);
        return reservas;
    }

    // lista todos os comentarios
    @GetMapping
    public List<reservasDTO> allReservas(){
        return new ArrayList<>(reservasList.values());
    }

    // deleta comentario
    @DeleteMapping("/{id}")
    public String deleteReserva(@PathVariable Long id) {
        if (reservasList.remove(id) != null){
            return "Reserva deletado com sucesso";
        }
        return "Reserva não encontrado";
    }
    
}
