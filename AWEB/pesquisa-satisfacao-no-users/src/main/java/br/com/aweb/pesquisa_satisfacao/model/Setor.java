package br.com.aweb.pesquisa_satisfacao.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "setores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Setor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Setor é obrigatório")
    @Column(nullable = false, unique = true)
    private String nome;

    // Relacionamento com Avaliacao
    @OneToMany(mappedBy = "setor", fetch = FetchType.EAGER)
    private List<Avaliacao> avaliacao = new ArrayList<>();

}
