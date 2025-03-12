const horarios = ['09:00', '09:30', '10:00', '10:30', '11:00', '11,30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
        const agendamentos = [];

        const selectHorarios = document.getElementById('horarios');
        const listaAgendamentos = document.getElementById('listaAgendamentos');
        const formAgendamento = document.getElementById('formAgendamento');
        const dataInput = document.getElementById('data');

        function atualizarHorariosDisponiveis() {
            selectHorarios.innerHTML = '<option value="">Selecione um horário</option>';
            const horariosDisponiveis = horarios.filter(horario => 
                !agendamentos.some(agendamento => agendamento.data === dataInput.value && agendamento.horario === horario)
            );
            horariosDisponiveis.forEach(horario => {
                const option = document.createElement('option');
                option.value = horario;
                option.textContent = horario;
                selectHorarios.appendChild(option);
            });
        }

        function atualizarListaAgendamentos() {
            listaAgendamentos.innerHTML = '';
            agendamentos.forEach(agendamento => {
                const tr = document.createElement('tr');
                const dataFormatada = new Date(agendamento.data).toLocaleDateString('pt-BR');
                tr.innerHTML = `
                    <td>${dataFormatada}</td>
                    <td>${agendamento.horario}</td>
                    <td>${agendamento.cliente}</td>
                    <td>${agendamento.tipoCorte}</td>
                    <td>${agendamento.pagamento}</td>
                `;
                listaAgendamentos.appendChild(tr);
            });
        }

        function enviarWhatsApp(agendamento) {
            const telefoneBarbearia = "+5585994015283"; // Substitua pelo número da barbearia com DDD
            const dataFormatada = new Date(agendamento.data).toLocaleDateString('pt-BR');
            const mensagem = `👋 Olá, gostaria de confirmar um agendamento!%0A📅 *Data:* ${dataFormatada}%0A⏰ *Horário:* ${agendamento.horario}%0A💇‍♂️ *Tipo de Corte:* ${agendamento.tipoCorte}%0A💳 *Forma de Pagamento:* ${agendamento.pagamento}%0A👤 *Cliente:* ${agendamento.cliente}`;
            const linkWhatsApp = `https://wa.me/${telefoneBarbearia}?text=${mensagem}`;
            window.open(linkWhatsApp, '_blank');
        }

        formAgendamento.addEventListener('submit', (event) => {
            event.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const dataSelecionada = dataInput.value;
            const horarioSelecionado = selectHorarios.value;
            const tipoCorteSelecionado = document.getElementById('tipoCorte').value;
            const pagamentoSelecionado = document.getElementById('pagamento').value;

            if (!nome || !dataSelecionada || !horarioSelecionado || !tipoCorteSelecionado || !pagamentoSelecionado) {
                alert('Preencha todos os campos!');
                return;
            }

            const novoAgendamento = { data: dataSelecionada, horario: horarioSelecionado, cliente: nome, tipoCorte: tipoCorteSelecionado, pagamento: pagamentoSelecionado };
            agendamentos.push(novoAgendamento);

            atualizarHorariosDisponiveis();
            atualizarListaAgendamentos();
            alert('Agendamento realizado com sucesso!');
            enviarWhatsApp(novoAgendamento);
        });

        dataInput.addEventListener('change', atualizarHorariosDisponiveis);
        atualizarHorariosDisponiveis();
