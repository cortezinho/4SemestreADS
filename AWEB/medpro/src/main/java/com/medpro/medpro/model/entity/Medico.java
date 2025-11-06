package com.medpro.medpro.model.entity;

import com.medpro.medpro.enums.Especialidade;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "medicos")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Medico {
    
    private Long id;

    private String nome;

    private String email;

    private String crm;

    private Especialidade especialidade;

    private Endereco endereco;

}
