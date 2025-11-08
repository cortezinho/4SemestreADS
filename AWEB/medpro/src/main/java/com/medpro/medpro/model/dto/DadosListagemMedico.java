package com.medpro.medpro.model.dto;

import com.medpro.medpro.enums.Especialidade;
import com.medpro.medpro.model.entity.Medico;

public record DadosListagemMedico(Long id, String nome, String email, String crm, Especialidade especialidade) {
    public DadosListagemMedico(Medico medico){
        this(medico.getId(), medico.getNome(), medico.getEmail(), medico.getCrm(), medico.getEspecialidade());
    }
}
