export default function decorate(block) {
  // Wrap the existing content with necessary classes for styling
  const promotionItem = block.querySelector('li');
  if (promotionItem) {
    promotionItem.classList.add('promotion-item');
    
    const promotionLink = block.querySelector('a');
    if (promotionLink) {
      promotionLink.classList.add('promotion-link');

      // Create an arrow element
      const arrowElement = document.createElement('span');
      arrowElement.classList.add('promotion-arrow');
      arrowElement.innerHTML = '&rarr;'; // HTML entity for right arrow
      
      // Append the arrow directly after the shop now text within the link
      promotionLink.appendChild(arrowElement);
    }
  }
}
