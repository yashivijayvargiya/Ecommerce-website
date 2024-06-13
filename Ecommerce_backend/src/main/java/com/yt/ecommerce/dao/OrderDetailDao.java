package com.yt.ecommerce.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.yt.ecommerce.entity.OrderDetail;
import com.yt.ecommerce.entity.User;

public interface OrderDetailDao extends CrudRepository<OrderDetail, Integer> {

	public List<OrderDetail> findByUser(User user);

	public List<OrderDetail> findByOrderStatus(String status);

}