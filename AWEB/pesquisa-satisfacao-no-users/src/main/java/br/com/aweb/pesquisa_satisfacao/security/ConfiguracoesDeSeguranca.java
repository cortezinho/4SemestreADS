package br.com.aweb.pesquisa_satisfacao.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class ConfiguracoesDeSeguranca {

        // @Bean
        // public UserDetailsService dadosUsuarios() {
        // UserDetails usuario1 = User.builder()
        // .username("andre@email.com")
        // .password("{noop}andre123")
        // .build();

        // UserDetails usuario2 = User.builder()
        // .username("roberto@email.com")
        // .password("{noop}roberto123")
        // .build();

        // return new InMemoryUserDetailsManager(usuario1, usuario2);
        // }

        @Bean
        public SecurityFilterChain filtrosSeguranca(HttpSecurity http) throws Exception {
                return http
                                .authorizeHttpRequests(req -> {
                                        req.requestMatchers("/login", "/css/**", "/js/**", "/img/**").permitAll();
                                        req.requestMatchers("/setores/**").hasRole("ADMIN");
                                        req.anyRequest().authenticated();
                                })
                                .formLogin(form -> form.loginPage("/login")
                                                .defaultSuccessUrl("/")
                                                .permitAll())
                                .logout(logout -> logout
                                                .logoutSuccessUrl("/login?logout")
                                                .permitAll())
                                .rememberMe(rememberMe -> rememberMe.key("lembrarDeMim"))
                                .build();
        }

        @Bean
        public PasswordEncoder codificadorSenha() {
                return new BCryptPasswordEncoder();
        }
}