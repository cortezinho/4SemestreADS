package br.com.aweb.sistema_usuario.dto;

public class userDTO {
    //atrivutos do usuario
    private Long id;
    private String nome;
    private String email;

    //construtor padrao
    public userDTO() {}

    public userDTO(Long id, String nome, String email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }

    // getters e setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
}
