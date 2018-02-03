package com.xillio.apiexamples;

import org.json.*;

public class GetFolder {
    public static void main(String args[]) {
        String token = Utils.getToken(args[1], args[2], args[3], args[4]);
        String path = "";
        if (args.length > 5) {
            path = args[5];
        }
        JSONObject object = Utils.getObject("https://sandbox.xill.io/v2/entities" + path + "?scope=children", "Bearer " + token);

        System.out.println(object.toString(2));
    }
}