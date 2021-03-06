/*
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.github.webbluetoothcg.bletestperipheral;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.bluetooth.BluetoothManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;

//import androidx.annotation.NonNull;
//import androidx.lifecycle.Lifecycle;
//import androidx.lifecycle.LifecycleOwner;
//import androidx.lifecycle.LiveData;
//import androidx.lifecycle.Observer;
//import androidx.work.Data;
//import androidx.work.PeriodicWorkRequest;
//import androidx.work.WorkInfo;
//import androidx.work.WorkManager;

import org.jetbrains.annotations.Nullable;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import Bean.OrderDetailScreen;
import model.Item;
import model.Order;


public class Peripherals extends AppCompatActivity  {

  private static final String[] PERIPHERALS_NAMES = new String[]{"Generate Token", "Heart Rate Monitor", "Health Thermometer"};
  public final static String EXTRA_PERIPHERAL_INDEX = "PERIPHERAL_INDEX";
  private ViewPager mViewPager;
  private Button updateOrderButton;
  private Button paymentButton;

  AlarmManager alarmManager;
  PendingIntent pendingIntent;

  @Override
  protected void onCreate(@Nullable  Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_peripherals_list);
    updateOrderButton = (Button) findViewById(R.id.updateOrderButton);
    updateOrderButton.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        handleClickButon();
      }
    });
    initView();
    alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
    Intent alarmIntent = new Intent(this, MyBroadCastReceiver.class);
    pendingIntent = PendingIntent.getBroadcast(this, 0, alarmIntent, 0);
    alarmManager.setRepeating(AlarmManager.RTC_WAKEUP, new Date().getTime(), 30*1000, pendingIntent);
    handleClickPaymentButton();
    BLEBroadcaster broadcaster = new BLEBroadcaster((BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE));
    broadcaster.start();
  }



  private void initView(){
    mViewPager = (ViewPager) findViewById(R.id.view_pager);
    TabLayout mTabLayout = (TabLayout) findViewById(R.id.tab_layout);
    mTabLayout.setupWithViewPager(mViewPager);
//    mViewPager.setAdapter(new MyAdapter(getSupportFragmentManager(), orders));
    OrderDetailScreen.handler = new Handler();
    OrderDetailScreen.viewPager = mViewPager;
    OrderDetailScreen.fragmentManager = getSupportFragmentManager();
    OrderDetailScreen.updateView();

  }

  private void handleClickButon(){
    OrderDetailScreen.updateView();
  }

  private void handleClickPaymentButton(){
    paymentButton = (Button) findViewById(R.id.paymentButton);
    paymentButton.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        goToPaymentActivity();
        Log.d("DEBUG", "-------------------------Vasdadadasdasdasdasdsd-----------------");
      }
    });
  }

  private void goToPaymentActivity(){
    Intent intent = new Intent(this, PaymentActivity.class);
    startActivity(intent);
  }

}


