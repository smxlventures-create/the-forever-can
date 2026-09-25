import './styles.css';
import './site-shell.js';
import { howItWorks, shop } from './products.js';
import { howStepsMarkup } from './markup.js';

const root = document.querySelector('#how-root');
if (root) root.innerHTML = howStepsMarkup(howItWorks);

const etsy = document.querySelector('[data-etsy]');
if (etsy) etsy.href = shop.etsyListing;
