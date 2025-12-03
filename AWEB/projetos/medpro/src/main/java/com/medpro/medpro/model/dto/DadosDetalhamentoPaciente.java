package com.medpro.medpro.model.dto;

import com.medpro.medpro.model.entity.Endereco;
import com.medpro.medpro.model.entity.Paciente;

public record DadosDetalhamentoPaciente(Long id,
        String nome,
        String email,
        String telefone,
        Endereco endereco) {

    public DadosDetalhamentoPaciente(Paciente paciente) {
        this(paciente.getId(), paciente.getNome(), paciente.getEmail(), paciente.getTelefone(), paciente.getEndereco());
    }

}
