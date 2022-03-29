import * as pulumi from "@pulumi/pulumi"
import * as local_exec from "@modern-energy/pulumi-local-exec";


const cmd1 = pulumi.output("echo $MSG")
const arg1 = pulumi.output("echo hello2")

const output1 = new local_exec.Command("test1", {
    command: cmd1,
    env: {'MSG': arg1.apply(v => v.toUpperCase())}
});

const output2 = new local_exec.Command("test2", {
    command: output1.stdout
});


exports.out1 = output1.stdout
exports.out2 = output2.stdout

exports.err1 = output1.stderr

