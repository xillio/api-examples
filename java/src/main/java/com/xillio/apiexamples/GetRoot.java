package com.xillio.apiexamples;

import org.json.JSONObject;

public class GetRoot {
    public static void main(String args[]) {
        String token = Utils.getToken(args[1], args[2], args[3], args[4]);

        JSONObject root = Utils.getObject("https://sandbox.xill.io/v2/entities?scope=children", "Bearer " + token);

        System.out.println(root.toString(2));
    }
}