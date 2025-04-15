function decorateCarousel(element) {
  console.log(element);
  element.classList.add('carousel');
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-button', 'prev');
  prevButton.setAttribute('aria-label', 'previous');
  prevButton.innerHTML = '<img data-icon-name="arrow-back" src="/icons/arrow-back.svg" alt="previous" loading="eager"/>';

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-button', 'next');
  nextButton.setAttribute('aria-label', 'next');
  nextButton.innerHTML = '<img data-icon-name="arrow-forward" src="/icons/arrow-forward.svg" alt="next" loading="eager"/>';

  const ulElement = element.querySelector('ul');
  ulElement?.classList.add('carousel-list');

  [...element.querySelectorAll('ul > li')].forEach((item) => {
    item.classList.add('carousel-item');
  });

  ulElement?.parentNode.append(prevButton);
  ulElement?.parentNode.append(nextButton);

  const carouselItems = element.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  function updateCarousel() {
    const itemWidth = carouselItems[0].getBoundingClientRect().width;
    const selectedCarouselItem = carouselItems[currentIndex];
    const computedStyle = window.getComputedStyle(selectedCarouselItem);
    const gap = parseInt(computedStyle.gap.replace('px', ''), 10) || 0;
    const rightMargin = parseInt(computedStyle.marginRight.replace('px', ''), 10) || 0;
    // margin-right:20px, gap: 15px
    const translateX = -currentIndex * (itemWidth + gap + rightMargin);
    element.querySelector('.carousel-list').style.transform = `translateX(${translateX}px)`;

    prevButton.disabled = currentIndex <= 0;
    nextButton.disabled = currentIndex >= carouselItems.length - 1;
  }

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < carouselItems.length - 1) {
      currentIndex += 1;
      updateCarousel();
    }
  });

  updateCarousel();
}

export default async function decorate(block) {
  console.log(block);

  // Process rows and columns
  block.querySelectorAll(':scope > div').forEach((row) => {
    row.querySelectorAll(':scope > div').forEach((col, i) => {
      if (col.classList.contains('button-container')) {
        col.className = '';
      }

      const button = col.querySelector('a.button');
      if (button) {
        button.removeAttribute('class');
      }

      col.className = `utility-banner-col-${i}`;
    });
  });

  // Handle image hover effect
  const img = block.querySelector('.utility-banner.space-around .utility-banner-col-0 img');
  if (img) {
    img.addEventListener('mouseover', () => {
      img.src = '/icons/location-lighter.svg';
    });
    img.addEventListener('mouseout', () => {
      img.src = '/icons/location-white.svg';
    });
  }

  // Handle account dropdown
  const accountLinkEl = block.querySelector('.utility-banner.space-around .utility-banner-col-2 ul');
  const accountEl = block.querySelector('.utility-banner.space-around .utility-banner-col-2 a');
  if (accountLinkEl && accountEl) {
    accountLinkEl.classList.add('hidden');

    const toggleDropdown = (show) => {
      accountLinkEl.classList.toggle('hidden', !show);
    };

    accountEl.addEventListener('mouseover', () => toggleDropdown(true));
    accountEl.addEventListener('mouseout', (event) => {
      if (!accountLinkEl.contains(event.relatedTarget)) toggleDropdown(false);
    });

    accountLinkEl.addEventListener('mouseover', () => toggleDropdown(true));
    accountLinkEl.addEventListener('mouseout', (event) => {
      if (!accountEl.contains(event.relatedTarget)) toggleDropdown(false);
    });
  }

  // Initialize carousel if applicable
  if (block.classList.contains('arrow-carousel')) {
    const carouselList = block.querySelector('.utility-banner-col-1');
    if (carouselList) {
      decorateCarousel(carouselList);
    }
  }
}
