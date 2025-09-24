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

    public Optional<Produto> buscarPorId(Long id) {
        return ProdutoRepository.findById(id);
    }

    // UPDATE
    @Transactional
    public Produto atualizar(Long id, Produto produtoAtualizado) {
        var optionalProduto = buscarPorId(id);
        if (!optionalProduto.isPresent()) {
            throw new IllegalArgumentException("Produto não encotrado.");
        }
        var produtoExistente = optionalProduto.get();

        produtoExistente.setNome(produtoAtualizado.getNome());
        produtoExistente.setDescricao(produtoAtualizado.getDescricao());
        produtoExistente.setPreco(produtoAtualizado.getPreco());
        produtoExistente.setEstoque(produtoAtualizado.getEstoque());

        return ProdutoRepository.save(produtoExistente);
    }

    // DELETE
    @Transactional
    public void Excluir(Long id) {
        var optionalProduto = buscarPorId(id);
        if (!optionalProduto.isPresent()) {
            ProdutoRepository.deleteById(id);
        }
        ProdutoRepository.deleteById(id);
    }

}
