package com.yt.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yt.ecommerce.dao.RoleDao;
import com.yt.ecommerce.entity.Role;

@Service
public class RoleService {

	@Autowired
	private RoleDao roleDao;

	public Role createNewRole(Role role) {
		return roleDao.save(role);
	}
}