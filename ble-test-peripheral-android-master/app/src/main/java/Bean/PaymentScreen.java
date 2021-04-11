package Bean;


import android.os.Handler;
import android.support.v4.app.FragmentManager;
import android.support.v4.view.ViewPager;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import io.github.webbluetoothcg.bletestperipheral.Constant;
import io.github.webbluetoothcg.bletestperipheral.ViewPagerAdapter;
import io.github.webbluetoothcg.bletestperipheral.ViewPagerPaymentAdapter;
import model.Item;
import model.Order;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class PaymentScreen {
    public static Handler handler;
    public static ViewPager viewPager;
    public static FragmentManager fragmentManager;
    public static List<Order> orderList = new ArrayList<>();

    private static void setOrders(JSONArray res) throws JSONException {
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
                item.setQuantity(itemJSON.getInt("quantity"));
                item.setPrice(itemJSON.getDouble("price"));
                items.add(item);
            }
            order.setItems(items);
            orders.add(order);
        }
        orderList = orders;

    }

    public static void updateView() {
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(Constant.API_URL + "/pos/api/payment?restaurantId=1")
                .build();
        Call call = client.newCall(request);
        call.enqueue(new Callback() {
            public void onResponse(Call call, Response response)
                    throws IOException {
                String res = response.body().string();
                JSONArray orderRes;
                try {
                    orderRes = new JSONArray(res);
                    setOrders(orderRes);

                    handler.post(new Runnable() {
                        @Override
                        public void run() {
                            viewPager.setAdapter(new ViewPagerPaymentAdapter(fragmentManager, orderList));
                        }
                    });
                    Log.d("res", "-------------------------:" + res);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            public void onFailure(Call call, IOException e) {
                Log.e("ERROR:", e.getMessage());
            }
        });

    }

}
