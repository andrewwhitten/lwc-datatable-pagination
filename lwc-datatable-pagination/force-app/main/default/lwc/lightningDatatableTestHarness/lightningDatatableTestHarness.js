/**
 * Summary. LightningDatatableTestHarness is a simple demonstration of how to use the Lightning Datatable Pagination component.
 *
 * Description. This harness component is standalone and allows you to try out the Lightning Datatable 
 * Pagination component from eigher a local development server or a Salesforce hosted Lightning page. 
 * It allows the user to dynamically change the ammount of rows displayed on each page.
 *
 * @author Andrew Whitten
 */
import { LightningElement } from 'lwc';
import fetchDataHelper from './fetchDataHelper';

export default class LightningDatatableTestHarness extends LightningElement {

    data = [];
    pagesize = 10;

    // Columns to apply to data table
    columns = [
        { label: 'Label', fieldName: 'name'},
        { label: 'Website', fieldName: 'website', type: 'url' },
        { label: 'Phone', fieldName: 'phone', type: 'phone' },
        { label: 'Balance', fieldName: 'amount', type: 'currency'},
        { label: 'CloseAt', fieldName: 'closeAt', type: 'date' }
    ];

    // eslint-disable-next-line @lwc/lwc/no-async-await
    async connectedCallback() {
        const data = await fetchDataHelper({ amountOfRecords: 250 });
        this.data = data;
    }

    // On requested change of page size
    handlePageSizeChange(event) {

        var newPageSize = event.detail.value;

        if(newPageSize) {
            this.pagesize = newPageSize;
        }
    }

}