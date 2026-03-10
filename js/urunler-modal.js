document.addEventListener('DOMContentLoaded', function(){
  var openBtn = document.getElementById('open-urunler');
  var modal = document.getElementById('urunler-modal');
  if(!openBtn || !modal) return;
  var closeBtn = modal.querySelector('.modal-close');
  var overlay = modal.querySelector('.modal-overlay');

  function openModal(){ modal.style.display = 'block'; document.body.style.overflow = 'hidden'; }
  function closeModal(){ modal.style.display = 'none'; document.body.style.overflow = ''; }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeModal(); });
});
