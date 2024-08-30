// Array de eventos com nome e data
const events = [
    { date: '2024-08-10', name: 'Conferencia Internacional' },
    { date: '2024-08-15', name: 'Reunião das Empreendedoras' },
    { date: '2024-08-23', name: 'Jantar BPW' }
];

// Função para obter o nome do mês por extenso
function getMonthName(monthIndex) {
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return monthNames[monthIndex];
}

// Variáveis para armazenar o mês e o ano corrente
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar(year, month) {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; // Limpa o calendário

    // Atualiza o título com o mês e ano
    const monthYear = document.getElementById('monthYear');
    monthYear.textContent = `${getMonthName(month)} ${year}`;

    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Cria espaços vazios para os dias antes do início do mês
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('day');
        calendar.appendChild(emptyDiv);
    }

    // Cria os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = date.toISOString().split('T')[0];
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = day;

        // Verifica se o dia tem evento
        const event = events.find(e => e.date === dateString);
        if (event) {
            dayDiv.classList.add('event');
            const eventNameDiv = document.createElement('div');
            eventNameDiv.classList.add('event-name');
            eventNameDiv.textContent = event.name;
            dayDiv.appendChild(eventNameDiv);
        }

        calendar.appendChild(dayDiv);
    }
}

// Funções para mudar de mês
function goToNextMonth() {
    currentMonth ++;
    if (currentMonth > 11) {
        currentMonth -= 12;
        currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
}

function goToPrevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
}

// Inicializa o calendário com o mês atual
generateCalendar(currentYear, currentMonth);

// Adiciona os eventos aos botões de navegação
document.getElementById('nextMonth').addEventListener('click', goToNextMonth);
document.getElementById('prevMonth').addEventListener('click', goToPrevMonth);