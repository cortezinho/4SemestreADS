package br.com.aweb.sistema_vendas.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.ModelAndView;

import br.com.aweb.sistema_vendas.model.Cliente;
import br.com.aweb.sistema_vendas.services.ClientesServices;
import jakarta.validation.Valid;

@Controller
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClientesServices clientesServices;

    // listas clientes
    @GetMapping()
    public ModelAndView list() {
        return new ModelAndView("cliente/list", Map.of("clientes", clientesServices.listarTodos()));
    }

    // formulario de cadastro
    @GetMapping("/novo")
    public ModelAndView create() {
        return new ModelAndView("cliente/form", Map.of("cliente", new Cliente()));
    }

    // salvar clientes
    @PostMapping("/novo")
    public String create(@Valid Cliente cliente, BindingResult result) {
        if (result.hasErrors()) {
            return "cliente/form";
        }

        try {
            clientesServices.salvar(cliente);
        } catch (IllegalArgumentException e) {
            if (e.getMessage().contains("CPF")) {
                result.rejectValue("cpf", "error.cliente", e.getMessage());
            } else if (e.getMessage().contains("e-mail")) {
                result.rejectValue("email", "error.cliente", e.getMessage());
            }
            return "cliente/form";
        }
        return "redirect:/clientes";
    }

    // formulario de edição
    @GetMapping("/editar/{id}")
    public ModelAndView edit(@PathVariable Long id) {
        var optionalCliente = clientesServices.buscarPorId(id);
        if (optionalCliente.isPresent()) {
            return new ModelAndView("cliente/form", Map.of("cliente", optionalCliente.get()));
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    // atualizar cliente
    @PostMapping("/editar/{id}")
    public String edit(@Valid Cliente cliente, BindingResult result) {
        if (result.hasErrors()) {
            return "cliente/form";
        }

        try {
            clientesServices.atualizar(cliente.getId(), cliente);
        } catch (IllegalArgumentException e) {
            if (e.getMessage().contains("CPF")) {
                result.rejectValue("cpf", "error.cliente", e.getMessage());
            } else if (e.getMessage().contains("e-mail")) {
                result.rejectValue("email", "error.cliente", e.getMessage());
            }
            return "cliente/form";
        }
        return "redirect:/clientes";
    }

    // excluir cliente
    @GetMapping("/deletar/{id}")
    public ModelAndView delete(@PathVariable Long id) {
        var optionalCliente = clientesServices.buscarPorId(id);
        if (optionalCliente.isPresent()) {
            return new ModelAndView("cliente/deletar", Map.of("cliente", optionalCliente.get()));
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/deletar/{id}")
    public String delete(@Valid Cliente cliente, BindingResult result) {
        clientesServices.Excluir(cliente.getId());
        return "redirect:/clientes";
    }

}
