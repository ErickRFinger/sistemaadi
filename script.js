document.addEventListener('DOMContentLoaded', () => {
    const telefoneInput = document.getElementById('whatsapp');
    const form = document.getElementById('osForm');

    // MÁSCARA DE TELEFONE E WHATSAPP
    telefoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo o que não é dígito
        
        if (value.length > 11) {
            value = value.slice(0, 11); // Limita a 11 dígitos
        }
        
        let formatted = '';
        if (value.length > 0) {
            formatted = '(' + value.substring(0, 2);
        }
        if (value.length > 2) {
            formatted += ') ' + value.substring(2, 7);
        }
        if (value.length > 7) {
            formatted += '-' + value.substring(7, 11);
        }
        
        e.target.value = formatted;
    });

    // SUBMIT DO FORMULÁRIO E GERAÇÃO DA MENSAGEM
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Animação no botão para dar feedback visual
        const btn = document.getElementById('submitBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Gerando...</span><i class="ph ph-spinner-gap ph-spin"></i>';
        btn.style.pointerEvents = 'none';

        setTimeout(() => {
            // Coletar dados
            const solicitante = document.getElementById('solicitante').value.trim();
            const whatsappBruto = document.getElementById('whatsapp').value.trim();
            const cidade = document.getElementById('cidade').value.trim();
            const servico = document.getElementById('servico').value.trim();
            const atendente = document.getElementById('atendente').value.trim();
            const status = document.getElementById('status').value.trim();

            // Montar o texto idêntico ao solicitado pelo usuário
            const mensagem = 
`📋 *NOVA SOLICITAÇÃO DE ATENDIMENTO*

🔹 *Solicitante:* ${solicitante}
🔹 *WhatsApp:* ${whatsappBruto}
🔹 *Cidade:* ${cidade}
🔹 *Tipo de Serviço:* ${servico}
🔹 *Aberto por:* ${atendente}
🔹 *Status:* ${status}`;

            // Codificar a mensagem para URL
            const mensagemCodificada = encodeURIComponent(mensagem);

            // Redirecionar para o WhatsApp
            // A API de mensagem do WA abre a seleção de contatos se nenhum numero for passado.
            // Para PC costuma usar web.whatsapp.com, para celular o app nativo.
            // O link genérico abaixo lida com ambos.
            const urlWhatsApp = `https://api.whatsapp.com/send?text=${mensagemCodificada}`;
            
            // Abrir em nova aba
            window.open(urlWhatsApp, '_blank');

            // Restaurar botão
            btn.innerHTML = originalText;
            btn.style.pointerEvents = 'auto';
            
            // Opcional: Limpar formulário se desejar que fique pronto para uma nova OS
            // form.reset();
        }, 600); // 600ms para criar a sensação de processamento/carregamento (micro-interação)
    });
});
