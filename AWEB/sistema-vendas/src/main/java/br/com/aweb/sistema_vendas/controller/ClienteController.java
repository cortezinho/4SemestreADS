package br.com.aweb.sistema_vendas.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public ModelAndView list(){
        return new ModelAndView("cliente/list" , Map.of("clientes", clientesServices.listarTodos()));
    }

    // formulario de cadastro
    @GetMapping("/novo")
    public ModelAndView create(){
        return new ModelAndView("cliente/form" , Map.of("cliente" , new Cliente()));
    }

    // salvar clientes
    @PostMapping("/novo")
    public String create(@Valid Cliente cliente, BindingResult result) {
        if (result.hasErrors()){
            return "cliente/form";
        }
        clientesServices.salvar(cliente);
        return "redirect:/clientes";
    }
    
    
}
