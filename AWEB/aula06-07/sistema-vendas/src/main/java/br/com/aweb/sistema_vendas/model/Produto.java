package br.com.aweb.sistema_vendas.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "produtos")

public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome do produto é obrigatório!")
    @Column(nullable = false, length = 100)  //validação do banco de dados
    private String nome;

    @NotBlank(message = "Produto precisa ter uma descrição!")
    @Column(nullable = false, length = 255)
    private String descricao;
    

    @Positive(message = "O valor do preço deve ser maior que zero!")
    @NotNull(message = "O preço é obrigatório!")
    @Column(nullable = false)
    private BigDecimal preco;

    @PositiveOrZero(message = "Quantidade em estoque invalida!")
    @NotNull(message = "Precisa ter pelo menos 1 em estoque!")
    @Column(nullable = false)
    private Integer estoque;

}