package io.github.webbluetoothcg.bletestperipheral;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Date;

import Bean.OrderBean;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MyBroadCastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(Constant.API_URL + "/pos/api/order?restaurantId=1")
                .build();
        Call call = client.newCall(request);
        call.enqueue(new Callback() {
            public void onResponse(Call call, Response response)
                    throws IOException {
                String res = response.body().string();
                JSONArray orderRes;
                try {
                    orderRes = new JSONArray(res);
                    OrderBean.setOrders(orderRes);
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
