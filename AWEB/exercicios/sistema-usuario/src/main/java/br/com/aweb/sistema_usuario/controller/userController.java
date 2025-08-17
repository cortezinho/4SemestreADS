package br.com.aweb.sistema_usuario.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.aweb.sistema_usuario.dto.userDTO;




@RestController
@RequestMapping("/users")

public class userController {

    private Map<Long, userDTO> users = new HashMap<>();
    private Long nextId = 1L;

    //listar users
    @GetMapping
    public List<userDTO> allUsers(){
        return new ArrayList<>(users.values());
    }
    

    //criar user
    @PostMapping
    public userDTO createUser(@RequestBody userDTO user) {
        user.setId(nextId++);
        users.put(user.getId(), user);
        
        return user;
    }
    
    
    
}
