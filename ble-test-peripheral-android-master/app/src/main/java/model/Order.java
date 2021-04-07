package model;

import java.util.List;

import io.github.webbluetoothcg.bletestperipheral.OrderDetail;

public class Order {
    private String tableId;
    private String tableName;
    private String orderId;
    private List<Item> items;

    public Order() {
    }

    public Order(String tableId, String tableName, String orderId, List<Item> items) {
        this.tableId = tableId;
        this.tableName = tableName;
        this.orderId = orderId;
        this.items = items;
    }

    public String getTableId() {
        return tableId;
    }

    public void setTableId(String tableId) {
        this.tableId = tableId;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
