package com.epam.k;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import com.epam.k.configuration.WebConfiguration;
import com.epam.k.mails.MailHelper;


/**
 * Created by Ruslan_Mostov on 10/15/2016.
 */
public class SenderTester
{
   public static void main(String[] args)
   {
      AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(WebConfiguration.class);
      JavaMailSenderImpl sender = context.getBean(JavaMailSenderImpl.class);
      MailHelper helper = new MailHelper();
      helper.setSender(sender);

      String recepient = "r.mostric@gmail.com";
      String title = "We're coming";
      String message = "Believe us";
      helper.sendMail(recepient, title, message);
      context.close();
   }
}
