package io.github.webbluetoothcg.bletestperipheral;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import java.util.Date;

public class MyBroadCastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("DEBUG", "-----------------------------------------------Alarm Manager just ran---------------------------------------------------" + new Date().toString());
//        if (intent.getAction().equals("android.intent.action.BOOT_COMPLETED")) {
//
//            Intent serviceIntent = new Intent(context, MyService.class);
//            context.startService(serviceIntent);
//        } else {
//            Log.d("DEBUG", "-----------------------------------------------Alarm Manager just ran---------------------------------------------------");
//        }
    }
}
