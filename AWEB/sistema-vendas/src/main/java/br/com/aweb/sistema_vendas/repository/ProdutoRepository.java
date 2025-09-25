package br.com.aweb.sistema_vendas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.aweb.sistema_vendas.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    

}
