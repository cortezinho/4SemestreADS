package br.com.aweb.sistema_alunos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.aweb.sistema_alunos.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    
}
