package br.com.aweb.sistema_tarefas.dto;

public class tarefasDTO {
    //atributos
    private long id;
    private String descricao;
    private Boolean status;
    private String[] prioridade = {"alta","media","baixa"};

    //construtores
    public tarefasDTO() {}

    public tarefasDTO(long id, String descricao, Boolean status, String[] prioridade) {
        this.id = id;
        this.descricao = descricao;
        this.status = status;
        this.prioridade = prioridade;
    }

    //getters e setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String[] getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(String[] prioridade) {
        this.prioridade = prioridade;
    }
    
}
