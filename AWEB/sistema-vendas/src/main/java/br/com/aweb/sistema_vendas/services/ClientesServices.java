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
        if (clienteRepository.existsByEmail(cliente.getEmail())){
            throw new IllegalArgumentException("E-mail já cadastrado");
        }
        if (clienteRepository.existsByCpf(cliente.getCpf())){
            throw new IllegalArgumentException("CPF já cadastrado");
        }
        Cliente clienteSalvo = clienteRepository.save(cliente);
        return clienteSalvo;
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
            throw new IllegalArgumentException("Cliente não encotrado.");
        }
        var clienteExistente = optionalCliente.get();

        // valida email se alterado
        if (!clienteExistente.getEmail().equals(clienteAtualzado.getEmail())){
            if (clienteRepository.existsByEmail((clienteAtualzado.getEmail()))){
                throw new IllegalArgumentException("E-mail já cadastrado.");
            }
        }

        // valida cpf se alterado
        if (!clienteExistente.getCpf().equals(clienteAtualzado.getCpf())){
            if (clienteRepository.existsByCpf((clienteAtualzado.getCpf()))){
                throw new IllegalArgumentException("CPF já cadastrado.");
            }
        }

        // atualiza os campos
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

        Cliente clienteSalvo = clienteRepository.save(clienteExistente);
        return clienteSalvo;
    }

    // DELETE
    @Transactional
    public void Excluir(Long id) {
        var optionalCliente = buscarPorId(id);
        if (!optionalCliente.isPresent()) {
            clienteRepository.deleteById(id);
        }
        clienteRepository.deleteById(id);
    }
}
