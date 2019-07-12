package models;

import javax.persistence.Entity;
import play.data.validation.*;


@Entity
public class Product extends BaseModel {

  @Constraints.Required
  private Long ean;

  @Constraints.Required
  private String name;

  private String description;

  public Product(Long ean, String name) {
    this.ean = ean;
    this.name = name;
  }

  public Long getEan() {
    return ean;
  }

  public void setEan(Long ean) {
    this.ean = ean;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  //    public static final Finder<Long, Product> find = new Finder<>(Product.class);
}