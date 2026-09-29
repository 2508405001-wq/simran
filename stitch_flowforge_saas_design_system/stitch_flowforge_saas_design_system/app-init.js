/**
 * FlowForge Application Initializer & Global Navigation Handler
 * Fixes navigation links across all pages, handles interactive actions,
 * and connects UI elements to FlowForgeClient.
 */

(function () {
  'use strict';

  // Navigation mapping relative to page directories
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

  // Toast Notification System
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
      padding: 12px 20px;
      border-radius: 9999px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
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
    }, 3500);
  }

  // Interactive Modal System
  function createModal(title, contentHtml, onConfirm) {
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
      position: fixed; inset: 0; z-index: 9990;
      background: rgba(10, 25, 47, 0.7);
      backdrop-filter: blur(12px);
      display: flex; align-items: center; justify-content: center;
      padding: 20px; opacity: 0; transition: opacity 0.25s ease;
    `;

    const card = document.createElement('div');
    card.style.cssText = `
      background: #0d1e36; color: #f7f9fb;
      border: 1px solid rgba(0, 229, 255, 0.2);
      border-radius: 20px; width: 100%; max-width: 480px;
      padding: 28px; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
      transform: scale(0.95); transition: transform 0.25s ease;
      font-family: 'Inter', sans-serif;
    `;

    card.innerHTML = `
      <div style="display:flex; justify-between; align-items:center; margin-bottom: 20px;">
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

    // Fix brand header logos
    document.querySelectorAll('h1, span, a').forEach(el => {
      if (el.textContent.trim() === 'FlowForge' && el.tagName === 'A') {
        el.href = NAV_MAP['home'];
      }
    });

    // Fix anchor tags
    document.querySelectorAll('a').forEach(anchor => {
      const text = anchor.textContent.trim().toLowerCase();
      const href = anchor.getAttribute('href');

      for (const [key, targetUrl] of Object.entries(NAV_MAP)) {
        if (text === key || text.includes(key)) {
          anchor.href = targetUrl;

          // Apply active highlight if current path matches
          const pageFolder = targetUrl.split('/')[1];
          if (currentPath.includes(pageFolder)) {
            anchor.classList.add('flowforge-nav-active');
            if (anchor.classList.contains('text-surface-variant') || anchor.classList.contains('text-on-surface-variant')) {
              anchor.classList.remove('text-surface-variant', 'text-on-surface-variant', 'opacity-70');
              anchor.classList.add('text-primary-container', 'font-bold');
            }
          }
          break;
        }
      }
    });
  }

  // Setup Global Action Buttons
  function setupActionButtons() {
    document.addEventListener('click', async (e) => {
      const target = e.target.closest('button, a.btn');
      if (!target) return;

      const text = target.textContent.trim().toLowerCase();

      // New Product / Project
      if (text.includes('new product') || text.includes('new project') || text.includes('add product')) {
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
      if (text.includes('invite team') || text.includes('add member')) {
        e.preventDefault();
        createModal('Invite Team Member', `
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

      // Edit Profile
      if (text.includes('edit profile')) {
        e.preventDefault();
        createModal('Edit Profile Information', `
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <label style="display:block; font-size:12px; color:#8e9aa8; margin-bottom:6px; font-weight:600;">Full Name</label>
              <input id="inp-user-name" type="text" value="Alex Morgan" style="width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); border-radius:10px; padding:10px 14px; color:#fff; font-size:14px;">
            </div>
            <div>
              <label style="display:block; font-size:12px; color:#8e9aa8; margin-bottom:6px; font-weight:600;">Email</label>
              <input id="inp-user-email" type="email" value="alex.morgan@flowlabs.io" style="width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); border-radius:10px; padding:10px 14px; color:#fff; font-size:14px;">
            </div>
          </div>
        `, async (card) => {
          const name = card.querySelector('#inp-user-name').value;
          const email = card.querySelector('#inp-user-email').value;
          if (window.FlowForgeClient) {
            await window.FlowForgeClient.updateUserProfile({ name, email });
          }
          showToast('Profile updated successfully!');
        });
        return;
      }

      // View Pipeline / Filters / Upvote
      if (text.includes('view pipeline')) {
        e.preventDefault();
        window.location.href = NAV_MAP['products'];
        return;
      }

      if (text.includes('upvote') || target.closest('[data-vote]')) {
        e.preventDefault();
        showToast('Feature upvoted!');
        return;
      }
    });
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupNavigation();
      setupActionButtons();
    });
  } else {
    setupNavigation();
    setupActionButtons();
  }

  window.FlowForgeApp = {
    showToast,
    createModal
  };
})();
