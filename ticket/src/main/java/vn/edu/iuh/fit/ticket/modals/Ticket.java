package vn.edu.iuh.fit.ticket.modals;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "tickets")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Ticket {
    @Id
    private long id;
    private String tickName;
    private String type;
    private Date startDate;
    private String time;
    private double price;
    private String startPoint;
    private String endPoint;
    @OneToMany
    @Column(name = "customer_id")
    private Customer customer;
}
