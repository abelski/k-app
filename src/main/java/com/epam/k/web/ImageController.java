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
        String imgPath = "/" + path + ".jpg";
//        try (InputStream imgResource = getClass().getClassLoader().getResourceAsStream(uploadDir+imgPath)) {
        try (InputStream imgResource = new FileInputStream(new File(uploadDir+imgPath))) {
            response.setContentType("image/jpg");
            response.getOutputStream().write(IOUtils.toByteArray(imgResource));
        } catch (IOException ex) {
            response.getWriter().print("IMG not found");
        }
    }

    private void upload(MultipartFile file, Image image) {
        String imageNamePlusExt = image.getId() + "." + image.getExtension();
        String filePath = Paths.get(uploadDir, imageNamePlusExt).toString();
        try (BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)))) {
            stream.write(file.getBytes());
            image.setUri(new URI("img/"+imageNamePlusExt));
        } catch (Exception e) {
            LOG.error("Upload error", e);
        }
    }

}
