package com.yt.ecommerce.dao;

import org.springframework.data.repository.CrudRepository;

import com.yt.ecommerce.entity.User;

public interface UserDao extends CrudRepository<User, String> {

}
