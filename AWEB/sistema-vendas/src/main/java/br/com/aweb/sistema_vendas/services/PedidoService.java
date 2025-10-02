package br.com.aweb.sistema_vendas.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import br.com.aweb.sistema_vendas.model.Cliente;
import br.com.aweb.sistema_vendas.model.ItemPedido;
import br.com.aweb.sistema_vendas.model.Pedido;
import br.com.aweb.sistema_vendas.model.Produto;
import br.com.aweb.sistema_vendas.model.StatusPedido;
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

        Optional<Pedido> optionalPedido = pedidoRepository.findById(pedidoId);
        Optional<Produto> optionalProduto = produtoRepository.findById(produtoId);

        if (!optionalPedido.isPresent()) {
            throw new IllegalArgumentException("Produto/Pedido não encontrado!");
        }

        if (!optionalProduto.isPresent()) {
            throw new IllegalArgumentException("Produto/Pedido não encontrado!");
        }

        Pedido pedido = optionalPedido.get();
        Produto produto = optionalProduto.get();

        // verificar se o pedido está ativo
        if (pedido.getStatus() != StatusPedido.ATIVO) {
            throw new IllegalStateException("Produto/Pedido não encontrado!");
        }

        // verificar a quantidade em estoque
        if (produto.getEstoque() < quantidade) {
            throw new IllegalStateException("Produto/Pedido não encontrado!");
        }

        // criar o item pedido
        ItemPedido item = new ItemPedido(produto, quantidade);
        item.setPedido(pedido);

        // adiciona a lista de pedidos
        pedido.getItens().add(item);

        // atualiza estoque
        produto.setEstoque(produto.getEstoque() - quantidade);

        // recalcula valor total
        calculaValorTotal(pedido);

        // salva alterações
        pedidoRepository.save(pedido);
        produtoRepository.save(produto);

    }
}
