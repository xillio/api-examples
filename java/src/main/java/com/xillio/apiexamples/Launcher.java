package com.xillio.apiexamples;

public class Launcher {
    public static void main(String args[]) {
        if ("Ping".equals(args[0])) {
            Ping.main(args);
        }

        if ("PingHeaders".equals(args[0])) {
            PingHeaders.main(args);
        }

        if ("GetToken".equals(args[0])) {
            GetToken.main(args);
        }

        if ("GetRoot".equals(args[0])) {
            GetRoot.main(args);
        }

        if ("GetFolder".equals(args[0])) {
            GetFolder.main(args);
        }
    }
}