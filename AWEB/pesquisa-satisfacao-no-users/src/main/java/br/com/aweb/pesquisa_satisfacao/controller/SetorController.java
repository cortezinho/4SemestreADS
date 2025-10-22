package br.com.aweb.pesquisa_satisfacao.controller;

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

import br.com.aweb.pesquisa_satisfacao.model.Setor;
import br.com.aweb.pesquisa_satisfacao.service.SetorService;
import jakarta.validation.Valid;

@Controller
@RequestMapping("/setores")
public class SetorController {

    @Autowired
    private SetorService setorService;

    @GetMapping
    public ModelAndView listar() {
        return new ModelAndView("setor/list", Map.of("setores", setorService.buscarTodosSetores()));
    }

    @GetMapping("/novo")
    public ModelAndView salvar() {
        return new ModelAndView("setor/form", Map.of("setor", new Setor()));
    }

    @PostMapping("/novo")
    public String salvar(@Valid Setor setor, BindingResult result) {
        if (result.hasErrors())
            return "setor/form";

        try {
            setorService.salvarSetor(setor);
        } catch (IllegalArgumentException e) {
            if (e.getMessage().contains("Setor")) {
                result.rejectValue("nome", "error.setor", e.getMessage());
            }
            return "setor/form";
        }
        return "redirect:/setores";
    }

    @GetMapping("/delete/{id}")
    public ModelAndView excluir(@PathVariable Long id) {

        Optional<Setor> optionalSetor = setorService.buscarSetorPorId(id);

        System.out.println();

        if (!optionalSetor.isPresent() || !optionalSetor.get().getAvaliacao().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return new ModelAndView("setor/delete", Map.of("setor", optionalSetor.get()));

    }

    @PostMapping("/delete/{id}")
    public String excluir(Setor setor) {
        setorService.excluirSetor(setor.getId());
        return "redirect:/setores";
    }

}
