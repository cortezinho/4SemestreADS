package br.com.aweb.pesquisa_satisfacao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.aweb.pesquisa_satisfacao.model.Avaliacao;
import br.com.aweb.pesquisa_satisfacao.model.Setor;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    
    List<Avaliacao> findBySetor(Setor setor);
    
}