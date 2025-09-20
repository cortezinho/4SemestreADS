package br.com.aweb.to_do_list.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data // @Data ja tem todos abaixo
// @Getter
// @Setter
// @EqualsAndHashCode(of = "id")
// @ToString

public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 3, max = 100)
    @NotBlank
    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false)
    private LocalDateTime createAt = LocalDateTime.now();

    @NotNull
    @FutureOrPresent
    @DateTimeFormat(iso = ISO.DATE)
    @Column(nullable = false)
    private LocalDate deadline;

    @Column(nullable = true)
    private LocalDate finishedAt;
}
