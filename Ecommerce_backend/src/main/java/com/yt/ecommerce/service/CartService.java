package com.yt.ecommerce.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yt.ecommerce.configuration.JwtRequestFilter;
import com.yt.ecommerce.dao.CartDao;
import com.yt.ecommerce.dao.ProductDao;
import com.yt.ecommerce.dao.UserDao;
import com.yt.ecommerce.entity.Cart;
import com.yt.ecommerce.entity.Product;
import com.yt.ecommerce.entity.User;

@Service
public class CartService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private ProductDao productDao;

	@Autowired
	private CartDao cartDao;

	public Cart addToCart(Integer productId) {
		Product product = productDao.findById(productId).get();
		String username = JwtRequestFilter.CURRENT_USER;
		User user = null;
		if (username != null) {
			user = userDao.findById(username).get();
		}

		List<Cart> cartList = cartDao.findByUser(user);
		List<Cart> filteredList = cartList.stream().filter(x -> x.getProduct().getProductId() == productId)
				.collect(Collectors.toList());
		if (filteredList.size() > 0) {
			return null;
		}
		if (product != null && user != null) {
			Cart cart = new Cart(product, user);
			return cartDao.save(cart);

		}

		return null;

	}

	public List<Cart> getCartDetails() {
		String username = JwtRequestFilter.CURRENT_USER;
		User user = userDao.findById(username).get();
		return cartDao.findByUser(user);

	}

	public void deleteCartItem(Integer cartId) {
		cartDao.deleteById(cartId);

	}

}
