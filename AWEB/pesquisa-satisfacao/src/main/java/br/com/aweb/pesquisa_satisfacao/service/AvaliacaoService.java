package br.com.aweb.pesquisa_satisfacao.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.aweb.pesquisa_satisfacao.model.Avaliacao;
import br.com.aweb.pesquisa_satisfacao.model.Setor;
import br.com.aweb.pesquisa_satisfacao.repository.AvaliacaoRepository;
import jakarta.transaction.Transactional;

@Service
public class AvaliacaoService {
    
    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Transactional
    public Avaliacao salvarAvaliacao(Avaliacao avaliacao){
        return avaliacaoRepository.save(avaliacao);
    }

    public List<Avaliacao> listarTodasAvaliacoes(){
        return avaliacaoRepository.findAll();
    }

    public List<Avaliacao> buscarAvaliacaoPorSetor(Setor setor){
        return avaliacaoRepository.findBySetor(setor);
    }

}
