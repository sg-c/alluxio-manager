package com.alluxio.alluxiomanager;


import com.alluxio.alluxiomanager.cmd.CatFile;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@SpringBootApplication
@RestController
public class AlluxioManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlluxioManagerApplication.class, args);
	}

	@GetMapping("/file")
	@CrossOrigin(origins = "*")
	public String hello(@RequestParam(value = "loc") String loc) {
		String output;
		try {
			output = CatFile.exec(loc);
		} catch (IOException e) {
			output = String.format("Failed to open file due to exception: %s", e);
		} catch (InterruptedException e) {
			output = "Opening file is interrupted.";
		}
		return output;
	}
}
