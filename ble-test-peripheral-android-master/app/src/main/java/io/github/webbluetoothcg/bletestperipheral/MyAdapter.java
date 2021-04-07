package io.github.webbluetoothcg.bletestperipheral;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;

import java.util.ArrayList;
import java.util.List;

import model.Order;

public class MyAdapter extends FragmentStatePagerAdapter {

    private List<Order> orders;
    private List<OrderDetail> orderDetails;

    public MyAdapter(FragmentManager fm, List<Order> orders) {
        super(fm);
        this.orders = orders;
        this.orderDetails = new ArrayList<>();
        for (int i = 0 ; i < orders.size(); i++){
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setItems(orders.get(i).getItems());
            orderDetails.add(orderDetail);
        }

//        for (int i = 0 ; i < orders.size(); i++){
//            orderDetails.get(i).setItems(orders.get(i).getItems());
//        }
    }
    public void updateData(List<Order> orders){
        this.orders = orders;
        this.orderDetails = new ArrayList<>();
        for (int i = 0 ; i < orders.size(); i++){
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setItems(orders.get(i).getItems());
            orderDetails.add(orderDetail);
            getItem(i);
            notifyDataSetChanged();
        }
    }

    
    @Override
    public Fragment getItem(int position) {
        return orderDetails.get(position);
    }

    @Override
    public int getCount() {
        return orders.size();
    }

    @Override
    public CharSequence getPageTitle(int position){
        return orders.get(position).getTableName();
    }

}
