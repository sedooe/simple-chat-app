package com.sedooe.chat.demo.message;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Objects;

@Getter
@NoArgsConstructor
@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String message;

    private Long creationTime;

    Message(MessageInfo messageInfo) {
        this.name = messageInfo.getName();
        this.message = messageInfo.getMessage();
    }

    @PrePersist
    protected void preSave() {
        this.creationTime = Calendar.getInstance().getTimeInMillis();
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof Message)) {
            return false;
        }

        Message that = (Message) o;
        return this.getId() != null && Objects.equals(id, that.id);
    }
}