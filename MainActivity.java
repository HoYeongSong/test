package kr.coincode.mobileapp;

import com.facebook.react.ReactActivity;
import com.google.android.gms.ads.MobileAds;

import android.content.Intent;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "coincode";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
        MobileAds.initialize(this, "ca-app-pub-3267825463557272~7016866542");
    }
}

