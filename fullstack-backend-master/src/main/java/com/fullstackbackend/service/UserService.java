package com.fullstackbackend.service;


import com.fullstackbackend.model.User;

import java.util.List;

public interface UserService {
    User createUser(User user);
    List<User> getAllUsers();
    User getUserById(Long id);
    User updateUser(Long id, User user);
    String deleteUser(Long id);

    List<User> get_All_Users();
    void delete_single_user(Long id);

    User update_single_user(Long id, User user);
}
