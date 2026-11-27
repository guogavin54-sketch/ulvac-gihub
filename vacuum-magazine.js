(() => {
  const carousel = document.querySelector('.magazine-feature');
  if (!carousel) return;
  const track = carousel.querySelector('.magazine-slides');
  const pagination = carousel.querySelector('.magazine-pagination');
  const buttons = [...pagination.querySelectorAll('button')];
  const slides = [...track.children];
  let currentIndex = 0;
  let gesture = null;

  function selectSlide(index, moveFocus = false) {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => { slide.hidden = slideIndex !== currentIndex; });
    buttons.forEach((button, buttonIndex) => {
      if (buttonIndex === currentIndex) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    if (moveFocus) buttons[currentIndex].focus();
  }

  buttons.forEach((button, index) => button.addEventListener('click', () => selectSlide(index)));
  carousel.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const targetIndex = { ArrowLeft: currentIndex - 1, ArrowRight: currentIndex + 1, Home: 0, End: slides.length - 1 }[event.key];
    if (targetIndex === undefined) return;
    event.preventDefault();
    selectSlide(targetIndex, true);
  });
  track.addEventListener('pointerdown', event => {
    gesture = event.isPrimary && event.pointerType !== 'mouse' ? { x: event.clientX, y: event.clientY } : null;
  });
  track.addEventListener('pointercancel', () => { gesture = null; });
  track.addEventListener('pointerup', event => {
    if (!gesture) return;
    const distance = event.clientX - gesture.x;
    const verticalDistance = Math.abs(event.clientY - gesture.y);
    gesture = null;
    if (Math.abs(distance) >= 44 && Math.abs(distance) > verticalDistance * 1.5) selectSlide(currentIndex + (distance < 0 ? 1 : -1));
  });
  pagination.hidden = false;
})();
