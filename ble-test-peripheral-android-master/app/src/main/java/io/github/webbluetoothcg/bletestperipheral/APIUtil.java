package io.github.webbluetoothcg.bletestperipheral;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Set;

public class APIUtil {
    HttpURLConnection httpURLConnection;

    public APIUtil getRequest() throws Exception {
        String apiUrl = "http://icanhazip.com"  ;

        URL url = new URL(apiUrl);
        httpURLConnection = (HttpURLConnection) url.openConnection();
        httpURLConnection.setRequestMethod("GET");
        httpURLConnection.setDoOutput(true);
//        try(OutputStream os = httpURLConnection.getOutputStream()) {
//            byte[] input = data.getBytes("UTF-8");
//            os.write(input, 0, input.length);
//        }
        return this;
    }

//    public JSONObject getResponseBody() throws IOException, ParseException {
//        String responseBody = CommonUtil.getResponseBody(httpURLConnection.getInputStream());
//        JSONParser parser = new JSONParser();
//        return (JSONObject) parser.parse(responseBody);
//    }

    public String getResponseBody() throws IOException {
        StringBuilder response = new StringBuilder("");
        String responseSingle = null;
        BufferedReader br1 = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream(), "UTF-8"));
        while ((responseSingle = br1.readLine()) != null) {
            response.append(responseSingle);
        }
        return response.toString();
    }
}
