package br.com.aweb.hello_spring_boot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class HelloController {
    
    @GetMapping
    public String sayHello(){
        return "Olá Mundo Spring Boot!";
    }

    @GetMapping("/ola")
    public String sayHelloCustom() {
        return "Olá endpoint específico!";
    }

    @GetMapping("/greet")
    public String greet(@RequestParam(defaultValue = "name") String userName) {
        return "olá, " + userName + "! Bem-vindo(a)!";
    }

    @GetMapping("/calcular")
    public String cacular(
        @RequestParam Integer num1,
        @RequestParam Integer num2,
        @RequestParam(required = false, defaultValue = "soma") String op) {

        if (op.equals("subtracao"))
            return "Resultado: " + (num1 - num2);
        return "Resultado: " + (num1 + num2);
    
    }

    @GetMapping("/mensagem")
    public String mensagem(
        @RequestParam(required = false, defaultValue = "Visitante") String usuario,
        @RequestParam(required = false, defaultValue = "pt") String idioma) {

        if (idioma.equals("en"))
            return "Hello " + usuario + "! Welcome!";
        return "Olá, " + usuario + "! Bem-vind(a)";
    }
}
