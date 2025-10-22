package br.com.aweb.pesquisa_satisfacao.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String exibirLogin() {
        return "login";
    }

}

