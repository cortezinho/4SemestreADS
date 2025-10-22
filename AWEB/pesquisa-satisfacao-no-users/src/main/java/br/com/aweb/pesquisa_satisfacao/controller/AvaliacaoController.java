package br.com.aweb.pesquisa_satisfacao.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.com.aweb.pesquisa_satisfacao.model.Avaliacao;
import br.com.aweb.pesquisa_satisfacao.model.Setor;
import br.com.aweb.pesquisa_satisfacao.service.AvaliacaoService;
import br.com.aweb.pesquisa_satisfacao.service.SetorService;

@Controller
@RequestMapping("/avaliar")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @Autowired
    private SetorService setorService;

    @GetMapping("/{setorId}")
    public ModelAndView salvar(@PathVariable Long setorId) {

        Optional<Setor> setorOptional = setorService.buscarSetorPorId(setorId);

        if (!setorOptional.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        Avaliacao avaliacao = new Avaliacao(setorOptional.get());
        avaliacao.setNivel(5);
        return new ModelAndView("avaliacao/form", Map.of("avaliacao", avaliacao, "nomeSetor", setorOptional.get().getNome()));

    }

    @PostMapping
    public String salvar(Avaliacao avaliacao, RedirectAttributes redirectAttributes){
        avaliacaoService.salvarAvaliacao(avaliacao);
        redirectAttributes.addFlashAttribute("message", "Obrigado por sua avaliação!");
        return "redirect:/avaliar/" + avaliacao.getSetor().getId();
    }

}