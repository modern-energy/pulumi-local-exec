"""A Python Pulumi program"""

import pulumi
import pulumi_local_exec

cmd1 = pulumi.Output.from_input("echo $MSG")
arg1 = pulumi.Output.from_input("echo hello")

output1 = pulumi_local_exec.Command('test1',
                                    command=cmd1,
                                    env={'MSG': arg1.apply(lambda x: x.upper())})

output2 = pulumi_local_exec.Command('test2',
                                    command=output1.stdout)

pulumi.export('output1', output1.stdout)
pulumi.export('output2', output1.stdout)
