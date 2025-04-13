

function decorateCarousel(element){
  console.log(element);
  element.classList.add('carousel');

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-button', 'prev');
  prevButton.setAttribute('aria-label','previous');
  prevButton.innerHTML = '<img data-icon-name="arrow-back" src="/icons/arrow-back.svg" alt="previous" loading="eager">';
  

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-button','next');
  nextButton.setAttribute('aria-label','next');
  nextButton.innerHTML = '<img data-icon-name="arrow-forward" src="/icons/arrow-forward.svg" alt="next" loading="eager">';

  const ulElement = element.querySelector('ul');
  ulElement?.classList.add('carousel-list');

  [...element.querySelectorAll('ul > li')].forEach((item,i)=>{
    item.classList.add('carousel-item')
  })

  ulElement?.parentNode.insertBefore(prevButton,ulElement);
  ulElement?.parentNode.insertBefore(nextButton,ulElement.nextSiblingElement);

  document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.utility-banner-col-1');
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    
    let currentIndex = 0;
    
    function updateCarousel() {
      const totalItems = carouselItems.length;
      const translateX = -currentIndex * (carouselItems[0].offsetWidth + 20); // translate -200px per item + margin
      
      carousel.querySelector('.carousel-list').style.transform = `translateX(${translateX}px)`;
      
      prevButton.disabled = (currentIndex <= 0);
      nextButton.disabled = (currentIndex >= totalItems - 1);
    }
    
    prevButton.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
    
    nextButton.addEventListener('click', function() {
      if (currentIndex < carouselItems.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    });
    
    updateCarousel();
  });
}

export default async function decorate(block) {
  console.log(block);
  [...block.querySelectorAll(':scope > div')].forEach(row=>{
    [...row.querySelectorAll(':scope > div')].forEach((col,i)=>{
      if(col.classList.contains('button-container')){
        col.className = ""
      }

     if(col.querySelector('a.button')){
      col.querySelector('a.button').removeAttribute('class');
     }

      col.className = `utility-banner-col-${i}`;
    })
  })

  if(block.classList.contains('carousel')) {
    const carouselList = block.querySelector('.utility-banner-col-1');
    decorateCarousel(carouselList);
  }
}