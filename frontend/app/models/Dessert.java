package models;

public class Dessert {
  private String name;
  private Integer calories;
  private Double fat;
  private Integer carbs;
  private Double protein;

  public Dessert(String name, Integer calories, Double fat, Integer carbs, Double protein) {
    this.name = name;
    this.calories = calories;
    this.fat = fat;
    this.carbs = carbs;
    this.protein = protein;
  }

  public String getName() {
    return name;
  }

  public Integer getCalories() {
    return calories;
  }

  public Double getFat() {
    return fat;
  }

  public Integer getCarbs() {
    return carbs;
  }

  public Double getProtein() {
    return protein;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setCalories(Integer calories) {
    this.calories = calories;
  }

  public void setFat(Double fat) {
    this.fat = fat;
  }

  public void setCarbs(Integer carbs) {
    this.carbs = carbs;
  }

  public void setProtein(Double protein) {
    this.protein = protein;
  }
}
