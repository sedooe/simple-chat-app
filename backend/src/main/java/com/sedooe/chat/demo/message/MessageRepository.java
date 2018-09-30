package com.sedooe.chat.demo.message;

import com.sedooe.chat.demo.message.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {

    Iterable<Message> findAllByOrderByCreationTime();
}
