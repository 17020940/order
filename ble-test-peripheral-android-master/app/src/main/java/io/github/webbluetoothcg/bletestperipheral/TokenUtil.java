package io.github.webbluetoothcg.bletestperipheral;

import android.util.Base64;

import org.json.JSONException;
import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class TokenUtil {
    private String secretKey;

    public TokenUtil(String secretKey){
        this.secretKey = secretKey;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    private static final String JWT_HEADER = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";

    public String generateJWT() throws Exception{
        String header = encode(JWT_HEADER.getBytes(StandardCharsets.UTF_8));
        String payload = getPayload();
        String signature = hmacSha256(header + "." + payload, secretKey);
        return header + "." + payload + "." + signature;
    }

    private  String encode(byte[] bytes) {
        return Base64.encodeToString(bytes, Base64.NO_PADDING | Base64.NO_WRAP | Base64.URL_SAFE );
    }

    private  String getPayload() throws JSONException {
        JSONObject payload = new JSONObject();
        payload.put("restaurentId", "1");
        payload.put("exp", new Date().getTime());
        return encode(payload.toString().getBytes(StandardCharsets.UTF_8));
    }

    private  String hmacSha256(String data, String secret) throws  Exception {
        try {

            //MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = secret.getBytes(StandardCharsets.UTF_8);//digest.digest(secret.getBytes(StandardCharsets.UTF_8));

            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(hash, "HmacSHA256");
            sha256Hmac.init(secretKey);

            byte[] signedBytes = sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));

            return encode(signedBytes);
        } catch ( Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

}
