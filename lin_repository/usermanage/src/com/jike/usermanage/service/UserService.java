package com.jike.usermanage.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.jike.usermanage.exception.UserNotFound;
import com.jike.usermanage.model.User;

public interface UserService {
	//����û�
	public void addUser(User user);
	//�޸��û�
	public User updateUser(User user) throws UserNotFound;
	//ɾ���û�,�����û����ɾ��
	public User deleteUser(int id) throws UserNotFound;
	//��ѯ�����û�
	public User getUser(int id);
	//��ѯ�����û�
	public List<User> getUsers();
		
	//����ҳ��������ѯ
	public List<User> getUsersByConditionNoPage(String phone,String address);
	
	//����ҳ������ѯ(��Ҫ�õ��û��б��ҵõ���ҳ��Ϣ)
	public Page<User> getUsersByConditionWithPage(String phone,String address,Integer page,Integer pageSize);
	//����ҳ������ѯ(�õ��û��б�)
	//public List<User> getUsersByCondition(String phone,String address,Integer page,Integer pageSize);
}
