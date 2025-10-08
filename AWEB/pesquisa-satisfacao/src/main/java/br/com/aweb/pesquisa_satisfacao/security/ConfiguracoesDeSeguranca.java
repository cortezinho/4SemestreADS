package br.com.aweb.pesquisa_satisfacao.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class ConfiguracoesDeSeguranca {

    @Bean
    public UserDetailsService dadosUsuario(){
        UserDetails usuario1 = User.builder().username("gabriel@email.com").password("{noop}gabriel123").build();
        UserDetails usuario2 = User.builder().username("cortez@email.com").password("{noop}cortez123").build();

        return new InMemoryUserDetailsManager(usuario1, usuario2);
    }  
    
}
