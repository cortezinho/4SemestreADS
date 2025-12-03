package com.medpro.medpro.model.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DadosCadastroPaciente(

@NotBlank
String nome, 

@NotBlank
String email, 

@NotBlank
String telefone, 

@NotBlank
@Pattern(regexp = "\\d{4,6}")
String cpf, 

@NotNull
@Valid
DadosEndereco endereco
) {
    
}
