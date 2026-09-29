/**
 * FlowForge Application Initializer & Interactive Controller
 * Makes all options, tabs, filters, product switchers, and analytics interactive!
 */

(function () {
  'use strict';

  // Products Dataset
  const PRODUCTS_DATA = {
    'aquabottle': {
      title: 'AquaBottle',
      tagline: 'Next-generation hydration tracking ecosystem.',
      status: 'In Development',
      statusClass: 'bg-primary/20 text-primary border-primary/30',
      progress: 68,
      summary: 'AquaBottle is a smart hydration vessel that uses ultrasonic sensors to track water intake, syncing real-time data to a companion app via BLE. The goal is to create a seamless, non-intrusive habit-building tool for health-conscious professionals.',
      goals: [
        { text: 'Achieve 95% accuracy in volume measurement across varying temperatures.', done: true },
        { text: 'Ensure battery life exceeds 14 days under standard usage conditions.', done: true },
        { text: 'Finalize sustainable material sourcing for the outer shell.', done: false }
      ],
      team: [
        { name: 'Jane Doe', role: 'Product Lead', initials: 'JD', bg: 'bg-secondary-container text-on-secondary-container' },
        { name: 'Alex Smith', role: 'Hardware Engineer', initials: 'AS', bg: 'bg-tertiary-container text-on-tertiary-container' },
        { name: 'Maria Kim', role: 'UX Designer', initials: 'MK', bg: 'bg-primary-container text-on-primary-container' }
      ]
    },
    'novadesk': {
      title: 'NovaDesk',
      tagline: 'Ergonomic smart workspace with integrated posture telemetry.',
      status: 'Design Phase',
      statusClass: 'bg-secondary-container/50 text-on-secondary-container border-secondary/30',
      progress: 42,
      summary: 'NovaDesk combines height-adjustable pneumatics with ambient lighting and sit-stand reminder algorithms. Designed for modern remote teams seeking optimal ergonomics and desk analytics.',
      goals: [
        { text: 'Complete dual-motor motorization safety stress testing.', done: true },
        { text: 'Integrate touch control panel into bamboo desktop surface.', done: false },
        { text: 'Deploy cloud firmware update over Wi-Fi.', done: false }
      ],
      team: [
        { name: 'Liam Vance', role: 'Industrial Designer', initials: 'LV', bg: 'bg-primary-container text-on-primary-container' },
        { name: 'Sarah Chen', role: 'Firmware Engineer', initials: 'SC', bg: 'bg-tertiary-container text-on-tertiary-container' }
      ]
    },
    'flexpack': {
      title: 'FlexPack',
      tagline: 'Modular commuter backpack with integrated solar charging.',
      status: 'Research',
      statusClass: 'bg-primary/10 text-primary border-primary/20',
      progress: 25,
      summary: 'FlexPack features weather-proof modular compartments, anti-theft RFID shielding, and ultra-flexible solar cells for charging devices on the go.',
      goals: [
        { text: 'Source recycled ocean plastic fabric for main body.', done: true },
        { text: 'Test solar panel efficiency in overcast weather.', done: false }
      ],
      team: [
        { name: 'Elena Rostova', role: 'Materials Specialist', initials: 'ER', bg: 'bg-secondary-container text-on-secondary-container' },
        { name: 'David Miller', role: 'Product Manager', initials: 'DM', bg: 'bg-primary-container text-on-primary-container' }
      ]
    }
  };

  // Analytics Datasets per Time Range
  const ANALYTICS_DATA = {
    'Last 7 Days': {
      healthScore: 97,
      healthChange: '+3.1%',
      milestones: '4 / 4',
      milestonePercent: 100,
      velocity: '290',
      pipelines: [
        { title: 'Core API v2.0 Integration', progress: 85 },
        { title: 'User Dashboard Redesign', progress: 70 },
        { title: 'Payment Gateway Migration', progress: 95 }
      ]
    },
    'Last 30 Days': {
      healthScore: 94,
      healthChange: '+2.4%',
      milestones: '12 / 15',
      milestonePercent: 80,
      velocity: '248',
      pipelines: [
        { title: 'Core API v2.0 Integration', progress: 65 },
        { title: 'User Dashboard Redesign', progress: 40 },
        { title: 'Payment Gateway Migration', progress: 90 }
      ]
    },
    'Last 90 Days': {
      healthScore: 91,
      healthChange: '+1.8%',
      milestones: '28 / 35',
      milestonePercent: 80,
      velocity: '215',
      pipelines: [
        { title: 'Core API v2.0 Integration', progress: 50 },
        { title: 'User Dashboard Redesign', progress: 30 },
        { title: 'Payment Gateway Migration', progress: 80 }
      ]
    },
    'Year to Date': {
      healthScore: 89,
      healthChange: '+5.2%',
      milestones: '84 / 100',
      milestonePercent: 84,
      velocity: '230',
      pipelines: [
        { title: 'Core API v2.0 Integration', progress: 95 },
        { title: 'User Dashboard Redesign', progress: 90 },
        { title: 'Payment Gateway Migration', progress: 99 }
      ]
    }
  };

  // Global Navigation Routing Map
  const NAV_MAP = {
    'home': '../flowforge_home/code.html',
    'products': '../product_workspace/code.html',
    'product workspace': '../product_workspace/code.html',
    'roadmap': '../product_roadmap/code.html',
    'analytics': '../analytics_dashboard/code.html',
    'team': '../team_collaboration/code.html',
    'profile': '../user_profile/code.html',
    'about': '../about_flowforge/code.html'
  };

  // Toast Notification Component
  function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('flowforge-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'flowforge-toast-container';
      toastContainer.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    toast.style.cssText = `
      background: ${isSuccess ? 'rgba(10, 25, 47, 0.95)' : 'rgba(147, 0, 10, 0.95)'};
      color: #ffffff;
      padding: 12px 22px;
      border-radius: 9999px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 12px 30px rgba(0,0,0,0.35);
      border: 1px solid ${isSuccess ? '#00e5ff' : '#ffdad6'};
      display: flex;
      align-items: center;
      gap: 10px;
      pointer-events: auto;
      transform: translateY(20px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    toast.innerHTML = `
      <span style="color:${isSuccess ? '#00e5ff' : '#ffdad6'}; font-size:18px;">${isSuccess ? '✓' : '⚠️'}</span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateY(10px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Interactive Modal Component
  function createModal(title, contentHtml, onConfirm) {
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
      position: fixed; inset: 0; z-index: 9990;
      background: rgba(10, 25, 47, 0.75);
      backdrop-filter: blur(14px);
      display: flex; align-items: center; justify-content: center;
      padding: 20px; opacity: 0; transition: opacity 0.25s ease;
    `;

    const card = document.createElement('div');
    card.style.cssText = `
      background: #0d1e36; color: #f7f9fb;
      border: 1px solid rgba(0, 229, 255, 0.25);
      border-radius: 20px; width: 100%; max-width: 500px;
      padding: 28px; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
      transform: scale(0.95); transition: transform 0.25s ease;
      font-family: 'Inter', sans-serif;
    `;

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
        <h3 style="margin:0; font-family:'Manrope',sans-serif; font-size: 20px; font-weight:700; color:#00e5ff;">${title}</h3>
        <button id="modal-close-btn" style="background:none; border:none; color:#8e9aa8; font-size:20px; cursor:pointer; padding:4px;">✕</button>
      </div>
      <div style="margin-bottom: 24px;">${contentHtml}</div>
      <div style="display:flex; justify-content:flex-end; gap:12px;">
        <button id="modal-cancel-btn" style="background:rgba(255,255,255,0.08); border:none; color:#cfd9e8; padding:10px 20px; border-radius:9999px; font-weight:600; cursor:pointer;">Cancel</button>
        <button id="modal-confirm-btn" style="background:linear-gradient(90deg, #006875, #00e5ff); border:none; color:#ffffff; padding:10px 24px; border-radius:9999px; font-weight:700; cursor:pointer; box-shadow:0 0 15px rgba(0,229,255,0.4);">Save & Confirm</button>
      </div>
    `;

    backdrop.appendChild(card);
    document.body.appendChild(backdrop);

    requestAnimationFrame(() => {
      backdrop.style.opacity = '1';
      card.style.transform = 'scale(1)';
    });

    function closeModal() {
      backdrop.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      setTimeout(() => backdrop.remove(), 250);
    }

    card.querySelector('#modal-close-btn').onclick = closeModal;
    card.querySelector('#modal-cancel-btn').onclick = closeModal;
    card.querySelector('#modal-confirm-btn').onclick = async () => {
      if (onConfirm) await onConfirm(card);
      closeModal();
    };
  }

  // Bind Navigation Links
  function setupNavigation() {
    const currentPath = window.location.pathname.toLowerCase();

    document.querySelectorAll('a').forEach(anchor => {
      const text = anchor.textContent.trim().toLowerCase();

      for (const [key, targetUrl] of Object.entries(NAV_MAP)) {
        if (text === key || text.includes(key)) {
          anchor.href = targetUrl;
          const pageFolder = targetUrl.split('/')[1];
          if (currentPath.includes(pageFolder)) {
            anchor.classList.add('flowforge-nav-active');
          }
          break;
        }
      }
    });
  }

  // Initialize Product Workspace Interactivity
  function setupProductWorkspace() {
    if (!window.location.pathname.includes('product_workspace')) return;

    // 1. Setup Product Selector Switcher on Page Title
    const titleEl = document.querySelector('h2.font-headline-md');
    if (titleEl && !document.getElementById('product-selector-dropdown')) {
      const parentContainer = titleEl.parentElement;
      const selectorWrapper = document.createElement('div');
      selectorWrapper.className = 'flex items-center gap-2 mb-2';

      const select = document.createElement('select');
      select.id = 'product-selector-dropdown';
      select.className = 'bg-surface-container-low text-on-surface font-headline-md text-headline-md font-bold border border-outline-variant/40 rounded-xl px-3 py-1 cursor-pointer focus:outline-none focus:border-primary';
      select.innerHTML = `
        <option value="aquabottle" selected>AquaBottle</option>
        <option value="novadesk">NovaDesk</option>
        <option value="flexpack">FlexPack</option>
      `;

      select.addEventListener('change', (e) => {
        const prodKey = e.target.value;
        renderProductData(prodKey);
        showToast(`Switched workspace to ${PRODUCTS_DATA[prodKey].title}`);
      });

      titleEl.replaceWith(select);
    }

    function renderProductData(key) {
      const data = PRODUCTS_DATA[key];
      if (!data) return;

      // Update Tagline
      const taglineEl = document.querySelector('p.font-body-md.text-on-surface-variant');
      if (taglineEl) taglineEl.textContent = data.tagline;

      // Update Progress Bar
      const progressPercentEl = document.querySelector('.w-64 .text-primary, .w-full .text-primary');
      if (progressPercentEl) progressPercentEl.textContent = `${data.progress}%`;

      const progressFill = document.querySelector('.wave-progress-fill, .wave-progress-bar');
      if (progressFill) progressFill.style.width = `${data.progress}%`;

      // Update Summary Text
      const summaryTextEl = document.querySelector('.glass-card p.font-body-md');
      if (summaryTextEl) summaryTextEl.textContent = data.summary;

      // Update Primary Goals
      const goalsListEl = document.querySelector('.glass-card ul.space-y-2');
      if (goalsListEl) {
        goalsListEl.innerHTML = data.goals.map((g, idx) => `
          <li class="flex items-start gap-2 cursor-pointer goal-item" data-idx="${idx}">
            <span class="material-symbols-outlined ${g.done ? 'text-primary' : 'text-outline'} text-[18px] mt-0.5" style="font-variation-settings: 'FILL' ${g.done ? 1 : 0};">
              ${g.done ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            <span class="font-body-md text-body-md text-on-surface-variant ${g.done ? 'line-through opacity-80' : ''}">${g.text}</span>
          </li>
        `).join('');

        // Bind interactive checkbox toggles
        goalsListEl.querySelectorAll('.goal-item').forEach(item => {
          item.onclick = () => {
            const idx = item.getAttribute('data-idx');
            data.goals[idx].done = !data.goals[idx].done;
            renderProductData(key);
            showToast(`Goal updated for ${data.title}`);
          };
        });
      }
    }

    // 2. Setup Horizontal Workspace Tabs ("Overview", "Research", "Requirements", etc.)
    const tabLinks = document.querySelectorAll('nav.flex.gap-6.min-w-max a');
    tabLinks.forEach(tab => {
      tab.onclick = (e) => {
        e.preventDefault();
        tabLinks.forEach(t => {
          t.className = 'pb-3 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-label-bold text-label-bold px-1 transition-colors';
        });
        tab.className = 'pb-3 border-b-2 border-primary text-primary font-label-bold text-label-bold px-1';
        showToast(`Switched view to ${tab.textContent.trim()}`);
      };
    });
  }

  // Initialize Analytics Dashboard Interactivity
  function setupAnalyticsDashboard() {
    if (!window.location.pathname.includes('analytics_dashboard')) return;

    // 1. Date Filter Dropdown Selector
    const datePill = document.querySelector('.flex.items-center.bg-white.border.border-outline-variant.rounded-full');
    if (datePill && !document.getElementById('analytics-time-select')) {
      const select = document.createElement('select');
      select.id = 'analytics-time-select';
      select.className = 'bg-transparent text-on-surface font-label-bold text-caption cursor-pointer focus:outline-none pr-2';
      select.innerHTML = `
        <option value="Last 7 Days">Last 7 Days</option>
        <option value="Last 30 Days" selected>Last 30 Days</option>
        <option value="Last 90 Days">Last 90 Days</option>
        <option value="Year to Date">Year to Date</option>
      `;

      datePill.innerHTML = `
        <span class="material-symbols-outlined text-on-surface-variant text-sm mr-2" data-icon="calendar_today">calendar_today</span>
      `;
      datePill.appendChild(select);

      select.addEventListener('change', (e) => {
        const timeRange = e.target.value;
        updateAnalyticsData(timeRange);
        showToast(`Recalculated analytics for ${timeRange}`);
      });
    }

    function updateAnalyticsData(range) {
      const data = ANALYTICS_DATA[range] || ANALYTICS_DATA['Last 30 Days'];

      // Health Score
      const healthScoreEl = document.querySelector('.font-display-lg.text-on-surface');
      if (healthScoreEl) healthScoreEl.textContent = data.healthScore;

      const healthChangeEl = document.querySelector('.bg-surface-tint\\/10 span.font-bold');
      if (healthChangeEl) healthChangeEl.textContent = data.healthChange;

      // Milestones
      const milestonesEl = document.querySelector('.font-headline-md.text-on-surface');
      if (milestonesEl) milestonesEl.innerHTML = `${data.milestones} <span class="text-sm font-normal text-on-surface-variant">complete</span>`;

      // Velocity
      const velocityEl = document.querySelector('.font-headline-md.text-headline-md-mobile.text-on-surface');
      if (velocityEl) velocityEl.innerHTML = `${data.velocity} <span class="font-body-md text-sm text-on-surface-variant">tasks/wk</span>`;

      // Pipelines Progress Bars
      const pipelineContainers = document.querySelectorAll('.space-y-6 > div');
      data.pipelines.forEach((p, idx) => {
        if (pipelineContainers[idx]) {
          const titleSpan = pipelineContainers[idx].querySelector('span.font-medium');
          const percentSpan = pipelineContainers[idx].querySelector('span.text-xs');
          const progressBar = pipelineContainers[idx].querySelector('.wave-progress-bar');

          if (titleSpan) titleSpan.textContent = p.title;
          if (percentSpan) percentSpan.textContent = `${p.progress}%`;
          if (progressBar) progressBar.style.width = `${p.progress}%`;
        }
      });
    }

    // 2. Interactive "New Report" Modal
    const newReportBtn = document.querySelector('button:has(span[data-icon="add"]), button:has(span:contains("New Report"))') || document.querySelector('aside button');
    if (newReportBtn) {
      newReportBtn.onclick = (e) => {
        e.preventDefault();
        createModal('Generate Custom Report', `
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <label style="display:block; font-size:12px; color:#8e9aa8; margin-bottom:6px; font-weight:600;">Report Type</label>
              <select id="rep-type" style="width:100%; background:#0d1e36; border:1px solid rgba(255,255,255,0.15); border-radius:10px; padding:10px; color:#fff; font-size:14px;">
                <option>Executive Summary</option>
                <option>Pipeline Velocity & Bottlenecks</option>
                <option>Team Capacity & Workload</option>
                <option>User Feedback & NPS Analysis</option>
              </select>
            </div>
            <div>
              <label style="display:block; font-size:12px; color:#8e9aa8; margin-bottom:6px; font-weight:600;">Export Format</label>
              <div style="display:flex; gap:12px;">
                <label style="color:#fff; font-size:14px;"><input type="radio" name="fmt" value="PDF" checked> PDF Document</label>
                <label style="color:#fff; font-size:14px;"><input type="radio" name="fmt" value="CSV"> CSV Spreadsheet</label>
              </div>
            </div>
          </div>
        `, (card) => {
          const type = card.querySelector('#rep-type').value;
          showToast(`Report "${type}" generated and downloading...`);
        });
      };
    }
  }

  // Setup Global Click Listener for Buttons
  function setupActionButtons() {
    document.addEventListener('click', async (e) => {
      const target = e.target.closest('button, a.btn');
      if (!target) return;

      const text = target.textContent.trim().toLowerCase();

      // New Product / Project
      if (text.includes('new product') || text.includes('new project') || text.includes('add circle')) {
        e.preventDefault();
        createModal('Create New Product', `
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <label style="display:block; font-size:12px; color:#8e9aa8; margin-bottom:6px; font-weight:600;">Product Title</label>
              <input id="inp-prod-title" type="text" placeholder="e.g. HydroPulse Sensor" style="width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); border-radius:10px; padding:10px 14px; color:#fff; font-size:14px;">
            </div>
            <div>
              <label style="display:block; font-size:12px; color:#8e9aa8; margin-bottom:6px; font-weight:600;">Team Members Count</label>
              <input id="inp-team-count" type="number" value="4" style="width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); border-radius:10px; padding:10px 14px; color:#fff; font-size:14px;">
            </div>
          </div>
        `, async (card) => {
          const title = card.querySelector('#inp-prod-title').value.trim() || 'New FlowForge Product';
          const teamCount = card.querySelector('#inp-team-count').value || 3;
          if (window.FlowForgeClient) {
            await window.FlowForgeClient.createProject(title, parseInt(teamCount));
          }
          showToast(`Product "${title}" created successfully!`);
        });
        return;
      }

      // Invite Team Member
      if (text.includes('invite team') || text.includes('add member') || text.includes('manage team')) {
        e.preventDefault();
        createModal('Invite Squad Member', `
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <label style="display:block; font-size:12px; color:#8e9aa8; margin-bottom:6px; font-weight:600;">Member Email</label>
              <input id="inp-member-email" type="email" placeholder="colleague@flowforge.io" style="width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); border-radius:10px; padding:10px 14px; color:#fff; font-size:14px;">
            </div>
            <div>
              <label style="display:block; font-size:12px; color:#8e9aa8; margin-bottom:6px; font-weight:600;">Role</label>
              <select id="inp-member-role" style="width:100%; background:#0d1e36; border:1px solid rgba(255,255,255,0.15); border-radius:10px; padding:10px 14px; color:#fff; font-size:14px;">
                <option>Product Manager</option>
                <option>Hardware Engineer</option>
                <option>UX Designer</option>
                <option>Data Analyst</option>
              </select>
            </div>
          </div>
        `, async (card) => {
          const email = card.querySelector('#inp-member-email').value || 'new.member@flowforge.io';
          if (window.FlowForgeClient) {
            await window.FlowForgeClient.addActivity(`Invited ${email} to squad`);
          }
          showToast(`Invitation sent to ${email}`);
        });
        return;
      }
    });
  }

  // DOM Content Loaded Handler
  function init() {
    setupNavigation();
    setupProductWorkspace();
    setupAnalyticsDashboard();
    setupActionButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.FlowForgeApp = {
    showToast,
    createModal,
    PRODUCTS_DATA,
    ANALYTICS_DATA
  };
})();
