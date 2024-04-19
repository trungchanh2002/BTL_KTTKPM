package vn.edu.iuh.fit.ticket.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.ticket.modals.Ticket;

@Repository
public interface TicketReponsitory extends JpaRepository<Ticket,Long> {
}
