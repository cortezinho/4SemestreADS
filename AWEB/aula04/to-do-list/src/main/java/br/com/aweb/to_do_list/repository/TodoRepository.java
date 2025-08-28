package br.com.aweb.to_do_list.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.aweb.to_do_list.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
