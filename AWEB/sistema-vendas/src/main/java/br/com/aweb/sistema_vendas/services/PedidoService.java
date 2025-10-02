package br.com.aweb.sistema_vendas.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.aweb.sistema_vendas.model.Cliente;
import br.com.aweb.sistema_vendas.model.ItemPedido;
import br.com.aweb.sistema_vendas.model.Pedido;
import br.com.aweb.sistema_vendas.model.Produto;
import br.com.aweb.sistema_vendas.model.StatusPedido;
import br.com.aweb.sistema_vendas.repository.PedidoReposotory;
import br.com.aweb.sistema_vendas.repository.ProdutoRepository;
import jakarta.transaction.Transactional;

@Service
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

    // calcular valor total do pedido
    private void calcularValorTotal(Pedido pedido) {
        BigDecimal total = BigDecimal.ZERO;

        for (ItemPedido item : pedido.getItens()) {
            BigDecimal valorItem = item.getPrecoUnitario().multiply(BigDecimal.valueOf(item.getQuatidade()));
            total = total.add(valorItem);
        }
        pedido.setValorTotal(total);
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
        calcularValorTotal(pedido);

        // salva alterações
        pedidoRepository.save(pedido);
        produtoRepository.save(produto);

    }

    @Transactional
    public Pedido removerItem(Long pedidoId, Long itemId) {
        Optional<Pedido> optionalPedido = pedidoRepository.findById(pedidoId);

        if (!optionalPedido.isPresent()) {
            throw new IllegalArgumentException("Pedido não encontrado!");
        }

        Pedido pedido = optionalPedido.get();

        // verificar se o pedido está ativo
        if (pedido.getStatus() != StatusPedido.ATIVO) {
            throw new IllegalStateException("O pedido não está ativo e não pode ser alterado!");
        }

        // buscar o item no pedido
        Optional<ItemPedido> optionalItem = pedido.getItens().stream()
                .filter(item -> item.getId().equals(itemId))
                .findFirst();

        if (!optionalItem.isPresent()) {
            throw new IllegalArgumentException("Item do pedido não encontrado!");
        }

        ItemPedido itemParaRemover = optionalItem.get();
        Produto produto = itemParaRemover.getProduto();

        // devolver o produto ao estoque
        produto.setEstoque(produto.getEstoque() + itemParaRemover.getQuatidade());

        // remover o item da lista
        pedido.getItens().remove(itemParaRemover);
        itemParaRemover.setPedido(null); // Garante que a relação seja desfeita

        // recalcular valor total
        calcularValorTotal(pedido);

        // salvar as alterações
        pedidoRepository.save(pedido);
        produtoRepository.save(produto);

        return pedido;
    }

    @Transactional
    public Pedido cancelarPedido(Long pedidoId) {

        // veificar se o pedido existe
        Optional<Pedido> optionalPedido = pedidoRepository.findById(pedidoId);

        if (!optionalPedido.isPresent()) {
            throw new IllegalArgumentException("Pedido não encontrado!");
        }

        Pedido pedido = optionalPedido.get();

        // devolve todos os itens ao estoque
        for (ItemPedido item : pedido.getItens()) {
            Produto produto = item.getProduto();
            produto.setEstoque(produto.getEstoque() + item.getQuatidade());
            produtoRepository.save(produto); // Salva cada produto atualizado
        }

        // altera o status do pedido para CANCELADO
        pedido.setStatus(StatusPedido.CANCELADO);

        // salva as alterações do pedido
        return pedidoRepository.save(pedido);
    }

    // READ
    public Optional<Pedido> buscarPorId(Long id) {
        return pedidoRepository.findById(id);
    }

    public List<Pedido> listarTodos() {
        return pedidoRepository.findAll();
    }

    public List<Pedido> buscarPorStatus(StatusPedido status) {
        return pedidoRepository.findByStatusPedido(status);
    }

}
