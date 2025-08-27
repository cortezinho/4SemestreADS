package br.com.AWEB.sistema_produto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.com.AWEB.sistema_produto.model.Product;
import br.com.AWEB.sistema_produto.service.ProductService;
import jakarta.validation.Valid;

@Controller
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Listar produtos
    @GetMapping
    public String list(Model model) {
        model.addAttribute("products", productService.listAll());
        return "list";
    }

    // Retorna a view do formulario de cadastro/edição de produto
    @GetMapping("/new")
    public String create(Model model) {
        model.addAttribute("product", new Product());
        return "form";
    }

    @GetMapping("/edit/{id}")
    public String edit(@PathVariable Long id, Model model, RedirectAttributes attributes) {
        try {
            model.addAttribute("product", productService.findProduct(id));
            return "form";
        } catch (Exception e) {
            attributes.addFlashAttribute("error", e.getMessage());
            return "redirect:/products";
        }
    }

    @PostMapping
    public String save(@Valid Product product,
            BindingResult result,
            RedirectAttributes attributes) {
        if (result.hasErrors())
            return "form";
        productService.createProduct(product);
        attributes.addFlashAttribute("message", "Produto salvo com sucesso!");
        return "redirect:/products";
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Long id, RedirectAttributes attributes) {
        try {
            productService.deleteProduct(id);
            attributes.addFlashAttribute("message", "Produto excluido com sucesso!");
        } catch (Exception e) {
            attributes.addFlashAttribute("error", e.getMessage());
        }
        return "redirect:/products";
    }

    @GetMapping("/search")
    public String search(
            @RequestParam(name = "name", required = false) String name,
            Model model) {
        if (name != null && !name.isBlank()) {
            List<Product> productsList = productService.findByName(name);
            model.addAttribute("products", productsList);
        }
        return "search";
    }

}
