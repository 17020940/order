package io.github.webbluetoothcg.bletestperipheral;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import Bean.OrderDetailScreen;


public class MyBroadCastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        OrderDetailScreen.updateView();
    }
}
