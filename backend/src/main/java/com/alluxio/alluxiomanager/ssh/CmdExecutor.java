package com.alluxio.alluxiomanager.ssh;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class CmdExecutor {
    private static final String DEFAULT_USER = System.getProperty("user.name");

    private final List<String> cmd;

    public static List<String> cmdOf(String... cmd) {
        return Arrays.asList(cmd);
    }

    public CmdExecutor(String remote, List<String> cmd) {
        this(remote, null, cmd);
    }

    public CmdExecutor(String remote, String user, List<String> cmd) {
        String u = user != null ? user : DEFAULT_USER;

        this.cmd = new ArrayList<>(2 + cmd.size());
        this.cmd.add("ssh");
        this.cmd.add(u + "@" + remote);
        this.cmd.addAll(cmd);
    }

    public int exec() throws IOException, InterruptedException {
        ProcessBuilder pb = new ProcessBuilder(cmd)
                .redirectErrorStream(true); // merge stdin and stderr
        Process p = pb.start();
        printOutput(p);
        return p.waitFor();
    }

    private void printOutput(Process p) throws IOException {
        try (InputStreamReader isr = new InputStreamReader(p.getInputStream());
             BufferedReader br = new BufferedReader(isr)) {
            br.lines().forEach(System.out::println);
        }
    }
}
