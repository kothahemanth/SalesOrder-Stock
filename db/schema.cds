namespace com.hemanth.satinfotech;
using { managed, cuid } from '@sap/cds/common';

entity Stocks: cuid, managed {
    key SalesOrder: String(40);
    SalesOrderItem: String(4);
    SalesOrganization: String(3);
    DistributionChannel: String(18);
    Material: String(10);
    Plant: String(10);
    StorageLocation: String(10);
    Batch: String(10);

}