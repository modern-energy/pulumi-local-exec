"""A Python Pulumi program"""

import pulumi
import pulumi_local_exec

command_str = pulumi.Output.from_input("env")
msg_str = pulumi.Output.from_input("Hello world!")

msg_str_2 = msg_str.apply(lambda x: x.upper())

cmd = pulumi_local_exec.Command('test',
                                command=command_str,
                                env={'THE_MSG2': msg_str_2})

pulumi.export('output', cmd.stdout)
