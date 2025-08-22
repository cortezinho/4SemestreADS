package br.com.aweb.sistema_alunos.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

@Entity

public class Aluno {
    // Atributos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="O nome não pode estar em branco!")
    private String nome;

    @NotNull(message="A idade é obrigatoria!")
    @PositiveOrZero(message="A idade deverá ser positiva ou zero!")
    private Double idade;

    private String materia;

    // Construtores

    public Aluno() {}

    public Aluno(Long id, @NotBlank(message = "O nome não pode estar em branco!") String nome,
            @NotNull(message = "A idade é obrigatoria!") @PositiveOrZero(message = "A idade deverá ser positiva ou zero!") Double idade,
            String materia) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.materia = materia;
    }

    // Métodos getters e setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getIdade() {
        return idade;
    }

    public void setIdade(Double idade) {
        this.idade = idade;
    }

    public String getMateria() {
        return materia;
    }

    public void setMateria(String materia) {
        this.materia = materia;
    }

    

}
