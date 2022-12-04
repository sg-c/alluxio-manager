package com.alluxio.alluxiomanager;


import com.alluxio.alluxiomanager.file.File;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class AlluxioManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlluxioManagerApplication.class, args);
	}

	@GetMapping("/file")
	@CrossOrigin(origins = "*")
	public File hello(@RequestParam(value = "loc") String loc) {
		return new File(String.format("loc is %s", loc));
	}
}
