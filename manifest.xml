<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="kr.coincode.mobileapp"
    android:versionCode="26"
    android:versionName="1.1.11">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/> <!-- Approximate location - If you want to use promptLocation for letting OneSignal know the user location. -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/> <!--  Precise location If you want to use promptLocation for letting OneSignal know the user location. -->

    <uses-sdk android:targetSdkVersion="22" />

    <application
      android:name=".MainApplication"
      android:allowBackup="true"
      android:hardwareAccelerated="true"
      android:largeHeap="true"
      android:supportsRtl="true"
      android:label="@string/app_name"
      android:icon="@drawable/icon"
      android:theme="@style/SplashTheme">

      <activity
        android:launchMode="singleTop"
        android:name="kr.coincode.mobileapp.SplashActivity"
        android:label="@string/app_name"
        android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
        android:windowSoftInputMode="adjustResize">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
      </activity>

        <activity android:name=".MainActivity"
        android:exported="true"
         >
        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />

            <data android:scheme="@string/kakao_scheme"
                android:host="@string/kakaolink_host" />
        </intent-filter>
    </activity>
    <meta-data
        android:name="com.kakao.sdk.AppKey"
        android:value="@string/kakao_app_key" />
      <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
      <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
      <meta-data
          android:name="com.google.android.gms.ads.APPLICATION_ID"
          android:value="ca-app-pub-3267825463557272~7016866542"/>
    </application>
</manifest>
