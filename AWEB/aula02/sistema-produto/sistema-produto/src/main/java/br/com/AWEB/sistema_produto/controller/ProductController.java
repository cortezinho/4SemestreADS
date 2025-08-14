package br.com.AWEB.sistema_produto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import br.com.AWEB.sistema_produto.service.ProductService;

@Controller
@RequestMapping("/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    // Listar produtos
    public String list(Model model){
        model.addAttribute("products",productService.listAll());
        return "product/list";
    }

}
