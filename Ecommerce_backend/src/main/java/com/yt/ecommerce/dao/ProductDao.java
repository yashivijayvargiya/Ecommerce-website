package com.yt.ecommerce.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.yt.ecommerce.entity.Product;

public interface ProductDao extends CrudRepository<Product, Integer> {

	public List<Product> findAll(Pageable pageable);

	public List<Product> findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(String Key1,
			String Key2, Pageable pageable);

}