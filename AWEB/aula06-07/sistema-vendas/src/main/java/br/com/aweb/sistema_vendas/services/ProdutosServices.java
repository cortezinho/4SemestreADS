package br.com.aweb.sistema_vendas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.aweb.sistema_vendas.model.Produto;
import br.com.aweb.sistema_vendas.repository.ProdutoRepository;
import jakarta.transaction.Transactional;

@Service
public class ProdutosServices {
    @Autowired
    private ProdutoRepository ProdutoRepository;

    // CREATE
    @Transactional
    public Produto salvar(Produto produto) {
        return ProdutoRepository.save(produto);
    }

    // READ
    public List<Produto> listarTodos() {
        return ProdutoRepository.findAll();
    }

    // UPDATE
    @Transactional
    public Produto atualizar(Long id, Produto produto) {
        
    }

}
