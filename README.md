# lwc-datatable-pagination
A very simple Salesforce LWC data table component with client side paging through data.

The Salesforce LWC Data Table https://developer.salesforce.com/docs/component-library/bundle/lightning-datatable/documentation does not support any pagination. Therefore if you set it with 1, 5 or 100 rows then you will get a very different screen sizing. The way to address this is to only provide a limited number of rows and add logic to paginate between the sets of your data.

This data table is really simple and is just intended to extend the existing data table with a paging function with as little change as possible. All paging happens on the client side with no SOQL to the backend at all.

The benefit of using this component is that you can just swap it with your LWC Data Table component and it will work straight away with no further analysis or development. If the maximum number of records will be low (say 200) then this will probably be good enough.

The disadvantage of using this component is that frankly most scenarios benefit from paging through records directly from the database one set at a time. For example if you have 10,000 records to page then this is really not the component for you. Look at something like https://github.com/Sarveshgithub/sfdc-lwc-lightning-datatable that will implement correct SOQL paging.

