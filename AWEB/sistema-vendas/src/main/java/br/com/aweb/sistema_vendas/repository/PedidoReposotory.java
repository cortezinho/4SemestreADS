package br.com.aweb.sistema_vendas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.aweb.sistema_vendas.model.Pedido;
import br.com.aweb.sistema_vendas.model.StatusPedido;

public interface PedidoReposotory extends JpaRepository<Pedido, Long> {
    List<Pedido> findByStatusPedido(StatusPedido status);
}
