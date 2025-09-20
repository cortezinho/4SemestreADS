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

import br.com.aweb.sistema_vendas.model.Produto;
import br.com.aweb.sistema_vendas.services.ProdutosServices;
import jakarta.validation.Valid;

@Controller
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutosServices produtosServices;

    // listar produtos
    @GetMapping()
    public ModelAndView list() {
        return new ModelAndView("produto/list", Map.of("produtos", produtosServices.listarTodos()));
    }

    // formulario de cadastro
    @GetMapping("/novo")
    public ModelAndView create() {
        return new ModelAndView("produto/form", Map.of("produto", new Produto()));
    }

    // salvar produtos
    @PostMapping("/novo")
    public String create(@Valid Produto produto, BindingResult result) {
        if (result.hasErrors()) {
            return "produto/form";
        }
        produtosServices.salvar(produto);
        return "redirect:/produtos";
    }

    // formulario de edição
    @GetMapping("/editar/{id}")
    public ModelAndView edit(@PathVariable Long id) {
        var optionalProduto = produtosServices.buscarPorId(id);
        if (optionalProduto.isPresent()) {
            return new ModelAndView("produto/form", Map.of("produto", optionalProduto.get()));
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    // atualizar produto
    @PostMapping("/editar/{id}")
    public String edit(@Valid Produto produto, BindingResult result) {
        if (result.hasErrors()) {
            return "produto/form";
        }
        produtosServices.atualizar(produto.getId(), produto);
        return "redirect:/produtos";

    }

    // excluir produto
    @GetMapping("/deletar/{id}")
    public ModelAndView delete(@PathVariable Long id) {
        var optionalProduto = produtosServices.buscarPorId(id);
        if (optionalProduto.isPresent()) {
            return new ModelAndView("produto/deletar", Map.of("produto", optionalProduto.get()));
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/deletar/{id}")
    public String delete(Produto produto) {
        produtosServices.Excluir(produto.getId());
        return "redirect:/produtos";

    }

}
