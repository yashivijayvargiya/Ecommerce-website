package com.yt.ecommerce.dao;

import org.springframework.data.repository.CrudRepository;

import com.yt.ecommerce.entity.Role;

public interface RoleDao extends CrudRepository<Role, String> {

}
