package io.github.webbluetoothcg.bletestperipheral;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import org.jetbrains.annotations.NotNull;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import Bean.CommonUtil;
import Bean.OrderDetailScreen;
import Bean.PaymentScreen;
import adapter.ItemListApdapter;
import model.Item;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class PaymentDetail extends Fragment {
    private String orderId;
    private List<Item> items;
    private View mRootView;
    ItemListApdapter itemListApdapter;
    ListView listViewProduct;
    Button button;
    TextView totalMoney;
    EditText customerMoney;
    Double total;
    Double paymentMoney;
    TextView refundMoney;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        mRootView = inflater.inflate(R.layout.payment, container, false);
        button = (Button) mRootView.findViewById(R.id.paymentBtn);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    handleClickButon();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
        listViewProduct = (ListView) mRootView.findViewById(R.id.itemList);
        if (this.items == null){
            this.items = new ArrayList<>();
        }
        itemListApdapter = new ItemListApdapter(items);
        listViewProduct.setAdapter(itemListApdapter);
        refundMoney = (TextView) mRootView.findViewById(R.id.refundMoney);
        caculateTotalMoney();
        caculateRefund();
        return mRootView;
    }


    public void setItems(List<Item> items) {
        this.items = items;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    private void handleClickButon() throws JSONException {
        JSONObject param = new JSONObject();
        param.put("orderId", orderId);
        param.put("total", total);
        param.put("paymentMoney", paymentMoney);
        RequestBody body = RequestBody.create(
                MediaType.parse("application/json"), param.toString());
        Request request = new Request.Builder()
                .url(Constant.API_URL + "/pos/api/payment")
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
                PaymentScreen.updateView();
                Log.i("INFO",response.body().string());
            }
        });

    }

    private void caculateTotalMoney(){
        totalMoney = (TextView) mRootView.findViewById(R.id.totalMoney);
        Double totoal = 0D ;
        for (Item item : items){
            totoal += item.getQuantity()*item.getPrice();
        }
        this.total = totoal;
        totalMoney.setText("Tổng tiền: " + CommonUtil.getMoneyCurrency(totoal));
    }

    private void caculateRefund(){
        customerMoney = (EditText) mRootView.findViewById(R.id.customerMoney);
        customerMoney.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                if(charSequence.length() > 0){
                    paymentMoney = new Double(charSequence.toString());

                    Double refund = paymentMoney - total;
                    if (refund < 0){
                        refundMoney.setText("Không hợp lệ");
                    }else{
                        refundMoney.setText("Tiền thừa: " + CommonUtil.getMoneyCurrency(refund));
                    }
                }

            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });
    }

}
