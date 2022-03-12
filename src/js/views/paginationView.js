import View from './View.js';

import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _currPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkupPrevButton() {
    return `
      <button data-goto="${
        this._currPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._currPage - 1}</span>
      </button>
      `;
  }

  _generateMarkupNextButton() {
    return `
      <button data-goto="${
        this._currPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this._currPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
  }

  _generateMarkup() {
    this._currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    // Page 1, and there are other pages
    if (this._currPage === 1 && numPages > 1) {
      return this._generateMarkupNextButton();
    }
    // Last page
    if (this._currPage === numPages && numPages > 1) {
      return this._generateMarkupPrevButton();
    }
    // Other page
    if (this._currPage < numPages) {
      return (
        this._generateMarkupPrevButton() + this._generateMarkupNextButton()
      );
    }
    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
