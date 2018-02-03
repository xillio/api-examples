package com.xillio.apiexamples;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

class Utils {

    public static JSONObject getObject(String urlStr) {
        return getObject(urlStr, "");
    }

    public static JSONObject getObject(String urlstr, String auth) {
        HttpURLConnection conn = null;
        StringBuilder sb = new StringBuilder();
        try {
            URL url = new URL(urlstr);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            if (!auth.isEmpty()) {
                conn.setRequestProperty("Authorization", auth);
            }
            conn.setRequestProperty("Accept", "application/json");
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line + "\n");
            }
            br.close();

        } catch (MalformedURLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }

        return new JSONObject(sb.toString());
    }

    public static JSONArray getArray(String urlStr) {
        return getArray(urlStr, "");
    }

    public static JSONArray getArray(String urlstr, String auth) {
        HttpURLConnection conn = null;
        StringBuilder sb = new StringBuilder();
        try {
            URL url = new URL(urlstr);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            if (!auth.isEmpty()) {
                conn.setRequestProperty("Authorization", auth);
            }
            conn.setRequestProperty("Accept", "application/json");
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line + "\n");
            }
            br.close();

        } catch (MalformedURLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
        System.out.println(sb.toString());
        return new JSONArray(sb.toString());
    }

    public static JSONObject postData(String urlStr, String data) {
        return postData(urlStr, data, "");
    }

    public static JSONObject postData(String urlStr, String data, String auth) {
        HttpURLConnection conn = null;
        StringBuilder sb = new StringBuilder();
        try {
            URL url = new URL(urlStr);
            conn = (HttpURLConnection) url.openConnection();
            byte[] postData = data.getBytes(StandardCharsets.UTF_8);
            int postDataLength = postData.length;
            conn.setDoOutput(true);
            conn.setInstanceFollowRedirects(false);
            conn.setRequestMethod("POST");
            if (!auth.isEmpty()) {
                conn.setRequestProperty("Authorization", auth);
            }
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.setRequestProperty("charset", "utf-8");
            conn.setRequestProperty("Content-Length", Integer.toString(postDataLength));
            conn.setUseCaches(false);
            conn.getOutputStream().write(postData);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line + "\n");
            }
            br.close();

        } catch (MalformedURLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }

        return new JSONObject(sb.toString());
    }

    public static String getToken(String clientId, String clientSecret, String username, String password) {

        byte[] bytesEncoded = Base64.getEncoder().encode((clientId + ":" + clientSecret).getBytes());
        String auth = "Basic " + new String(bytesEncoded);
        JSONObject oauth = Utils.postData("https://sandbox.xill.io/oauth/token", "grant_type=password&username=" + username + "&password=" + password, auth);

        return oauth.getString("access_token");

    }
}