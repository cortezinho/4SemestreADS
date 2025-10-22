package br.com.aweb.pesquisa_satisfacao.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.aweb.pesquisa_satisfacao.model.Setor;
import br.com.aweb.pesquisa_satisfacao.repository.SetorRepository;
import jakarta.transaction.Transactional;

@Service
public class SetorService {

    @Autowired
    private SetorRepository setorRepository;

    @Transactional
    public Setor salvarSetor(Setor setor) {
        if (setorRepository.existsByNome(setor.getNome())) {
            throw new IllegalArgumentException("Setor já cadastrado.");
        }
        return setorRepository.save(setor);
    }

    public Optional<Setor> buscarSetorPorId(Long id) {
        return setorRepository.findById(id);
    }

    public List<Setor> buscarTodosSetores() {
        return setorRepository.findAll();
    }

    public void excluirSetor(Long id) {

        Optional<Setor> optionalSetor = buscarSetorPorId(id);

        if (!optionalSetor.isPresent()) {
            throw new IllegalArgumentException("Setor não encontrado");
        }

        setorRepository.deleteById(id);

    }

}
