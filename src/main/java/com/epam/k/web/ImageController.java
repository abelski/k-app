package com.epam.k.web;

import com.epam.k.domain.Image;
import com.epam.k.service.ImageService;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URI;
import java.nio.file.Paths;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class ImageController {

    private static final Logger LOG = LoggerFactory.getLogger(ImageController.class);

    @Autowired
    private ImageService imageService;

    @Value("${uploadDir}")
    private String uploadDir;

    @RequestMapping(value = "/upload", method = POST)
    public HttpEntity<Image> uploadImage(@RequestParam("file") MultipartFile file) {
        final String filename = file.getOriginalFilename();
        LOG.debug("Uploading image with filename {}", filename);

        Image image = new Image();
        image.setAltText(filename);
        image.setExtension(filename.split("\\.")[1]);
        imageService.save(image);
        upload(file, image);
        return new HttpEntity<>(image);
    }


    @RequestMapping(path = "/img/{path}")
    public void image(@PathVariable("path") String path, HttpServletResponse response) throws IOException {
        File img = new File(path);
        if (img.exists() && !img.isDirectory()) {
            FileInputStream imgStream = new FileInputStream(img);
            response.getOutputStream().write(IOUtils.toByteArray(imgStream));
        } else {
            response.getWriter().print("ХЕР ТАМ!");
        }
    }

    private void upload(MultipartFile file, Image image) {
        String filePath = Paths.get(uploadDir, image.getId() + "." + image.getExtension()).toString();
        try (BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)))) {
            stream.write(file.getBytes());
            image.setUri(new URI(filePath));
        } catch (Exception e) {
            LOG.error("Upload error", e);
        }
    }

}
