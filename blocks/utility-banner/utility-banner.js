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
  [...block.querySelectorAll(':scope > div')].forEach((row) => {
    [...row.querySelectorAll(':scope > div')].forEach((col, i) => {
      if (col.classList.contains('button-container')) {
        col.className = '';
      }

      if (col.querySelector('a.button')) {
        col.querySelector('a.button').removeAttribute('class');
      }

      col.className = `utility-banner-col-${i}`;
    });
  });

  const img = block.querySelector('.utility-banner .utility-banner-col-0 img');
  console.log(img);
  img.addEventListener('mouseover', () => {
    img.src = '/icons/location-lighter.svg';
  });
  img.addEventListener('mouseout', () => {
    img.src = '/icons/location-white.svg';
  });

  const accountLinkEl = block.querySelector('.utility-banner-col-2 ul');
  accountLinkEl?.classList.add('hidden');
  const accountEl = block.querySelector('.utility-banner-col-2 a');
  // Show the dropdown when hovering over the account link
  accountEl.addEventListener('mouseover', () => {
    accountLinkEl.classList.remove('hidden');
  });
  // Hide the dropdown only if the mouse leaves both the account link and the dropdown
  accountEl.addEventListener('mouseout', (event) => {
    if (!accountLinkEl.contains(event.relatedTarget)) {
      accountLinkEl.classList.add('hidden');
    }
  });
  // Keep the dropdown visible when hovering over it
  accountLinkEl.addEventListener('mouseover', () => {
    accountLinkEl.classList.remove('hidden');
  });
  // Hide the dropdown when the mouse leaves the dropdown and does not return to the account link
  accountLinkEl.addEventListener('mouseout', (event) => {
    if (!accountEl.contains(event.relatedTarget)) {
      accountLinkEl.classList.add('hidden');
    }
  });

  if (block.classList.contains('carousel')) {
    const carouselList = block.querySelector('.utility-banner-col-1');
    decorateCarousel(carouselList);
  }
}
