package br.com.aweb.sistema_vendas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.aweb.sistema_vendas.model.Cliente;
import br.com.aweb.sistema_vendas.repository.ClienteRepository;
import jakarta.transaction.Transactional;

@Service

public class ClientesServices {
    @Autowired
    private ClienteRepository clienteRepository;

    // CREATE
    @Transactional
    public Cliente salvar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    // READ
    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> buscarPorId(Long id) {
        return clienteRepository.findById(id);
    }

    // UPDATE
    @Transactional
    public Cliente atualizar(Long id, Cliente clienteAtualzado) {
        var optionalCliente = buscarPorId(id);
        if (!optionalCliente.isPresent()) {
            throw new IllegalArgumentException("Produto não encotrado.");
        }
        var clienteExistente = optionalCliente.get();

        clienteExistente.setNome(clienteAtualzado.getNome());
        clienteExistente.setCpf(clienteAtualzado.getCpf());
        clienteExistente.setEmail(clienteAtualzado.getEmail());
        clienteExistente.setTelefone(clienteAtualzado.getTelefone());
        clienteExistente.setLogradouro(clienteAtualzado.getLogradouro());
        clienteExistente.setNumero(clienteAtualzado.getNumero());
        clienteExistente.setComplemento(clienteAtualzado.getComplemento());
        clienteExistente.setBairro(clienteAtualzado.getBairro());
        clienteExistente.setCidade(clienteAtualzado.getCidade());
        clienteExistente.setUf(clienteAtualzado.getUf());
        clienteExistente.setCep(clienteAtualzado.getCep());

        return clienteRepository.save(clienteExistente);
    }

    // DELETE
    @Transactional
    public void Excluir(Long id) {
        var optionalCliente = buscarPorId(id);
        if (!optionalCliente.isPresent()) {
            clienteRepository.deleteById(id);
        }
    }
}
