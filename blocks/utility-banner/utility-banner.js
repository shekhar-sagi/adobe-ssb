

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

  [...element.querySelectorAll('ul > li')].forEach((item, i) => {
    item.classList.add('carousel-item')
  })

  ulElement?.parentNode.append(prevButton);
  ulElement?.parentNode.append(nextButton);

  const carousel = document.querySelector('.utility-banner-col-1');
  const carouselItems = carousel.querySelectorAll('.carousel-item');

  let currentIndex = 0;

  function updateCarousel() {
    const itemWidth = carouselItems[0].getBoundingClientRect().width;
    const translateX = -currentIndex * (itemWidth + 35);
    carousel.querySelector('.carousel-list').style.transform = `translateX(${translateX}px)`;

    prevButton.disabled = currentIndex <= 0;
    nextButton.disabled = currentIndex >= carouselItems.length - 1;
  }

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < carouselItems.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  updateCarousel();
}

export default async function decorate(block) {
  console.log(block);
  [...block.querySelectorAll(':scope > div')].forEach(row => {
    [...row.querySelectorAll(':scope > div')].forEach((col, i) => {
      if (col.classList.contains('button-container')) {
        col.className = ""
      }

      if (col.querySelector('a.button')) {
        col.querySelector('a.button').removeAttribute('class');
      }

      col.className = `utility-banner-col-${i}`;
    })
  })

  const img = document.querySelector('.utility-banner .utility-banner-col-0 img');
  img.addEventListener('mouseover', () => {
    img.src = '/icons/location-lighter.svg';
  });
  img.addEventListener('mouseout', () => {
    img.src = '/icons/location-white.svg';
  });

  if (block.classList.contains('carousel')) {
    const carouselList = block.querySelector('.utility-banner-col-1');
    decorateCarousel(carouselList);
  }
}