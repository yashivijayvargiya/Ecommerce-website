package com.yt.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.yt.ecommerce.entity.OrderDetail;
import com.yt.ecommerce.entity.OrderInput;
import com.yt.ecommerce.entity.TransactionDetails;
import com.yt.ecommerce.service.OrderDetailService;

@RestController
public class OrderDetailController {

	@Autowired
	private OrderDetailService orderDetailService;

	@PreAuthorize("hasRole('User')")
	@PostMapping({ "/placeOrder/{isSingleProductCheckout}" })
	public void placeOrder(@PathVariable(name = "isSingleProductCheckout") boolean isSingleProductCheckout,
			@RequestBody OrderInput orderInput) {
		orderDetailService.placeOrder(orderInput, isSingleProductCheckout);
	}

	@PreAuthorize("hasRole('User')")
	@GetMapping({ "/getOrderDetails" })
	public List<OrderDetail> getOrderDetails() {
		return orderDetailService.getOrderDetails();
	}

	@PreAuthorize("hasRole('Admin')")
	@GetMapping({ "/getAllOrderDetails/{status}" })
	public List<OrderDetail> getAllOrderDetails(@PathVariable(name = "status") String status) {
		return orderDetailService.getAllOrderDetails(status);
	}

	@PreAuthorize("hasRole('Admin')")
	@GetMapping({ "/markOrderAsDelivered/{orderId}" })
	public void markOrderAsDelivered(@PathVariable(name = "orderId") Integer orderId) {
		orderDetailService.markOrderAsDelivered(orderId);

	}

	@PreAuthorize("hasRole('User')")
	@GetMapping({ "/createTransaction/{amount}" })
	public TransactionDetails createTransaction(@PathVariable(name = "amount") Double amount) {
		return orderDetailService.createTransaction(amount);

	}

}
