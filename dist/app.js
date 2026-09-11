const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  menu.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('open', expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('open');
}));
const dialog = document.querySelector('#info-dialog');
const title = document.querySelector('#dialog-title');
const content = document.querySelector('#dialog-content');
const care = {
  general: { title: 'The everyday essentials.', body: '<p>General dental care begins with understanding your teeth and gums. A consultation can help you discuss:</p><ul><li>Routine dental examinations and cleaning</li><li>Questions about your teeth and gums</li><li>A plan for ongoing preventive care</li></ul><p>The practice will confirm which services are available and appropriate for you.</p>' },
  cosmetic: { title: 'A smile that feels like you.', body: '<p>A cosmetic consultation is a chance to talk about what you would like to change and understand your options.</p><ul><li>The colour and appearance of your teeth</li><li>Whitening or veneer options to ask about</li><li>Your priorities, expectations, and budget</li></ul><p>Availability and suitability must be confirmed by the dentist following an assessment.</p>' },
  restorative: { title: 'Care for your next chapter.', body: '<p>Restorative dentistry considers the function and appearance of damaged or missing teeth. A consultation can cover:</p><ul><li>Concerns about damaged teeth</li><li>Options such as fillings, crowns, or tooth replacement</li><li>The stages and costs of an individual treatment plan</li></ul><p>The dentist will explain which options are available and suitable after assessing your needs.</p>' }
};
function showInfo(heading, body) { title.textContent = heading; content.innerHTML = body; dialog.showModal(); }
document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => showInfo('Your first step to a healthier smile.', '<p>Thank you for your interest in Dr Hashim and Associates.</p><p>Online booking is not available yet. The practice’s contact number, address, and appointment details will be added here once confirmed.</p><p>No appointment has been requested or reserved.</p>')));
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => { const item = care[button.dataset.service]; showInfo(item.title, item.body); }));
document.querySelectorAll('.close-dialog, .dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { const box = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close(); });
document.querySelector('#year').textContent = new Date().getFullYear();
