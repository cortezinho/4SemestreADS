package br.com.AWEB.sistema_produto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import br.com.AWEB.sistema_produto.model.Product;
import br.com.AWEB.sistema_produto.service.ProductService;


@Controller
@RequestMapping("/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    // Listar produtos
    @GetMapping
    public String list(Model model){
        model.addAttribute("products",productService.listAll());
        return "list";
    }

    // Retorna a view do formulario de cadastro/edição de produto
    @GetMapping("/new")
    public String showForm(Model model) {
        model.addAttribute("product", new Product());
        return "product/form";
    }
    

}
