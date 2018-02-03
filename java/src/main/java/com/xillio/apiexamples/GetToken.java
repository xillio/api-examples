package com.xillio.apiexamples;

import org.json.JSONObject;

import java.util.Base64;


public class GetToken {
    public static void main(String args[]) {
        String clientId = args[1];
        String clientSecret = args[2];
        String username = args[3];
        String password = args[4];
        byte[] bytesEncoded = Base64.getEncoder().encode((clientId + ":" + clientSecret).getBytes());
        String auth = "Basic " + new String(bytesEncoded);
        JSONObject oauth = Utils.postData("https://sandbox.xill.io/oauth/token", "grant_type=password&username=" + username + "&password=" + password, auth);

        System.out.println(oauth.toString(2));
    }
}