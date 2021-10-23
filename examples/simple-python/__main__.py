"""A Python Pulumi program"""

import pulumi
import pulumi_local_exec

cmd = pulumi_local_exec.Command('test',
                                command='echo $MSG',
                                env={'MSG': 'Hello, world!'})

pulumi.export('output', cmd.stdout)
