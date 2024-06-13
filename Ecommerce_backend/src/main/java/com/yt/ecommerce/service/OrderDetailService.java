package com.yt.ecommerce.service;

import java.util.ArrayList;
import java.util.List;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.yt.ecommerce.configuration.JwtRequestFilter;
import com.yt.ecommerce.dao.CartDao;
import com.yt.ecommerce.dao.OrderDetailDao;
import com.yt.ecommerce.dao.ProductDao;
import com.yt.ecommerce.dao.UserDao;
import com.yt.ecommerce.entity.Cart;
import com.yt.ecommerce.entity.OrderDetail;
import com.yt.ecommerce.entity.OrderInput;
import com.yt.ecommerce.entity.OrderProductQuantity;
import com.yt.ecommerce.entity.Product;
import com.yt.ecommerce.entity.TransactionDetails;
import com.yt.ecommerce.entity.User;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailService {
	private static final String ORDER_PLACED = "Placed";
	private static final String KEY = "rzp_test_hzqBVKQIUfY0SL";
	private static final String KEY_SECRET = "javaXbRd0eLeBm5IDbYjTG3Q";
	private static final String CURRENCY = "INR";

	@Autowired
	private OrderDetailDao orderDetailDao;

	@Autowired
	private ProductDao productDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private CartDao cartDao;

	public void placeOrder(OrderInput orderInput, boolean isSingleProductCheckout) {
		List<OrderProductQuantity> productQuantityList = orderInput.getOrderProductQuantity();
		for (OrderProductQuantity o : productQuantityList) {
			Product product = productDao.findById(o.getProductId()).get();
			String currentUser = JwtRequestFilter.CURRENT_USER;
			User user = userDao.findById(currentUser).get();
			OrderDetail orderDetail = new OrderDetail(orderInput.getFullName(), orderInput.getFullAddress(),
					orderInput.getContactNumber(), orderInput.getAlternateContactNumber(), ORDER_PLACED,
					product.getProductDiscountedPrice() * o.getQuantity(), product, user

			);

			if (!isSingleProductCheckout) {
				List<Cart> carts = cartDao.findByUser(user);
				carts.stream().forEach(x -> cartDao.deleteById(x.getCartId()));
			}
			orderDetailDao.save(orderDetail);

		}

	}

	public List<OrderDetail> getOrderDetails() {
		String currentUser = JwtRequestFilter.CURRENT_USER;
		User user = userDao.findById(currentUser).get();
		return orderDetailDao.findByUser(user);

	}

	public List<OrderDetail> getAllOrderDetails(String status) {
		List<OrderDetail> orderDetails = new ArrayList<>();
		if (status.equals("All")) {
			orderDetailDao.findAll().forEach(x -> orderDetails.add(x));
		} else {
			orderDetailDao.findByOrderStatus(status).forEach(x -> orderDetails.add(x));
		}

		return orderDetails;
	}

	public void markOrderAsDelivered(Integer orderId) {
		OrderDetail orderDetail = orderDetailDao.findById(orderId).get();
		if (orderDetail != null) {
			orderDetail.setOrderStatus("Delivered");
			orderDetailDao.save(orderDetail);
		}

	}

	public TransactionDetails createTransaction(Double amount) {

		try {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("amount", (amount * 100));
			jsonObject.put("currency", CURRENCY);

			RazorpayClient razorpayClient = new RazorpayClient(KEY, KEY_SECRET);
			Order order = razorpayClient.orders.create(jsonObject);
			return prepareTransactionDetails(order);
		} catch (Exception e) {
			System.out.println(e.getMessage());

		}
		return null;
	}

	private TransactionDetails prepareTransactionDetails(Order order) {
		String orderId = order.get("id");
		String currency = order.get("currency");
		Integer amount = order.get("amount");
		TransactionDetails transactionDetails = new TransactionDetails(orderId, currency, amount, KEY);
		return transactionDetails;
	}

}
