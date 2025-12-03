package com.medpro.medpro.domain.validacoes.cancelamento;

import com.medpro.medpro.model.dto.DadosCancelamentoConsulta;

public interface ValidadorCancelamentoDeConsulta {
    void validar(DadosCancelamentoConsulta dados);
}