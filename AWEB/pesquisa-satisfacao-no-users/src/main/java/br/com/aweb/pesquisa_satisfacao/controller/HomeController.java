package br.com.aweb.pesquisa_satisfacao.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import br.com.aweb.pesquisa_satisfacao.model.Setor;
import br.com.aweb.pesquisa_satisfacao.repository.SetorRepository;

@Controller
@RequestMapping("/")
public class HomeController {
    @Autowired
    private SetorRepository setorRepository;

    @GetMapping
    public ModelAndView home() {
        List<Setor> setores = setorRepository.findAll();
        return new ModelAndView("home", Map.of("setores", setores));
    }

}
