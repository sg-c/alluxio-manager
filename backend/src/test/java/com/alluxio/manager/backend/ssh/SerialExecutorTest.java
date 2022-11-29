package com.alluxio.manager.backend.ssh;

import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

class SerialExecutorTest {

    @Test
    void execDone() throws IOException, InterruptedException {
        SerialExecutor se = new SerialExecutor("localhost", null)
                .build("mktemp /tmp/temp.XXXXX")
                .build("mktemp /tmp/temp.XXXXX")
                .build("ls /tmp/temp*");
        assertEquals(0, se.exec());
    }

    @Test
    void execFail() throws IOException, InterruptedException {
        SerialExecutor se = new SerialExecutor("localhost", null)
                .build("mktemp /tmp/temp.XXXXX")
                .build("dsfds");
        assertNotEquals(0, se.exec());
    }
}