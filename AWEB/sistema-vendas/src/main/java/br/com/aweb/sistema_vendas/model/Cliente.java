package br.com.aweb.sistema_vendas.model;

import org.hibernate.validator.constraints.br.CPF;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "clientes")

public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório!")
    @Column(nullable = false, length = 100)  //validação do banco de dados
    private String nome;

    @NotBlank(message = "CPF é obrigatório!")
    @Column(nullable = false, length = 11)
    @CPF
    private String cpf;

    @NotBlank(message = "EMAIL é obrigatório!")
    @Column(nullable = false)
    @Email
    private String email;

    @NotBlank(message = "Número de telefone é obrigatório!")
    @Column(nullable = false)
    private String telefone;
    
    // ENDEREÇO
    @NotBlank(message = "Endereço é obrigatório!")
    @Column(nullable = false, length = 100)
    private String logradouro;

    private Integer numero;

    private String complemento;

    @NotBlank(message = "Bairro é obrigatório!")
    @Column(nullable = false, length = 100)
    private String bairro;

    @NotBlank(message = "Cidade é obrigatório!")
    @Column(nullable = false, length = 100)
    private String cidade;

    @NotBlank(message = "Estado é obrigatório!")
    @Column(nullable = false, length = 100)
    private String uf;

    @NotBlank(message = "CEP é obrigatório!")
    @Column(nullable = false, length = 100)
    private String cep;

}
