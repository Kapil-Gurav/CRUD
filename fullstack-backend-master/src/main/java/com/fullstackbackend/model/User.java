package com.fullstackbackend.model;

import javax.persistence.*;


@Entity
@Table(name = "users")
@NamedStoredProcedureQuery(
        name = "User.updateSingleUser",
        procedureName = "update_single_user",
        parameters = {
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "user_id", type = Long.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_application_name", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_hall_name", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_email", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_mobile", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_start_date", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_end_date", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_rent", type = String.class)
        }
)
public class User {

    @Id
    @GeneratedValue
    private Long id;
    private String application_name;
    private String hall_name;
    private String email;
    private String mobile;
    private String start_date;
    private String end_date;
    private String rent;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public String getRent() {
        return rent;
    }

    public void setRent(String rent) {
        this.rent = rent;
    }


    public String getApplication_name() {
        return application_name;
    }

    public void setApplication_name(String application_name) {
        this.application_name = application_name;
    }

    public String getHall_name() {
        return hall_name;
    }

    public void setHall_name(String hall_name) {
        this.hall_name = hall_name;
    }
}
