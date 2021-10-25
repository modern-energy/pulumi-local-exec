import * as pulumi from "@pulumi/pulumi"
import * as local_exec from "@modern-energy/pulumi-local-exec";


const command_str = pulumi.output("env")
const val = pulumi.output("some-value")

console.log("value:", val)

const cmd = new local_exec.Command("test", {
    command: command_str,
    env: {"MSG": "Hello, world!",
          "OUTPUT": val}
});

exports.stdout = cmd.stdout
exports.stderr = cmd.stderr
