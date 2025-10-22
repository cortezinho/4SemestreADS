// Espera o conteúdo do HTML ser carregado
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA O MODAL DE MENSAGEM DE SUCESSO (JÁ EXISTENTE) ---
    const successModal = document.getElementById('modal-container');
    if (successModal) {
        setTimeout(() => {
            successModal.classList.add('modal-hidden');
            setTimeout(() => {
                successModal.remove();
            }, 400);
        }, 3000);
    }

    // --- NOVA LÓGICA PARA O MODAL DE SELEÇÃO DE SETOR ---
    const openModalBtn = document.getElementById('btn-nova-avaliacao');
    const sectorModal = document.getElementById('sector-modal');
    const cancelModalBtn = document.getElementById('btn-cancelar-modal');
    const confirmModalBtn = document.getElementById('btn-confirmar-modal');
    const sectorSelect = document.getElementById('sector-select');
    const sectorError = document.getElementById('sector-error');

    // Garante que os elementos da home existem antes de adicionar os listeners
    if (openModalBtn && sectorModal) {
        
        // Abre o modal ao clicar em "Nova Avaliação"
        openModalBtn.addEventListener('click', () => {
            sectorModal.classList.remove('modal-hidden');
        });

        // Fecha o modal ao clicar em "Cancelar"
        cancelModalBtn.addEventListener('click', () => {
            sectorModal.classList.add('modal-hidden');
            sectorError.style.display = 'none'; // Esconde o erro
        });

        // Ação de confirmar a seleção do setor
        confirmModalBtn.addEventListener('click', () => {
            const selectedSectorId = sectorSelect.value;
            
            // Verifica se um setor foi selecionado
            if (selectedSectorId) {
                // Redireciona para a página de avaliação do setor escolhido
                window.location.href = `/avaliar/${selectedSectorId}`;
            } else {
                // Mostra a mensagem de erro se nenhum setor for selecionado
                sectorError.style.display = 'block';
            }
        });
    }
});