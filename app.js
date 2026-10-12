(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    menuButton.querySelector('span').textContent = '+';
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
    menuButton.querySelector('span').textContent = open ? '−' : '+';
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu(); menuButton.focus();
    }
  });
  const form = document.querySelector('#location-form');
  form.hidden = false;
  const review = document.querySelector('#request-review');
  const manualCopy = document.querySelector('#copy-manually');
  const copyStatus = document.querySelector('#copy-status');
  let requestText = '';
  function showForm() {
    review.hidden = true; form.hidden = false;
    copyStatus.textContent = ''; manualCopy.hidden = true;
  }
  document.querySelectorAll('.location-choice').forEach(link => {
    link.addEventListener('click', () => {
      showForm();
      const choice = [...form.elements.locationType].find(input => input.value === link.dataset.location);
      if (choice) choice.checked = true;
    });
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const placeInput = document.querySelector('#place');
    placeInput.value = placeInput.value.trim();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const locationType = String(data.get('locationType') || 'Anders');
    const people = String(data.get('people') || 'Nog niet bekend');
    const place = String(data.get('place') || '').replace(/[\r\n]/g, ' ').slice(0, 120);
    const message = String(data.get('message') || '').trim().slice(0, 1000);
    document.querySelector('#review-place').textContent = place;
    document.querySelector('#review-type').textContent = locationType;
    document.querySelector('#review-people').textContent = people;
    document.querySelector('#review-message').textContent = message;
    document.querySelector('#review-message').hidden = !message;
    requestText = ['Hallo Smart Fridges,', '', 'Ik wil graag de mogelijkheden voor een Smart Fridge op onze locatie bespreken.', '', `Locatie: ${place}`, `Type locatie: ${locationType}`, `Gebruikers per dag: ${people}`, ...(message ? ['', `Toelichting: ${message}`] : []), '', 'Graag bespreek ik het assortiment, de kosten en de afspraken over plaatsing en beheer.', '', 'Met vriendelijke groet,'].join('\n');
    const subject = `Smart Fridge op locatie — ${place}`;
    document.querySelector('#send-request').href = `mailto:info@smartfridges.nl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(requestText)}`;
    form.hidden = true; review.hidden = false;
    copyStatus.textContent = ''; manualCopy.hidden = true;
    review.focus({preventScroll: true});
    review.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center'});
  });
  document.querySelector('#edit-request').addEventListener('click', () => {
    showForm(); document.querySelector('#people').focus();
  });
  document.querySelector('#copy-request').addEventListener('click', async () => {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(requestText);
      copyStatus.textContent = 'Aanvraag gekopieerd. Plak hem in een e-mail naar info@smartfridges.nl.';
      manualCopy.hidden = true;
    } catch (_) {
      manualCopy.value = requestText; manualCopy.hidden = false;
      manualCopy.focus(); manualCopy.select();
      copyStatus.textContent = 'Kopieer de geselecteerde tekst hieronder en plak hem in je e-mail.';
    }
  });
})();
