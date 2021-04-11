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
import android.view.View;
import android.widget.Button;

import org.jetbrains.annotations.Nullable;

import java.util.Date;

import Bean.OrderDetailScreen;
import Bean.PaymentScreen;

//import androidx.annotation.NonNull;
//import androidx.lifecycle.Lifecycle;
//import androidx.lifecycle.LifecycleOwner;
//import androidx.lifecycle.LiveData;
//import androidx.lifecycle.Observer;
//import androidx.work.Data;
//import androidx.work.PeriodicWorkRequest;
//import androidx.work.WorkInfo;
//import androidx.work.WorkManager;


public class PaymentActivity extends AppCompatActivity  {

  private ViewPager mViewPager;


  @Override
  protected void onCreate(@Nullable  Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_payment);
    initView();

  }



  private void initView(){
    mViewPager = (ViewPager) findViewById(R.id.view_pager);
    TabLayout mTabLayout = (TabLayout) findViewById(R.id.tab_layout);
    mTabLayout.setupWithViewPager(mViewPager);
//    mViewPager.setAdapter(new MyAdapter(getSupportFragmentManager(), orders));
    PaymentScreen.handler = new Handler();
    PaymentScreen.viewPager = mViewPager;
    PaymentScreen.fragmentManager = getSupportFragmentManager();
    PaymentScreen.updateView();

  }


}


