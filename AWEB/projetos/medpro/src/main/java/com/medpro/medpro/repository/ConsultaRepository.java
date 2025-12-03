package com.medpro.medpro.repository;

import com.medpro.medpro.model.entity.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {

        @Query("""
                        select count(c) > 0 from Consulta c
                        where c.medico.id = :idMedico
                        and c.data > :horarioInicio
                        and c.data < :horarioFim
                        and c.motivoCancelamento is null
                        """)
        Boolean existsByMedicoIdAndDataConflict(Long idMedico, LocalDateTime horarioInicio, LocalDateTime horarioFim);

        @Query("""
                        select count(c) > 0 from Consulta c
                        where c.paciente.id = :idPaciente
                        and c.data between :primeiroHorario and :ultimoHorario
                        and c.motivoCancelamento is null
                        """)
        Boolean existsByPacienteIdAndDataBetween(Long idPaciente, LocalDateTime primeiroHorario,
                        LocalDateTime ultimoHorario);
}