const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const salesapi = await cds.connect.to('API_SALES_ORDER_SRV');
    const materialapi = await cds.connect.to('API_MATERIAL_STOCK_SRV');

    this.on('READ', 'SalesInfo', async req => {
        req.query.SELECT.columns = [
            { ref: ['SalesOrder'] },
            { ref: ['SalesOrderType'] },
            { ref: ['SalesOrganization'] },
            { ref: ['DistributionChannel'] },
            { ref: ['to_Item'], expand: ['*'] }
        ];

        let res = await salesapi.run(req.query);

        res.forEach(element => {
            if (element.to_Item) {
                const item = element.to_Item.find(item => item.SalesOrder === element.SalesOrder);
                if (item) {
                    element.SalesOrderItem = item.SalesOrderItem;
                }
            }
        });

        return res;
    });

    this.on('READ', 'MaterialsInfo', async req => {
        req.query.SELECT.columns = [
            { ref: ['Material'] },
            { ref: ['to_MatlStkInAcctMod'], expand: ['*'] }
        ];

        let res = await materialapi.run(req.query);

        res.forEach(element => {
            if (element.to_MatlStkInAcctMod) {
                const materialDetail = element.to_MatlStkInAcctMod.find(item => item.Material === element.Material);
                if (materialDetail) {
                    element.Plant = materialDetail.Plant;
                    element.StorageLocation = materialDetail.StorageLocation;
                    element.Batch = materialDetail.Batch;
                }
            }
        });

        return res;
    });

    this.on('READ', 'SalesOrderItem', async req => {
        req.query.SELECT.columns = [
            { ref: ['SalesOrder'] },
            { ref: ['SalesOrderItem']}
        ];

        let res = await salesapi.run(req.query);

        return res;
    });

    this.on('READ', 'MaterialDetail', async req => {
        req.query.SELECT.columns = [
            { ref: ['Material'] },
            { ref: ['Plant']},
            { ref: ['StorageLocation']},
            { ref: ['Batch']},
        ];

        let res = await materialapi.run(req.query);
        return res;
    });

});
