package com.medpro.medpro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medpro.medpro.model.dto.DadosCadastroMedico;
import com.medpro.medpro.model.dto.DadosListagemMedico;
import com.medpro.medpro.model.entity.Medico;
import com.medpro.medpro.repository.MedicoRepository;

import jakarta.transaction.Transactional;


@RestController
@RequestMapping("medicos")
public class MedicoController {
    
    @Autowired
    private MedicoRepository medicoRepository;

    @PostMapping("/cadastro")
    @Transactional
    public void cadastrar(@RequestBody DadosCadastroMedico dados){
        medicoRepository.save(new Medico(dados));
    }

    @GetMapping
    public Page<DadosListagemMedico> listar(Pageable paginacao) {
        return medicoRepository.findAll(paginacao).map(DadosListagemMedico::new);
    }
    
}
