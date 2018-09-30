package com.sedooe.chat.demo.message;

import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@AllArgsConstructor
@Controller
public class MessageController {

    private MessageRepository messageRepository;

    @MessageMapping("/message")
    @SendTo("/messages")
    public Message greeting(MessageInfo messageInfo) throws Exception {
        return messageRepository.save(new Message(messageInfo));
    }

    @ResponseBody
    @GetMapping("/messages")
    @CrossOrigin("*")
    public Iterable<Message> messages() {
        return messageRepository.findAllByOrderByCreationTime();
    }
}
