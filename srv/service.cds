using { API_SALES_ORDER_SRV as external1 } from './external/API_SALES_ORDER_SRV';
using { API_MATERIAL_STOCK_SRV as external2 } from './external/API_MATERIAL_STOCK_SRV';

service SalesService {
    entity SalesOrder as projection on external1.A_SalesOrder{
        key SalesOrder,
        to_Item,
        null as SalesOrderItem:String(100),
        null as Material:String(100)
        
    }actions{
        action StockData() returns array of {
            Material: String(100);
            Plant: String(100);
            Batch: String(100);
            StorageLocation: String(100);
        }
};

    entity SalesOrderItem as projection on external1.A_SalesOrderItem{
        SalesOrder,
        SalesOrderItem,
        Material,

    };

    entity Material as projection on external2.A_MaterialStock{
        Material,
        to_MatlStkInAcctMod,
        null as MaterialStock:String(100),
        null as Plant:String(100),
        null as Batch:String(100),
        null as StorageLocation:String(100),
    };

    entity MaterialStock as projection on external2.A_MatlStkInAcctMod{
        Material,
        Plant,
        Batch,
        StorageLocation
    };
}