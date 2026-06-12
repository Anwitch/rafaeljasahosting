/* ═══════════════════════════════════════════════════════════
   3. TOAST
═══════════════════════════════════════════════════════════ */
const Toast = {
  _show(msg,type){ const c=document.getElementById('toasts'),el=document.createElement('div');
    el.className=`toast ${type}`;el.innerHTML=`<span>${{success:'✓',error:'✕',info:'ℹ'}[type]||'ℹ'}</span>${H.esc(msg)}`;
    c.appendChild(el);setTimeout(()=>{el.classList.add('out');el.addEventListener('animationend',()=>el.remove(),{once:true})},2800); },
  success: m=>Toast._show(m,'success'), error: m=>Toast._show(m,'error'), info: m=>Toast._show(m,'info'),
};
