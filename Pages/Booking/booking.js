const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      return;
    }

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const sessionDate = document.getElementById('sessionDate').value;
    const details = document.getElementById('details').value.trim();

    const confirmationData = {
      reference: generateBookingReference(),
      firstName,
      lastName,
      email,
      phone,
      sessionDate,
      details,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem('bookingConfirmation', JSON.stringify(confirmationData));
    window.location.href = 'Booking confirmation.html';
  });
}

function generateBookingReference() {
  const prefix = 'ACDVOI';
  // Generate random 10-digit number
  let randomNumbers = '';
  for (let i = 0; i < 10; i++) {
    randomNumbers += Math.floor(Math.random() * 10);
  }
  return prefix + randomNumbers;
}

const calendarPopup = document.getElementById('calendarPopup');
const sessionDateInput = document.getElementById('sessionDateInput');
const sessionDateHidden = document.getElementById('sessionDate');

if (calendarPopup && sessionDateInput && sessionDateHidden) {
  let currentDate = new Date();
  let selectedDate = null;

  function buildCalendar(date) {
    calendarPopup.innerHTML = '';
    const year = date.getFullYear();
    const month = date.getMonth();

    const header = document.createElement('div');
    header.className = 'calendar-header';
    header.innerHTML = `
      <button type="button" id="prevMonth" aria-label="Previous month">◀</button>
      <div class="calendar-title">${date.toLocaleString('default', { month: 'long' })} ${year}</div>
      <button type="button" id="nextMonth" aria-label="Next month">▶</button>
    `;
    calendarPopup.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'calendar-grid';

    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach((dow) => {
      const label = document.createElement('span');
      label.textContent = dow;
      grid.appendChild(label);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    for (let blank = 0; blank < firstDay; blank += 1) {
      const placeholder = document.createElement('span');
      grid.appendChild(placeholder);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = day;
      const buttonDate = new Date(year, month, day);

      if (selectedDate && buttonDate.toDateString() === selectedDate.toDateString()) {
        button.classList.add('selected');
      }

      if (buttonDate.toDateString() === today.toDateString()) {
        button.classList.add('today');
      }

      button.addEventListener('click', () => {
        selectedDate = buttonDate;
        sessionDateInput.value = buttonDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        sessionDateHidden.value = buttonDate.toISOString().slice(0, 10);
        updateCalendarSelection();
        hideCalendar();
      });

      grid.appendChild(button);
    }

    calendarPopup.appendChild(grid);

    document.getElementById('prevMonth').addEventListener('click', () => {
      currentDate = new Date(year, month - 1, 1);
      buildCalendar(currentDate);
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
      currentDate = new Date(year, month + 1, 1);
      buildCalendar(currentDate);
    });
  }

  function updateCalendarSelection() {
    const buttons = calendarPopup.querySelectorAll('button');
    buttons.forEach((button) => {
      button.classList.toggle('selected', selectedDate && Number(button.textContent) === selectedDate.getDate() && currentDate.getMonth() === selectedDate.getMonth() && currentDate.getFullYear() === selectedDate.getFullYear());
    });
  }

  function showCalendar() {
    calendarPopup.classList.add('visible');
  }

  function hideCalendar() {
    calendarPopup.classList.remove('visible');
  }

  sessionDateInput.addEventListener('click', (event) => {
    event.stopPropagation();
    buildCalendar(currentDate);
    showCalendar();
  });

  document.addEventListener('click', (event) => {
    if (!calendarPopup.contains(event.target) && event.target !== sessionDateInput) {
      hideCalendar();
    }
  });

  sessionDateInput.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter') {
      event.preventDefault();
      buildCalendar(currentDate);
      showCalendar();
    }
  });
}
