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

import java.util.ArrayList;
import java.util.List;

import adapter.ItemListApdapter;
import model.Item;

public class OrderDetail extends Fragment {

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

    private void handleClickButon(){
        Log.d("DEBUG:", "click butonnnnnnnnnnnn");
    }

}
