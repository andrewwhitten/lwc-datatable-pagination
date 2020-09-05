/**
 * Summary. LightningDatatablePanination is a simple demonstration of how to use the Lightning 
 * Datatable Pagination component.
 *
 * Description. This harness component is standalone and allows you to try out the Lightning Datatable 
 * Pagination component from eigher a local development server or a Salesforce hosted Lightning page. 
 * It allows the user to dynamically change the ammount of rows displayed on each page.
 *
 * @author Andrew Whitten
 */
import { LightningElement, api } from 'lwc';

export default class LightningDatatablePagination extends LightningElement {

    // The key column for the data table
    @api keyField;

    // Maximum ammount of data rows to display at one time
    @api 
    get displayAmmount() {return this._displayAmmount};     
    set displayAmmount(value) {
        this._displayAmmount = value;
        this.gotoPage(1);                                   // If pagination size changes then we need to reset
    }
    _displayAmmount;

    // Columns to bind to the data table
    @api columns;    

    // Data source for data table   
    @api 
    get sourceData() { return this._sourceData };        
    set sourceData(value) { 
        this._sourceData = value;
        this.gotoPage(1);                           // If source data changes then we need to reset
    }
    _sourceData;        

    // Partial JSON array of sourceData variable to bind to data table
    pagedData;          

    // Current page of results on display
    currentPage = 1;

    // Current maximum pages in sourceData set
    maxPages = 1;

    // Indicators to disable the paging buttons
    disabledPreviousButton = false;
    disabledNextButton = false;

    // Loading indicator
    loading = false;

    // On component initiation
    connectedCallback() {

        // Initialize data table to the specified current page (should be 1)
        this.gotoPage(this.currentPage);
    }

    // Request reset of data table
    @api resetPaging() {

        // Initialize data table to the first page
        this.gotoPage(1);
    }

    // On next click
    handleButtonNext() {

        var nextPage = this.currentPage + 1;
        var maxPages =  this.getMaxPages();

        if(nextPage > 0 && nextPage <= maxPages) {

            this.gotoPage(nextPage);
        }
    }

    // On previous click
    handleButtonPrevious() {

        var nextPage = this.currentPage - 1;
        var maxPages =  this.getMaxPages();

        if(nextPage > 0 && nextPage <= maxPages) {

            this.gotoPage(nextPage);
        }
    }

    // How many pages of results?
    getMaxPages() {

        // There will always be 1 page, at least
        var result = 1;

        // Number of elements on sourceData
        var arrayLength;

        // Number of elements on sourceData divided by number of rows to display in table (can be a float value)
        var divideValue;

        // Ensure sourceData has a value
        if(this._sourceData) {

            arrayLength = this._sourceData.length;

            // Float value of number of pages in data table
            divideValue = arrayLength / this.displayAmmount;

            // Round up to the next Integer value for the actual number of pages
            result = Math.ceil(divideValue); 
        }

        this.maxPages = result;

        return result;
    }

    // Change page
    gotoPage(pageNumber) {

        var recordStartPosition, recordEndPosition;
        var i, arrayElement;        // Loop helpers

        var maximumPages = this.maxPages;
        
        this.loading = true;

        maximumPages = this.getMaxPages();

        // Validate that desired page number is available
        if( pageNumber > maximumPages || pageNumber < 0 ) {
            
            // Invalid page change. Do nothing
            this.loading = false;
            return;
        }

        // Reenable both buttons
        this.disabledPreviousButton = false;
        this.disabledNextButton = false;

        // Is data source valid?
        if(this._sourceData) {

            // Empty the data source used 
            this.pagedData = [];

            // Start the records at the page position
            recordStartPosition = this.displayAmmount * (pageNumber - 1);

            // End the records at the record start position with an extra increment for the page size
            recordEndPosition = recordStartPosition + parseInt(this.displayAmmount, 10);

            // Loop through the selected page of records
            for ( i = recordStartPosition; i < recordEndPosition; i++ ) {

                arrayElement = this._sourceData[i];

                if(arrayElement) {

                    // Add data element for the data to bind
                    this.pagedData.push(arrayElement);
                }
            }

            // Set global current page to the new page
            this.currentPage = pageNumber;

            // If current page is the final page then disable the next button
            if(maximumPages === this.currentPage) {
                
                this.disabledNextButton = true;
            }

            // If current page is the first page then disable the previous button
            if(this.currentPage === 1) {

                this.disabledPreviousButton = true;
            }

            this.loading = false;
        }
    }

}