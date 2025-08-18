package br.com.aweb.comment.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.aweb.comment.dto.commentDTO;

@RestController
@RequestMapping("/comment")
public class commentController {

    private Map<Long, commentDTO> commentList = new HashMap<>();
    private Long nextId = 1L;

    // criar comentario
    @PostMapping
    public commentDTO createComment(@RequestBody commentDTO comment) {
        comment.setId(nextId++);
        commentList.put(comment.getId(), comment);
        return comment;
    }

    // lista todos os comentarios
    @GetMapping
    public List<commentDTO> allComments(){
        return new ArrayList<>(commentList.values());
    }

    // buscar comentario por ID
    @GetMapping("/{id}")
    public commentDTO getCommentById(@PathVariable Long id) {
        return commentList.get(id);
    }

    // atualizar comentario mantendo o autor
    @PostMapping("/{id}")
    public commentDTO updateComment(
        @PathVariable Long id,
        @RequestBody commentDTO comment) {

            if (commentList.containsKey(id)) {
                comment.setId(id);
                commentList.put(id, comment);
            }
            return null;

    }

    // deleta comentario
    @DeleteMapping("/{id}")
    public String deleteComment(@PathVariable Long id) {
        if (commentList.remove(id) != null){
            return "Comentario deletado com sucesso";
        }
        return "Comentario não encontrado";
    }
    
}
