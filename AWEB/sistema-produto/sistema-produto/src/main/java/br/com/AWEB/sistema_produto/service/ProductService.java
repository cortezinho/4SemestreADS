package br.com.AWEB.sistema_produto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.AWEB.sistema_produto.model.Product;
import br.com.AWEB.sistema_produto.repository.ProductRepository;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;

    // Listar todos os produtos
    public List<Product> listAll(){
        return productRepository.findAll();
    }

    // Buscar produto por ID
    public Product findProduct(Long id){
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent())
            return optionalProduct.get();
        throw new RuntimeException("Produto não encontrado!");
    }

    // Inserir ou atualizar o produto
    public Product createProduct(Product product){
        return productRepository.save(product);
    }

    // Deletar produto
    public void deleteProduct(Long id){
        if (!productRepository.existsById(id))
            throw new RuntimeException("Produto não encontrado!");
        productRepository.deleteById(id);
    }

}
