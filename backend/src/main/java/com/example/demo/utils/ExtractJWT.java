package com.example.demo.utils;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class ExtractJWT {

    public static String payloadJWTExtract(String token, String extraction) {
        token.replace("Bearer", "");
        String[] chunks = token.split("\\.");
        // array of string where we split the token by .
        Base64.Decoder decoder = Base64.getUrlDecoder(); //these are base64 encoded
        String payload = new String(decoder.decode(chunks[1])); //this is the payload
        //we only decode the payload

        String[] entries = payload.split(",");
        Map<String, String> map = new HashMap<String, String>();

        for (String entry: entries) {
            String[] keyValue = entry.split(":");
            if(keyValue[0].equals(extraction)) {
                int remove = 1;
                if(keyValue[1].endsWith("}")) {
                    remove = 2;
                }
                keyValue[1] = keyValue[1].substring(0, keyValue[1].length() - remove);;
                keyValue[1] = keyValue[1].substring(1);
                map.put(keyValue[0], keyValue[1]);
            }

        }

        if(map.containsKey(extraction)) {
            return map.get(extraction);
        }

        return null;
    }

}
