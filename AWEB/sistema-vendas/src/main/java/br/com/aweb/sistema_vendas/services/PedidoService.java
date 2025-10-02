package br.com.aweb.sistema_vendas.services;

import org.springframework.beans.factory.annotation.Autowired;

import br.com.aweb.sistema_vendas.model.Cliente;
import br.com.aweb.sistema_vendas.model.Pedido;
import br.com.aweb.sistema_vendas.repository.PedidoReposotory;
import br.com.aweb.sistema_vendas.repository.ProdutoRepository;
import jakarta.transaction.Transactional;

public class PedidoService {

    @Autowired
    private PedidoReposotory pedidoRepository;
    private ProdutoRepository produtoRepository;

    // CREATE
    @Transactional
    public Pedido criaPedido(Cliente cliente) {
        Pedido pedido = new Pedido(cliente);
        return pedidoRepository.save(pedido);
    }

    @Transactional
    public Pedido adicionarItem(Long pedidoId, Long produtoId, Integer quantidade) {
        var optionalProduto = produtoRepository.findById(produtoId);
        var optionalPedido = pedidoRepository.findById(pedidoId);

        if (!optionalPedido.isPresent() || !optionalProduto.isPresent()) {
            throw new IllegalArgumentException("Produto/Pedido não encontrado!");
        }

    }
}
