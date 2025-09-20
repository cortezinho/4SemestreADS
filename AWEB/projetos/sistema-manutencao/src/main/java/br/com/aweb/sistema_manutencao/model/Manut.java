package br.com.aweb.sistema_manutencao.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Manut {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 3, max = 100)
    @NotBlank
    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(nullable = false)
    private LocalDateTime criadoEm = LocalDateTime.now();

    @Column(nullable = true)
    private LocalDate finalizadoEm;

    @Size(min = 3, max = 100)
    @NotBlank
    @Column(nullable = false, length = 100)
    private String nome;

    @Size(min = 3, max = 200)
    @NotBlank
    @Column(nullable = false, length = 100)
    private String descricao;

    // @NotNull
    // @FutureOrPresent
    // @DateTimeFormat(iso = ISO.DATE)
    // @Column(nullable = false)
    // private LocalDate deadline;
}
