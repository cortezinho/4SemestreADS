package br.com.aweb.pesquisa_satisfacao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.aweb.pesquisa_satisfacao.model.Setor;

public interface SetorRepository extends JpaRepository<Setor, Long>{

    boolean existsByNome(String nome);

}
