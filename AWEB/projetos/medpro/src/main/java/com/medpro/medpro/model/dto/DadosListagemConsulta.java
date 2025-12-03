package com.medpro.medpro.model.dto;

import com.medpro.medpro.enums.MotivoCancelamento; // Importe o Enum
import com.medpro.medpro.model.entity.Consulta;
import java.time.LocalDateTime;

public record DadosListagemConsulta(
    Long id, 
    String medico, 
    String paciente, 
    LocalDateTime data,
    MotivoCancelamento motivoCancelamento
) {

    public DadosListagemConsulta(Consulta consulta) {
        this(
            consulta.getId(), 
            consulta.getMedico().getNome(), 
            consulta.getPaciente().getNome(), 
            consulta.getData(),
            consulta.getMotivoCancelamento()
        );
    }
}