package com.fullstackbackend.repository;

import java.util.List;
import com.fullstackbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<User,Long> {
    @Query(value = "SELECT * FROM get_all_users()", nativeQuery = true)
    List<User> get_All_Users();

    @Procedure(procedureName = "delete_single_user")
    void delete_single_user(Long userId);

    @Modifying
    @Transactional
    @Query(value = "CALL update_single_user(:userId, :applicationName, :hallName, :email, :mobile, :startDate, :endDate, :rent)",
            nativeQuery = true)
    void update_single_user(
            @Param("userId") Long userId,
            @Param("applicationName") String applicationName,
            @Param("hallName") String hallName,
            @Param("email") String email,
            @Param("mobile") String mobile,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate,
            @Param("rent") String rent
    );
}