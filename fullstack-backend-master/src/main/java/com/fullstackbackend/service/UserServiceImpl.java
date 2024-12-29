package com.fullstackbackend.service;


import com.fullstackbackend.exception.UserNotFoundException;
import com.fullstackbackend.model.User;
import com.fullstackbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public User updateUser(Long id, User newUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setApplication_name(newUser.getApplication_name());
                    user.setHall_name(newUser.getHall_name());
                    user.setEmail(newUser.getEmail());
                    user.setMobile(newUser.getMobile());
                    user.setStart_date(newUser.getStart_date());
                    user.setEnd_date(newUser.getEnd_date());
                    user.setRent(newUser.getRent());

                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public String deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with id " + id + " has been deleted successfully.";
    }


    @Override
    public List<User> get_All_Users() {
        return userRepository.get_All_Users();
    }

//    @Override
//    public String delete_single_user(Long id) {
//        if (!userRepository.existsById(id)) {
//            throw new UserNotFoundException(id);
//        }
//        userRepository.delete_single_user(id);
//        return "User with id " + id + " has been deleted successfully.";
//    }


    public void delete_single_user(Long userId) {
        try {
            userRepository.delete_single_user(userId);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete user: " + e.getMessage());
        }
    }

    @Override
    public User update_single_user(Long id, User user) {
        try {
            userRepository.update_single_user(
                    id,
                    user.getApplication_name(),
                    user.getHall_name(),
                    user.getEmail(),
                    user.getMobile(),
                    user.getStart_date(),
                    user.getEnd_date(),
                    user.getRent()
            );

            // Fetch and return the updated user
            return userRepository.findById(id)
                    .orElseThrow(() -> new UserNotFoundException(id));
        } catch (Exception e) {
            throw new RuntimeException("Failed to update user with ID " + id + ": " + e.getMessage());
        }
    }

}
