const holidays = {
  '01-01': 'Confraternização Universal',
  '02-25': 'Carnaval',
  '02-26': 'Carnaval',
  '04-01': 'Sexta-feira Santa',
  '04-21': 'Tiradentes',
  '05-01': 'Dia do Trabalho',
  '06-15': 'Corpus Christi',
  '09-07': 'Independência do Brasil',
  '10-12': 'Nossa Senhora Aparecida',
  '11-02': 'Finados',
  '11-15': 'Proclamação da República',
  '12-25': 'Natal',
};

document.addEventListener('DOMContentLoaded', () => {
  const calendarContainer = document.getElementById('calendar');
  const firstDay = new Date('2023-01-01');
  const lastDay = new Date('2023-12-31');

  let currentMonth = null;
  let monthContainer = null;

  for (let day = new Date(firstDay); day <= lastDay; day.setDate(day.getDate() + 1)) {
    const month = day.getMonth() + 1;

    if (month !== currentMonth) {
      currentMonth = month;
      monthContainer = document.createElement('div');
      monthContainer.classList.add('month');
      const monthTitle = document.createElement('div');
      monthTitle.classList.add('month-title');
      monthTitle.textContent = `${month.toString().padStart(2, '0')}/2023`;
      monthContainer.appendChild(monthTitle);
      calendarContainer.appendChild(monthContainer);
    }

    const dayElement = document.createElement('div');
    dayElement.classList.add('day');

    const dayOfMonth = day.getDate();
    const monthDayKey = `${month.toString().padStart(2, '0')}-${dayOfMonth.toString().padStart(2, '0')}`;

    dayElement.textContent = dayOfMonth;

    if (day.getDay() === 0 || day.getDay() === 6) {
      dayElement.classList.add('weekend');
    }

    if (holidays[monthDayKey]) {
      dayElement.classList.add('holiday');
      dayElement.title = holidays[monthDayKey];
      dayElement.addEventListener('click', () => showNotification(holidays[monthDayKey]));
    }

    monthContainer.appendChild(dayElement);
  }
});

function showNotification(holidayName) {
  if (Notification.permission === 'granted') {
    new Notification(`Feriado: ${holidayName}`, {
      icon: 'path/to/your/icon.png', // Alterar o caminho para o icone de notificacao
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showNotification(holidayName);
      }
    });
  }
}
