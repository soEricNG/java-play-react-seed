package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import play.libs.Json;
import play.mvc.*;
import javax.inject.*;
//import models.Product;
import models.Dessert;


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

  public Result desserts() {
    List<Dessert> result = new ArrayList<>();
    result.add(new Dessert("Cupcake", 305, 3.7, 67, 4.3));
    result.add(new Dessert("Donut", 452, 25.0, 51, 4.9));
    result.add(new Dessert("Eclair", 262, 16.0, 24, 6.0));
    result.add(new Dessert("Frozen yoghurt", 59, 6.0, 24, 4.0));
    result.add(new Dessert("Gingerbread", 356, 16.0, 49, 3.9));
    result.add(new Dessert("Honeycomb", 408, 3.2, 87, 6.5));
    result.add(new Dessert("Ice cream sandwich", 237, 9.0, 37, 4.3));
    result.add(new Dessert("Jelly Bean", 375, 0.0, 94, 0.0));
    result.add(new Dessert("KitKat", 518, 26.0, 65, 7.0));
    result.add(new Dessert("Lollipop", 392, 0.2, 98, 0.0));
    result.add(new Dessert("Marshmallow", 318, 0.0, 81, 2.0));
    result.add(new Dessert("Nougat", 360, 19.0, 9, 37.0));
    result.add(new Dessert("Oreo", 437, 18.0, 63, 4.0));

    JsonNode jsonNode = Json.toJson(result);
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
