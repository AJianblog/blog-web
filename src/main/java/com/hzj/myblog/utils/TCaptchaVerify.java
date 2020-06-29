package com.hzj.myblog.utils;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URLEncoder;


/**
 * 腾讯防水墙验证
 *
 * @author hzj
 */
public class TCaptchaVerify {

    private static final Logger logger = LoggerFactory.getLogger(TCaptchaVerify.class);

    private static final String APP_ID = "2024414229";
    private static final String APP_SECRET = "00LgTYcjRH7uXq0LYD1fRqA**";
    private static final String VERIFY_URI = "https://restapi.amap.com/v3/config/district?key=%s&keywords=%s&subdistrict=%s&extensions=%s";

    public static int verifyTicket(String ticket, String rand, String userIp) {
        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpGet httpGet;
        CloseableHttpResponse response = null;
        try {
            httpGet = new HttpGet(String.format(VERIFY_URI,
                    APP_ID,
                    APP_SECRET,
                    URLEncoder.encode(ticket, "UTF-8"),
                    URLEncoder.encode(rand, "UTF-8"),
                    URLEncoder.encode(userIp, "UTF-8")
            ));
            response = httpclient.execute(httpGet);

            HttpEntity entity = response.getEntity();
            if (entity != null) {
                String res = EntityUtils.toString(entity);
                logger.info("腾讯防水墙验证结果 " + res);

                JsonObject jsonObject = new JsonParser().parse(res).getAsJsonObject();
                // 返回码 1:验证成功，0:验证失败，100:AppSecretKey参数校验错误
                int code = jsonObject.get("response").getAsInt();
                // 恶意等级 [0,100]
                int evilLevel = jsonObject.get("evil_level").getAsInt();

                // 验证成功
                if (code == 1) return evilLevel;
            }
        } catch (java.io.IOException e) {
            // 忽略
        } finally {
            try {
                assert response != null;
                response.close();
            } catch (Exception ignore) {
            }
        }
        return -1;
    }
}
