import * as pulumi from "@pulumi/pulumi"
import * as local_exec from "@modern-energy/pulumi-local-exec";


// This example works
const working = new local_exec.Command("working-example", {
    command: pulumi.output("echo hello")
});

// this example fails
const failing = new local_exec.Command("failing-example", {
    command: pulumi.secret("echo hello")
});


exports.workingOut = working.stdout
exports.workingErr = working.stderr

exports.failingOut = failing.stdout
exports.failingEerr = failing.stderr
