package com.alluxio.manager.backend.ssh;

import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

class CmdExecutorTest {

    @Test
    void execDone() throws IOException, InterruptedException {
        CmdExecutor exec = new CmdExecutor("localhost", CmdExecutor.cmdOf("ls", "/"));
        System.out.println(exec.exec());
    }

    @Test
    void execFail() throws IOException, InterruptedException {
        CmdExecutor exec = new CmdExecutor("localhost", CmdExecutor.cmdOf("adfs"));
        System.out.println(exec.exec());
    }

    @Test
    void testCp() throws IOException, InterruptedException {
        CmdExecutor exec = new CmdExecutor("localhost", CmdExecutor.cmdOf("mktemp /tmp/temp.XXXXX"));
        assertEquals(0, exec.exec());
    }
}