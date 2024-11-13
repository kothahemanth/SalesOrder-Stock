sap.ui.define([
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Table",
    "sap/m/Column",
    "sap/m/ColumnListItem",
    "sap/m/Text"
], function(Dialog, Button, Table, Column, ColumnListItem, Text) {
    'use strict';

    return {
        materialDetails: function(oBindingContext, aSelectedContexts) {
            console.log(aSelectedContexts);
            let mParameters = {
                contexts: aSelectedContexts[0],
                label: 'Confirm',
                invocationGrouping: true    
            };
            this.editFlow.invokeAction('SalesService.StockData', mParameters)
                .then(function(result) {
                    const material = result.getObject().value;
                    console.log('Material Details:', material);
                    let oTable = new Table({
                        width: "100%",
                        columns: [
                            new Column({
                                header: new Text({ text: "Material" })
                            }),
                            new Column({
                                header: new Text({ text: "Plant" })
                            }),
                            new Column({
                                header: new Text({ text: "Storage Location" })
                            }),
                            new Column({
                                header: new Text({ text: "Batch" })
                            })
                        ],
                        items: material.map(function(detail) {
                            return new ColumnListItem({
                                cells: [
                                    new Text({ text: detail.Material }),
                                    new Text({ text: detail.Plant }),
                                    new Text({ text: detail.StorageLocation }),
                                    new Text({ text: detail.Batch })
                                ]
                            });
                        })
                    });

                    let oDialog = new Dialog({
                        title: 'Material Details',
                        contentWidth: "600px",
                        contentHeight: "500px",
                        verticalScrolling: true,
                        content: [oTable],  
                        buttons: [
                            new Button({
                                text: 'Close',
                                press: function () {
                                    oDialog.close();
                                }
                            })
                        ],
                        afterClose: function() {
                            oDialog.destroy();
                        }
                    });

                    oDialog.open();
                });
        }
    };
});
