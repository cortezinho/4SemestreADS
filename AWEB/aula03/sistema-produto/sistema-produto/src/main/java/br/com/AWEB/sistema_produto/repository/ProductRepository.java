package br.com.AWEB.sistema_produto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.AWEB.sistema_produto.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String name); //IgnoreCasa Ñ vai diferenciar maiuscula e minuscula
    
}
