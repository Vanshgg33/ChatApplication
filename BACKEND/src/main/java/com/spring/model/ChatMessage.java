package com.spring.model;

import lombok.Data;

import java.awt.*;
@Data

public class ChatMessage {
    private String content;
    private String sender;
    private MessageType type;
}
