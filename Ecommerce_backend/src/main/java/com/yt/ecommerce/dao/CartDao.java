package com.yt.ecommerce.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.yt.ecommerce.entity.Cart;
import com.yt.ecommerce.entity.User;

public interface CartDao extends CrudRepository<Cart, Integer> {

	public List<Cart> findByUser(User user);

}
