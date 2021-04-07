package io.github.webbluetoothcg.bletestperipheral;

import android.app.job.JobParameters;
import android.app.job.JobService;
import android.util.Log;

import java.util.Date;


public class OrderSchedule extends JobService {
    private boolean jobCancelled = false;
    private static final String TAG = "ExampleJobService";
    private static int turn = 1;
    @Override
    public boolean onStartJob(JobParameters jobParameters) {
        Log.d("DEBUG", "---------------------------------vao dayyyyyyy-----------------------------------------");
        Log.d("Time: ", new Date().toString());
//        doBackgroundWork(jobParameters);
        jobFinished(jobParameters, true);
        return true;
    }

    private void doBackgroundWork(final JobParameters params) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                Log.d(TAG, "run: " + turn);
//                for (int i = 0; i < 10; i++) {
//                    Log.d(TAG, "run: " + i);
//                    if (jobCancelled) {
//                        return;
//                    }
//                    try {
//                        Thread.sleep(1000);
//                    } catch (InterruptedException e) {
//                        e.printStackTrace();
//                    }
//                }
                turn++;
                jobFinished(params, true);
            }
        }).start();
    }

        @Override
        public boolean onStopJob(JobParameters params) {
            Log.d(TAG, "Job cancelled before completion");
            jobCancelled = true;
            return true;
        }
}
