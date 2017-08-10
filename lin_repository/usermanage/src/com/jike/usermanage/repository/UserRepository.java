package com.jike.usermanage.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jike.usermanage.model.User;

public interface UserRepository extends JpaRepository<User,Integer> {
		
	//查询需求： 从数据库中查询电话号码(phone)以指定字符串开始(例如：136)的，并且地址(address)中包含指定字符串（例如：路）的记录
	//select * from user where phone like '136%' and address like '%路%' order by phone desc limit 0,2
	List<User> findTop2ByPhoneStartingWithAndAddressContainingOrderByPhoneDesc(String phone,String address);
	List<User> findTop2ByPhoneStartingWithAndAddressContaining(String phone,String address,Sort sort);
	
	Page<User> findByPhoneStartingWithAndAddressContaining(String phone,String address,Pageable pageable);
	
 	
}
