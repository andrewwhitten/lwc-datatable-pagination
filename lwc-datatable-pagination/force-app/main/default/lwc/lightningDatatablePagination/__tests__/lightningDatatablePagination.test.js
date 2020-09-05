import { createElement } from 'lwc';
import LightningDatatablePagination from 'c/lightningDatatablePagination';

describe('c-lightning-datatable-pagination', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays data', () => {
        const element = createElement('c-lightning-datatable-pagination', {
            is: LightningDatatablePagination
        });
        document.body.appendChild(element);

        // Verify displayed greeting
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe('No data to display');

        //expect(1).toBe(2);
    });
});