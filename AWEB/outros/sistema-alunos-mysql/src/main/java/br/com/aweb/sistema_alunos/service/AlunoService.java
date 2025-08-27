package br.com.aweb.sistema_alunos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.aweb.sistema_alunos.model.Aluno;
import br.com.aweb.sistema_alunos.repository.AlunoRepository;

@Service
public class AlunoService {

    @Autowired
    AlunoRepository alunoRepository;

    // listar todosos alunos
    public List<Aluno> listAll() {
        return alunoRepository.findAll();
    }

    // buscar aluno por id
    public Aluno findAluno(Long id) {
        Optional<Aluno> aluno = alunoRepository.findById(id);
        if (aluno.isPresent()) {
            return aluno.get();
        }
        throw new RuntimeException("Aluno não encontrado!");
    }

    // Cadastrar/alterar aluno
    public Aluno createAluno(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    // remover aluno
    public void deleteAluno(Long id) {
        if (!alunoRepository.existsById(id)) {
            throw new RuntimeException("Erro ao remover aluno!");
        }
        alunoRepository.deleteById(id);
    }

    // buscar alunos por nome
    public List<Aluno> searchByNome(String nome) {
        return alunoRepository.findByNomeContainingIgnoreCase(nome);
    }

}
