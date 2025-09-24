package br.com.aweb.sistema_manutencao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.aweb.sistema_manutencao.model.Manut;

public interface ManutRepository extends JpaRepository<Manut, Long> {
    List<Manut> findByTituloContainingIgnoreCase(String titulo);

}
