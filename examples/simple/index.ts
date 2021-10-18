import * as local_exec from "@modern-energy/pulumi-local-exec";

const cmd = new local_exec.Command("test", {
    command: "sleep 7 && echo $(pwd)",
    timeout: 2000,
    env: {"FOO": "Bar"},
    cwd: "/tmp"
});

exports.stdout = cmd.stdout
exports.stderr = cmd.stderr

