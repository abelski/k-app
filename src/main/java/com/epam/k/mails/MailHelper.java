package com.epam.k.mails;

import java.util.Date;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;

import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;


/**
 * Created by Ruslan_Mostov on 10/15/2016.
 */
@Component
public class MailHelper
{
   public void setSender(JavaMailSenderImpl sender)
   {
      this.sender = sender;
   }

   private JavaMailSenderImpl sender;

   public void sendMail(final String mailTo, final String title, final String message)
   {
      org.springframework.mail.SimpleMailMessage email = new org.springframework.mail.SimpleMailMessage();
      email.setFrom("hackathonhere@gmail.com");
      email.setSubject(title);
      email.setTo(mailTo);
      email.setText(message);

      MimeMessagePreparator preparator = mimeMessage ->
      {
         mimeMessage.setFrom(new InternetAddress("hackathonhere@gmail.com"));

         mimeMessage.setContent(message, "text/html; charset=UTF-8");
         mimeMessage.setSubject(title, "UTF-8");
         mimeMessage.setSentDate(new Date());
         mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(mailTo));

         mimeMessage.setHeader("Content-Type", "text/html; charset=UTF-8");
         mimeMessage.setHeader("Content-Transfer-Encoding", "base64");
      };

      sender.send(preparator);
   }
}
