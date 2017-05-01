package entity;

import java.util.Date;

/**
 * Created by kaspe on 2016-10-26.
 */

public class Order
{
    private Date date;
    private User user;
    private CoffeeShop coffeeShop;
    private String platform;

    public Order(Date date, User user, CoffeeShop coffeeShop, String platform)
    {
        this.date = date;
        this.user = user;
        this.coffeeShop = coffeeShop;
        this.platform = platform;
    }

    public Date getDate()
    {
        return date;
    }

    public void setDate(Date date)
    {
        this.date = date;
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }

    public CoffeeShop getCoffeeShop()
    {
        return coffeeShop;
    }

    public void setCoffeeShop(CoffeeShop coffeeShop)
    {
        this.coffeeShop = coffeeShop;
    }

    public String getPlatform()
    {
        return platform;
    }

    public void setPlatform(String platform)
    {
        this.platform = platform;
    }
}
