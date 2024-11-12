using { com.hemanth.satinfotech as db } from '../db/schema';
using {API_MATERIAL_STOCK_SRV as materialapi} from './external/API_MATERIAL_STOCK_SRV';
using {API_SALES_ORDER_SRV as salesapi} from './external/API_SALES_ORDER_SRV';

service satinfotech @(requires: 'authenticated-user') {

    entity Stocks as projection on db.Stocks actions{
        action StockData(
            Sales_Order: String(80) @Common.Label: 'Sales Order',
            Sales_Order_Item: String(80) @Common.Label: 'Sales Order Item'
        ) returns String;
    };

    entity SalesInfo as projection on salesapi.A_SalesOrder {
        SalesOrder,
        SalesOrderType,
        SalesOrganization,
        DistributionChannel,
        to_Item,
        null as SalesOrderItem: String(80),
    };

    entity SalesOrderItem as projection on salesapi.A_SalesOrderItem {
        key SalesOrder,
        SalesOrderItem
    };

    entity MaterialsInfo as projection on materialapi.A_MaterialStock{
        key Material,
        to_MatlStkInAcctMod,
        null as MaterialDetail: String(80),
    };

    entity MaterialDetail as projection on materialapi.A_MatlStkInAcctMod{
        key Material,
        Plant,
        StorageLocation,
        Batch,
    }
};
