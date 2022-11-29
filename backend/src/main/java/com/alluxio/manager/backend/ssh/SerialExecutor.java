package com.alluxio.manager.backend.ssh;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class SerialExecutor {

    private final List<CmdExecutor> cmds = new ArrayList<>();

    private final String remote;
    private final String user;

    public SerialExecutor(String remote) {
        this(remote, null);
    }

    public SerialExecutor(String remote, String user) {
        this.remote = remote;
        this.user = user;
    }
    
    public SerialExecutor build(String ...cmd) {
        cmds.add(new CmdExecutor(this.remote, this.user, CmdExecutor.cmdOf(cmd)));
        return this;
    }

    public int exec() throws IOException, InterruptedException {
        for (CmdExecutor cmd : cmds) {
            int ret = cmd.exec();
            if (ret != 0) {
                return ret;
            }
        }
        return 0;
    }
}
