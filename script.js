document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Mobile Navigation Toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.contains('is-open');
      siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', !isOpen);
    });
  }

  // --- 2. Dark Mode Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeToggle.setAttribute('aria-label', newTheme === 'dark' ? 'Light theme' : 'Dark theme');
      themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
    });
  }

  // --- 3. Tab System (Education & Certifications) ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // --- 4. Project Filtering Logic ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        card.classList.add('is-filtering');
        
        setTimeout(() => {
          if (filterValue === 'all' || filterValue === category) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
          setTimeout(() => card.classList.remove('is-filtering'), 50);
        }, 200);
      });
    });
  });

  // --- 5. Career Plot Timeline Builder ---
  const plotContainer = document.getElementById('plot');
  const plotChart = document.getElementById('plot-chart');

  if (plotContainer && plotChart) {
    // Find all elements with data-timeline
    const timelineItems = document.querySelectorAll('[data-timeline]');
    
    if (timelineItems.length > 0) {
      plotContainer.hidden = false;

      // Find min and max years
      let minYear = Infinity;
      let maxYear = -Infinity;

      timelineItems.forEach(item => {
        const startStr = item.getAttribute('data-start');
        const endStr = item.getAttribute('data-end');
        if (startStr) {
          const startY = parseInt(startStr.split('-')[0], 10);
          if (startY < minYear) minYear = startY;
        }
        if (endStr) {
          const endY = parseInt(endStr.split('-')[0], 10);
          if (endY > maxYear) maxYear = endY;
        }
      });

      const currentYear = new Date().getFullYear();
      if (maxYear < currentYear) maxYear = currentYear;
      if (minYear > currentYear) minYear = currentYear;
      
      const totalYears = maxYear - minYear;

      // Helper to calculate percentage from year
      const getPercent = (yearStr) => {
        if (!yearStr) return 0;
        const year = parseInt(yearStr.split('-')[0], 10);
        return ((year - minYear) / totalYears) * 100;
      };

      // Build Chart HTML
      let html = '';

      // 1. Axis (Top ticks)
      html += `<div class="plot__axis">`;
      for (let y = minYear; y <= maxYear; y++) {
        const left = ((y - minYear) / totalYears) * 100;
        // Only show every 1 or 2 years if space is tight
        const step = totalYears > 8 ? 2 : 1;
        if ((y - minYear) % step === 0 || y === maxYear) {
          html += `<span class="plot__tick" style="left: ${left}%;">${y}</span>`;
        }
      }
      // "Now" marker
      const nowPercent = ((currentYear - minYear) / totalYears) * 100;
      html += `<span class="plot__tick plot__tick--now" style="left: ${nowPercent}%; transform: translateX(-50%); padding-left: 0;">Now</span>`;
      html += `</div>`;

      // 2. Rows
      html += `<div class="plot__rows">`;
      
      // 2a. Background overlays (Grid lines + Now line)
      html += `<div class="plot__overlay">`;
      for (let y = minYear; y <= maxYear; y++) {
        const left = ((y - minYear) / totalYears) * 100;
        const step = totalYears > 8 ? 2 : 1;
        if ((y - minYear) % step === 0 || y === maxYear) {
          html += `<div class="plot__grid" style="left: ${left}%;"></div>`;
        }
      }
      html += `<div class="plot__nowline" style="left: ${nowPercent}%;"></div>`;
      html += `</div>`;

      // 2b. List of items
      html += `<div class="plot__list">`;
      
      // Sort items by start date descending (most recent first)
      const sortedItems = Array.from(timelineItems).sort((a, b) => {
        return new Date(b.getAttribute('data-start')) - new Date(a.getAttribute('data-start'));
      });

      sortedItems.forEach((item, index) => {
        const start = item.getAttribute('data-start');
        const end = item.getAttribute('data-end');
        const label = item.getAttribute('data-chart-label') || 'Untitled';
        const meta = item.getAttribute('data-chart-meta') || '';
        const id = item.id;
        const isEdu = item.classList.contains('edu__item');
        
        const left = getPercent(start);
        const right = getPercent(end);
        const width = Math.max(right - left, 1); // Ensure minimum visible width

        html += `
          <div class="plot__row">
            <a href="#${id}" class="plot__label">
              <span class="plot__org">${label}</span>
              ${meta ? `<span class="plot__meta">${meta}</span>` : ''}
            </a>
            <div class="plot__track">
              <div class="plot__bar ${isEdu ? 'plot__bar--edu' : ''} ${!end ? 'plot__bar--now' : ''}" 
                   style="left: ${left}%; width: ${width}%; --i: ${index};">
              </div>
            </div>
          </div>
        `;
      });

      html += `</div></div>`;
      
      plotChart.innerHTML = html;

      // Trigger animation after a tiny delay
      setTimeout(() => {
        plotContainer.classList.add('is-drawn');
      }, 100);
    }
  }
});