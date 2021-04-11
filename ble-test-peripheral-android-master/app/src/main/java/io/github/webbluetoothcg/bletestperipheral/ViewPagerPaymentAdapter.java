package io.github.webbluetoothcg.bletestperipheral;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;

import java.util.ArrayList;
import java.util.List;

import model.Order;

public class ViewPagerPaymentAdapter extends FragmentStatePagerAdapter {

    private List<Order> orders;
    private List<PaymentDetail> paymentDetails;

    public ViewPagerPaymentAdapter(FragmentManager fm, List<Order> orders) {
        super(fm);
        this.orders = orders;
        this.paymentDetails = new ArrayList<>();
        for (int i = 0 ; i < orders.size(); i++){
            PaymentDetail paymentDetail = new PaymentDetail();
            paymentDetail.setItems(orders.get(i).getItems());
            paymentDetail.setOrderId(orders.get(i).getOrderId());
            paymentDetails.add(paymentDetail);
        }

//        for (int i = 0 ; i < orders.size(); i++){
//            orderDetails.get(i).setItems(orders.get(i).getItems());
//        }
    }
    public void updateData(List<Order> orders){
        this.orders = orders;
        this.paymentDetails = new ArrayList<>();
        for (int i = 0 ; i < orders.size(); i++){
            PaymentDetail paymentDetail = new PaymentDetail();
            paymentDetail.setItems(orders.get(i).getItems());
            paymentDetails.add(paymentDetail);
            getItem(i);
            notifyDataSetChanged();
        }
    }

    
    @Override
    public Fragment getItem(int position) {
        return paymentDetails.get(position);
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
