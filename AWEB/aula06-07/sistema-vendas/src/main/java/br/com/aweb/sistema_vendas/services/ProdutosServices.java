package br.com.aweb.sistema_vendas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.aweb.sistema_vendas.entity.Produto;
import br.com.aweb.sistema_vendas.repository.ProdutoRepository;
import jakarta.transaction.Transactional;

@Service
public class ProdutosServices {
    @Autowired
    private ProdutoRepository ProdutoRepository;

    // CREATE
    @Transactional
    public Produto salvar(Produto produto){
        return ProdutoRepository.save(produto);
    }

    // Listar todos os produtos
    public List<Produto> listAll(){
        return ProdutoRepository.findAll();
    }

    // Buscar produto por ID
    public Produto findProduct(Long id){
        Optional<Produto> optionalProduto = ProdutoRepository.findById(id);
        if (optionalProduto.isPresent())
            return optionalProduto.get();
        throw new RuntimeException("Produto não encontrado!");
    }

    // Deletar produto
    @Transactional
    public void deleteProduct(Long id){
        if (!ProdutoRepository.existsById(id))
            throw new RuntimeException("Produto não encontrado!");
        ProdutoRepository.deleteById(id);
    }
}
