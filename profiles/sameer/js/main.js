document.addEventListener('DOMContentLoaded', ()=>{
  const copyBtn = document.getElementById('copyEmail');
  const hireBtn = document.getElementById('hireBtn');
  const email = 'sameer@example.com'; // replace with real email

  copyBtn.addEventListener('click', async ()=>{
    try{
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = '✅ Copied';
      setTimeout(()=> copyBtn.textContent = '📋 Copy Email', 2000);
    }catch(e){
      // fallback
      const ta = document.createElement('textarea');
      ta.value = email; document.body.appendChild(ta); ta.select();
      try{ document.execCommand('copy'); copyBtn.textContent='✅ Copied' }catch(err){ alert('Copy failed') }
      ta.remove(); setTimeout(()=> copyBtn.textContent = '📋 Copy Email', 2000);
    }
  });

  hireBtn.addEventListener('click', ()=>{
    // simple CTA — open mail client
    window.location.href = `mailto:${email}?subject=Opportunity`;
  });
});
