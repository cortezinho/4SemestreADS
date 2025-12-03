package com.medpro.medpro.model.dto;

import com.medpro.medpro.enums.Especialidade;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DadosCadastroMedico(

    @NotBlank
    String nome, 

    @NotBlank
    String email,

    @NotBlank
    String telefone,
    
    @NotBlank
    @Pattern(regexp = "\\d{4,6}")
    String crm, 

    @NotNull
    Especialidade especialidade,
    
    @NotNull
    @Valid
    DadosEndereco endereco
    ) {
    
}
