package Bean;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import io.github.webbluetoothcg.bletestperipheral.MyAdapter;
import model.Item;
import model.Order;

public class OrderBean {
    private static  MyAdapter myAdapter;

    public static void setMyAdapter(MyAdapter myAdapter) {
        OrderBean.myAdapter = myAdapter;
    }
    //    public static List<Order> getOrders() {
//        return orders;
//    }

    public static void setOrders(JSONArray res) throws JSONException {
        List<Order> orders = new ArrayList<>();
        for ( int i= 0 ; i < res.length(); i++){
            Order order = new Order();
            order.setTableName(res.getJSONObject(i).getString("tableName"));
            order.setOrderId(res.getJSONObject(i).getString("orderId"));
            order.setTableId(res.getJSONObject(i).getString("tableId"));
            JSONArray itemJSONs = res.getJSONObject(i).getJSONArray("items");
            List<Item> items = new ArrayList<>();
            for (int j = 0 ; j < itemJSONs.length(); j++){
                JSONObject itemJSON = itemJSONs.getJSONObject(j);
                Item item = new Item();
                item.setId(itemJSON.getLong("id"));
                item.setName(itemJSON.getString("name"));
                item.setQuantity(itemJSON.getString("quantity"));
                items.add(item);
            }
            order.setItems(items);
            orders.add(order);
        }
        myAdapter.updateData(orders);
    }
}
