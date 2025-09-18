package br.com.AWEB.sistema_produto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.AWEB.sistema_produto.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
}
