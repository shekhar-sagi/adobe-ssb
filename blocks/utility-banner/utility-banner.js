import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  // Extract data from the block HTML
  const links = [...block.querySelectorAll('a')];
  const ulItems = [...block.querySelectorAll('ul > li')];

  const storeLink = links[0];
  const accountLink = links[2];
  const sales = ulItems.map((item) => {
    const [text, link] = item.childNodes;
    return {
      text: text.textContent.trim(),
      link: link.href,
    };
  });

  // Construct the new HTML structure
  const innerHTML = `
    <div class="utility-banner-content">
      <a href="${storeLink.href}" class="utility-banner-link">
        <img src="${window.hlx.codeBasePath}/icons/location-white.svg" alt="Location Icon" class="utility-banner-icon">
        ${storeLink.textContent}
      </a>
      <div class="utility-banner-navigation">
        <button aria-label="Previous" class="utility-banner-nav-button">
          <img src="${window.hlx.codeBasePath}/icons/arrow-left.svg" alt="Left Arrow">
        </button>
        <span class="utility-banner-text">${sales[0].text}</span>
        <a href="${sales[0].link}" class="utility-banner-link">Shop Now</a>
        <button aria-label="Next" class="utility-banner-nav-button">
          <img src="${window.hlx.codeBasePath}/icons/arrow-right.svg" alt="Right Arrow">
        </button>
      </div>
      <a href="${accountLink.href}" class="utility-banner-link">${accountLink.textContent}</a>
    </div>
  `;

  // Replace block inner HTML with the constructed HTML
  block.innerHTML = innerHTML;

  // Decorate icons
  decorateIcons(block);
}
