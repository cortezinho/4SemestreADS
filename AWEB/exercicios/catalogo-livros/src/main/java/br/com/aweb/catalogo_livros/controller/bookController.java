package br.com.aweb.catalogo_livros.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.aweb.catalogo_livros.dto.bookDTO;


@RestController
@RequestMapping("/books")

public class bookController {

    private Map<Long, bookDTO> bookList = new HashMap<>();
    private Long nextId = 1L;

    // criar livro
    @PostMapping
    public bookDTO createBook(@RequestBody bookDTO book) {
        book.setId(nextId++);
        bookList.put(book.getId(), book);
        return book;
    }

    // atualizar livros
    @PutMapping("/{id}")
    public bookDTO updateBook(
        @PathVariable Long id,
        @RequestBody bookDTO book) {

        if (bookList.containsKey(id))
             book.setId(id);
             bookList.put(id, book);
        return null;
    }

    // buscar livro por id
    @GetMapping("/{id}")
    public bookDTO getBookById(@PathVariable Long id) {
        return bookList.get(id);
    }
    
}
