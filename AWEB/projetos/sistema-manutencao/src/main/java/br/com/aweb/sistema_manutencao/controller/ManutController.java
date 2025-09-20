package br.com.aweb.sistema_manutencao.controller;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

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

import br.com.aweb.sistema_manutencao.model.Manut;
import br.com.aweb.sistema_manutencao.repository.ManutRepository;
import jakarta.validation.Valid;


@Controller
@RequestMapping("/manutencao")
public class ManutController {

    @Autowired
    ManutRepository manutRepository;
    
    // LISTAR
    @GetMapping
    public ModelAndView list(){
        return new ModelAndView("list" , Map.of("manuts" , manutRepository.findAll()));
    }
    

    // CRIAR
    @GetMapping("/criar")
    public ModelAndView create() {
        return new ModelAndView("form", Map.of("manut", new Manut()));
    }

    @PostMapping("/criar")
    public String create(@Valid Manut manut, BindingResult result) {
        if (result.hasErrors()) {
            return "form";
        }
        manutRepository.save(manut);
        return "redirect:/manutencao";
    }
    
    // EDITAR
    @GetMapping("/editar/{id}")
    public ModelAndView edit(@PathVariable Long id) {
        Optional<Manut> manut = manutRepository.findById(id);
        if (manut.isPresent() && manut.get().getFinalizadoEm() == null) {
            return new ModelAndView("form", Map.of("manut", manut.get()));
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);

    }

    @PostMapping("/editar/{id}")
    public String edit(@Valid Manut manut, BindingResult result) {
        if (result.hasErrors()) {
            return "form";
        }
        manutRepository.save(manut);
        return "redirect:/manutencao";
    }

     // DELETAR
    @GetMapping("/deletar/{id}")
    public ModelAndView delete(@PathVariable Long id) {
                Optional<Manut> manut = manutRepository.findById(id);
        if (manut.isPresent()) {
            return new ModelAndView("delete", Map.of("manut", manut.get()));
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);

    }

    @PostMapping("/deletar/{id}")
    public String delete(Manut manut) {
        manutRepository.delete(manut);
        return "redirect:/manutencao";
    }

    @PostMapping("/finalizar/{id}")
    public String finish(@PathVariable Long id) {
        var optionalManut = manutRepository.findById(id);
        if (optionalManut.isPresent() && optionalManut.get().getFinalizadoEm() == null) {
            var manut = optionalManut.get();
            manut.setFinalizadoEm(LocalDate.now());
            manutRepository.save(manut);
            return "redirect:/manutencao";
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

}
