# Pulumi Local Exec

This is a multi-language
[Pulumi Package](https://www.pulumi.com/docs/guides/pulumi-packages/)
that allows local commands to be executed as Pulumi resources.

Ultimately, it is built on top of the Node `child_process.exec` [function](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback).

## Installation

Add the package to your Pulumi project.
- Node: `@modern-energy/pulumi-local-exec`
- Python: `pulumi_local_exec`

This package is hosted on Modern Energy's shared artifact repositories.

Make sure you are logged into AWS CodeArtifact. See the instructions
in the
[Shared Infrastructure](https://github.com/modern-energy/infrastructure#artifact-repositories)
repo.

You may be prompted to install the plugin binaries. If so, you will
need to run the command that Pulumi prompts you with, supplying in
addition a `--server`parameter and giving it the value
`https://s3.amazonaws.com/packages.modern.energy/public/pulumi-local-exec/`

For example:

```
pulumi plugin install resource local-exec v0.2.0 --server https://s3.amazonaws.com/packages.modern.energy/public/pulumi-local-exec/
```

## Usage

Use the `Command` resource provided by this package. It exposes the following properties:

- `command` - Required. The shell command to execute.
- `timeout` - Optional. Milliseconds the command is allowed to run
  before it is terminated via SIGKILL. Note that the system cannot
  tell the difference between a command terminated due to a timeout or
  some other cause, so the error message might not make it apparent
  that the command failed due to a timeout.
- `shell` - Optional. The shell interpreter to use to execute the
  command. Defaults to `/bin/sh` on unix-like systemss.
- `cwd` - Optional. The directory in which to evaluate the
  command. Defaults to the current directory of the Pulumi process
  (usually the directory of your Pulumi project.)
- `env` - Optional. Environment variable names and values to pass to
  the child process.

The provided command will execute during the resource's `create` phase.

A change in any of the properties other than `timeout` will force the
resource to be re-created, and the local command to be executed again.

For any given invocation of `pulumi up` if the input properties have not
changed since the last time the resource was created (and the command executed)
then the resource will not be re-created, and therefore the command will not be
executed during that invocation.

### Typescript Example

```typescript
import * as local_exec from "@modern-energy/pulumi-local-exec";

const cmd = new local_exec.Command("test", {
    command: "echo $MSG",
    env: {"MSG": "Hello, world!"}
});

exports.stdout = cmd.stdout
```

### Python Example

```python
import pulumi_local_exec

cmd = pulumi_local_exec.Command('test',
                                command='echo $MSG',
                                env={'MSG': 'Hello, world!'})

pulumi.export('output', cmd.stdout)
```

## Development

This project is loosely based on Pulumi's [template for a Component
Package](https://github.com/pulumi/pulumi-component-provider-ts-boilerplate)

See the [Makefile](/Makefile) for the structure of the build.

To deploy an updated version to Modern Energy's artifact repositories:

1. Ensure you have Yarn installed and available on your path.
1. Ensure you have Twine installed and available in your default/current Python environment.
1. Update the `VERSION` variable at the top of the Makefile
1. Ensure you have AWS credentials for a Modern Energy account in your environment
1. Ensure you are logged in to Modern Energy's `npm` and `PyPI`
   CodeArtifact repositories, for use with `npm` and `twine`.
1. Run `make publish_all`.

