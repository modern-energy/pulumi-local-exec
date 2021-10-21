import * as local_exec from "@modern-energy/pulumi-local-exec";

const cmd = new local_exec.Command("test", {
    command: "echo $MSG",
    env: {"MSG": "Hello, world!"}
});

exports.stdout = cmd.stdout
exports.stderr = cmd.stderr
