package br.com.aweb.to_do_list.controller;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.ModelAndView;

import br.com.aweb.to_do_list.model.Todo;
import br.com.aweb.to_do_list.repository.TodoRepository;
import jakarta.validation.Valid;

@Controller
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    TodoRepository todoRepository;

    // @GetMapping("/home")
    // public ModelAndView home() {
    // var modelAndView = new ModelAndView("home");
    // modelAndView.addObject("professor", "Cortez Roberto da Silva");
    // var alunos = List.of(
    // "Isaac Newtom",
    // "Albert Einstein",
    // "Marie Curie",
    // "Nikola Tesla");
    // modelAndView.addObject("alunos", alunos);
    // modelAndView.addObject("ehVerdade", true);
    // return modelAndView;
    // }

    @GetMapping
    public ModelAndView list() {
        // var modelAndView = new ModelAndView("list");
        // modelAndView.addObject("todos", todoRepository.findAll());
        // return modelAndView;

        // return new ModelAndView("list", Map.of("todos", todoRepository.findAll()));

        return new ModelAndView("list", Map.of("todos",
                todoRepository.findAll(Sort.by("deadline"))));
    }

    @GetMapping("/create")
    public ModelAndView create() {
        return new ModelAndView("form", Map.of("todo", new Todo()));
    }

    @PostMapping("/create")
    public String create(@Valid Todo todo, BindingResult result) {
        if (result.hasErrors()) {
            return "form";
        }
        todoRepository.save(todo);
        return "redirect:/todo";
    }

    @GetMapping("/edit/{id}")
    public ModelAndView edit(@PathVariable Long id) {
        Optional<Todo> todo = todoRepository.findById(id);
        if (todo.isPresent() && todo.get().getFinishedAt() == null) {
            return new ModelAndView("form", Map.of("todo", todo.get()));
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);

    }

    @PostMapping("/edit/{id}")
    public String edit(@Valid Todo todo, BindingResult result) {
        if (result.hasErrors()) {
            return "form";
        }
        todoRepository.save(todo);
        return "redirect:/todo";
    }

    @GetMapping("/delete/{id}")
    public ModelAndView delete(@PathVariable Long id) {
        Optional<Todo> todo = todoRepository.findById(id);
        if (todo.isPresent()) {
            return new ModelAndView("delete", Map.of("todo", todo.get()));
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);

    }

    @PostMapping("/delete/{id}")
    public String delete(Todo todo) {
        todoRepository.delete(todo);
        return "redirect:/todo";
    }

    @PostMapping("/finish/{id}")
    public String finish(@PathVariable Long id) {
        var optionalTodo = todoRepository.findById(id);
        if (optionalTodo.isPresent() && optionalTodo.get().getFinishedAt() == null) {
            var todo = optionalTodo.get();
            todo.setFinishedAt(LocalDate.now());
            todoRepository.save(todo);
            return "redirect:/todo";
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

}
