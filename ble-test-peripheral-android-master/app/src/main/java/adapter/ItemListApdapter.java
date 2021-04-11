package adapter;

import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.List;

import Bean.CommonUtil;
import io.github.webbluetoothcg.bletestperipheral.R;
import model.Item;

public class ItemListApdapter extends BaseAdapter {

    private List<Item> items;

    public ItemListApdapter(List<Item> items){
        this.items = items;
    }
    @Override
    public int getCount() {
        return items.size();
    }

    @Override
    public Object getItem(int i) {
        return items.get(i);
    }

    @Override
    public long getItemId(int i) {
        return items.get(i).getId();
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View viewItem;

        if (convertView == null) {
            viewItem = View.inflate(parent.getContext(), R.layout.item, null);
        } else viewItem = convertView;

        Item item = (Item) getItem(position);
        ((TextView) viewItem.findViewById(R.id.nameItem)).setText(item.getName());
        ((TextView) viewItem.findViewById(R.id.quantity)).setText(String.format("Số lượng: %s", item.getQuantity()));
        ((TextView) viewItem.findViewById(R.id.price)).setText(String.format("Giá: %s", CommonUtil.getMoneyCurrency(item.getPrice())));
        return viewItem;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
