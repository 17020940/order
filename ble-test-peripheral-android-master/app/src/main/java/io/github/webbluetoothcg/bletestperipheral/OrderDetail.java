package io.github.webbluetoothcg.bletestperipheral;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ListView;

import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import Bean.OrderDetailScreen;
import adapter.ItemListApdapter;
import model.Item;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class OrderDetail extends Fragment {
    private String orderId;
    private List<Item> items;
    private View mRootView;
    ItemListApdapter itemListApdapter;
    ListView listViewProduct;
    Button button;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        mRootView = inflater.inflate(R.layout.order_info, container, false);
        button = (Button) mRootView.findViewById(R.id.resolveOrderButton);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                handleClickButon();
            }
        });
        listViewProduct = (ListView) mRootView.findViewById(R.id.itemList);
        if (this.items == null){
            this.items = new ArrayList<>();
        }
        itemListApdapter = new ItemListApdapter(items);
        listViewProduct.setAdapter(itemListApdapter);
        return mRootView;
    }


    public void setItems(List<Item> items) {
        this.items = items;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    private void handleClickButon(){
        String json = "{\"orderId\":" + orderId + "}";
        RequestBody body = RequestBody.create(
                MediaType.parse("application/json"), json);
        Request request = new Request.Builder()
                .url(Constant.API_URL + "/pos/api/resolve-order")
                .post(body)
                .build();
        OkHttpClient client = new OkHttpClient();
        Call call = client.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
                Log.e("ERROR", e.getMessage());
            }

            @Override
            public void onResponse(@NotNull Call call, @NotNull Response response) throws IOException {
                OrderDetailScreen.updateView();
                Log.i("INFO",response.body().string());
            }
        });

    }

}
