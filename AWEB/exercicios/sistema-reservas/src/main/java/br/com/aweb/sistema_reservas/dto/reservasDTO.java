package br.com.aweb.sistema_reservas.dto;

public class reservasDTO {
    private Long id;
    private String cliente;
    private String data;

    // construtores
    public reservasDTO() {}

    public reservasDTO(Long id, String cliente, String data) {
        this.id = id;
        this.cliente = cliente;
        this.data = data;
    }

    //getters e setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    

    
}
