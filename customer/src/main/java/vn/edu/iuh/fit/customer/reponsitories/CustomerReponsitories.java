package vn.edu.iuh.fit.customer.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.customer.modals.Customer;

@Repository
public interface CustomerReponsitories extends JpaRepository<Customer,Long> {
}
