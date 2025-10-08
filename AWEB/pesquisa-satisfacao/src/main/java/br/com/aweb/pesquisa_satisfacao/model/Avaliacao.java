package br.com.aweb.pesquisa_satisfacao.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "avaliacoes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Setor é obrigatório")
    @ManyToOne
    @JoinColumn(name = "setor_id", nullable = false)
    private Setor setor;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime dataHora = LocalDateTime.now();

    @NotNull
    @Positive
    @Column(nullable = false)
    private Integer nivel;

    private String comentario;

    // Construtor personalizado
    public Avaliacao(Setor setor){
        this.setor = setor;
    }

}
