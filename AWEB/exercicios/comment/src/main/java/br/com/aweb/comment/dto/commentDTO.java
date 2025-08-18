package br.com.aweb.comment.dto;

public class commentDTO {
    private Long id;
    private String autor;
    private String texto;

    //construtores
    public commentDTO() {}

    public commentDTO(Long id, String autor, String texto) {
        this.id = id;
        this.autor = autor;
        this.texto = texto;
    }

    //getters e setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    

    
}
