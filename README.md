# lwc-datatable-pagination
A very simple Salesforce LWC data table component with completely client browser side paging through data.

The Salesforce LWC Data Table https://developer.salesforce.com/docs/component-library/bundle/lightning-datatable/documentation does not support any pagination, so this component extends it with this functionality.

You may want to consider using this if:

1) You are reading data from a source that doesn't support pagination (e.g. a web service that provides a dump of data)
2) You are dealing with a limited number of records (I'd say less than a thousand, ideally less than 100)
3) You want a very smooth paging experience on the client side
4) You want as simple code in your solution as possible

You really should not consider using this if:

1) You want to page through a large number of records
2) You can write a SOQL query with paging in the Apex Controller class
3) Look at something like https://github.com/Sarveshgithub/sfdc-lwc-lightning-datatable that will implement SOQL paging.

