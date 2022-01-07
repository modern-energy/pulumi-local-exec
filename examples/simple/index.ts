import * as pulumi from "@pulumi/pulumi"
import * as local_exec from "@modern-energy/pulumi-local-exec";



// this example fails
const result = new local_exec.Command("example", {
    command: pulumi.secret("echo hello")
});


exports.out = result.stdout
exports.err = result.stderr
