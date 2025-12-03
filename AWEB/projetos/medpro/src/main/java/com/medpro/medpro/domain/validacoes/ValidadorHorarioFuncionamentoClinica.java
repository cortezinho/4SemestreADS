package com.medpro.medpro.domain.validacoes;

import java.time.DayOfWeek;

import org.springframework.stereotype.Component;

import com.medpro.medpro.infra.execption.ValidacaoException;
import com.medpro.medpro.model.dto.DadosAgendamentoConsulta;

@Component
public class ValidadorHorarioFuncionamentoClinica implements ValidadorAgendamentoDeConsulta {

    public void validar(DadosAgendamentoConsulta dados) {
        var dataConsulta = dados.data();
        var hora = dataConsulta.getHour();
        var minuto = dataConsulta.getMinute();

        // Limita a marcação de consultas por horário (7h às 19h)
        // Se for 19h ou mais, erro. Se for antes das 7h, erro.
        if (hora < 7 || hora > 18) {
            throw new ValidacaoException("Consulta fora do horário de funcionamento da clínica (07:00 às 19:00)");
        }
        
        // Limitação em minutos, evitando que consultas que ultrapassem às 19:00 sejam marcadas
        // Ex: 18:30 não pode, pois acabaria 19:30. Apenas 18:00 cravado é permitido (acaba 19:00).
        if (hora == 18) {
            if (minuto != 0){
                throw new ValidacaoException("Consulta fora do horário de funcionamento da clínica (07:00 às 19:00)");
            }
        }

        var domingo = dataConsulta.getDayOfWeek().equals(DayOfWeek.SUNDAY);
        if (domingo) {
            throw new ValidacaoException("A clínica não funciona aos domingos!");
        }
    }
}