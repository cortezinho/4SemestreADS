package br.com.aweb.sistema_manutencao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import br.com.aweb.sistema_manutencao.repository.ManutRepository;


@Controller
@RequestMapping("/manutencao")
public class ManutController {

    @Autowired
    ManutRepository manutRepository;

    @GetMapping("/home")
    public String home() {
        return "home";
    }
    
    @GetMapping
    public ModelAndView list(){
        var modelAndView = new ModelAndView("list");
        modelAndView.addObject("manuts", manutRepository.findAll());
        return modelAndView;
    }
    
    
}
