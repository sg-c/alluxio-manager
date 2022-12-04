package com.alluxio.alluxiomanager.cmd;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

public class CatFile {

    private static final String NEW_LINE = System.getProperty("line.separator");

    public static String exec(String fileLoc) throws IOException, InterruptedException {
        ProcessBuilder pb = new ProcessBuilder("cat", fileLoc).redirectErrorStream(true); // merge stdin and stderr
        Process p = pb.start();
        String output = getOutput(p);
        p.waitFor();
        return output;
    }

    private static String getOutput(Process p) throws IOException {
        StringBuilder sb = new StringBuilder();
        try (InputStreamReader isr = new InputStreamReader(p.getInputStream()); BufferedReader br =
                new BufferedReader(isr)) {
            br.lines().forEach((l) -> {
                sb.append(l).append(NEW_LINE);
            });
        }
        return sb.toString();
    }
}
