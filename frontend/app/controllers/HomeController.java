package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import java.util.Calendar;
import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import play.libs.Json;
import play.mvc.*;
import javax.inject.*;
import models.Product;


import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;


class AppSummary {
    private String content;
    private String date;

    AppSummary(String content, String date) {
        this.content = content;
        this.date = date;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}

public class HomeController extends Controller {

    public Result appSummary() {
        JsonNode jsonNode = Json.toJson(new AppSummary("Java Play React Seed", "20190604"));
        return ok(jsonNode).as("application/json");
    }

    public Result date() {
        String pattern = "MM/dd/yyyy HH:mm:ss";
        DateFormat df = new SimpleDateFormat(pattern);
        Date today = Calendar.getInstance().getTime();
        String todayAsString = df.format(today);
        JsonNode jsonNode = Json.toJson(new AppSummary("Java Play React Seed", todayAsString));
        return ok(jsonNode).as("application/json");
    }

//    public Result save() {
//        Product product = new Product();
//        product.description = "Hello";
//        product.ean = 123L;
//        product.id = 456L;
//        product.name = "World";
////        product.save();
//        JsonNode jsonNode = Json.toJson(product);
//        return ok(jsonNode).as("application/json");
//
//    }
}
