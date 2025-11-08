package com.medpro.medpro.model.dto;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoMedico(
    @NotNull
    Long id,

    String nome,

    String telefone,
    
    DadosEndereco endereco
  ) {
    
}
