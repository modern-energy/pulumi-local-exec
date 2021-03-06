// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "./utilities";

export class Command extends pulumi.CustomResource {
    /**
     * Get an existing Command resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    public static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): Command {
        return new Command(name, undefined as any, { ...opts, id: id });
    }

    /** @internal */
    public static readonly __pulumiType = 'local-exec:index:Command';

    /**
     * Returns true if the given object is an instance of Command.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    public static isInstance(obj: any): obj is Command {
        if (obj === undefined || obj === null) {
            return false;
        }
        return obj['__pulumiType'] === Command.__pulumiType;
    }

    /**
     * The processes standard errror
     */
    public /*out*/ readonly stderr!: pulumi.Output<string>;
    /**
     * The processes standard output
     */
    public /*out*/ readonly stdout!: pulumi.Output<string>;

    /**
     * Create a Command resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args: CommandArgs, opts?: pulumi.CustomResourceOptions) {
        let inputs: pulumi.Inputs = {};
        opts = opts || {};
        if (!opts.id) {
            if ((!args || args.command === undefined) && !opts.urn) {
                throw new Error("Missing required property 'command'");
            }
            inputs["command"] = args ? args.command : undefined;
            inputs["cwd"] = args ? args.cwd : undefined;
            inputs["env"] = args ? args.env : undefined;
            inputs["shell"] = args ? args.shell : undefined;
            inputs["timeout"] = args ? args.timeout : undefined;
            inputs["stderr"] = undefined /*out*/;
            inputs["stdout"] = undefined /*out*/;
        } else {
            inputs["stderr"] = undefined /*out*/;
            inputs["stdout"] = undefined /*out*/;
        }
        if (!opts.version) {
            opts = pulumi.mergeOptions(opts, { version: utilities.getVersion()});
        }
        super(Command.__pulumiType, name, inputs, opts);
    }
}

/**
 * The set of arguments for constructing a Command resource.
 */
export interface CommandArgs {
    /**
     * The string representation of the command to invoke, with space-separated arguments
     */
    readonly command: pulumi.Input<string>;
    /**
     * The working directory for the shell. Defaults to the current process's directory.
     */
    readonly cwd?: pulumi.Input<string>;
    /**
     * Environment variables to supply to the subprocess.
     */
    readonly env?: pulumi.Input<{[key: string]: pulumi.Input<string>}>;
    /**
     * Shell to execute the command with. Defaults to /bin/sh on *nix.
     */
    readonly shell?: pulumi.Input<string>;
    /**
     * The maximum number of milliseconds the command is allowed to run, before it fails with a timeout.
     */
    readonly timeout?: pulumi.Input<number>;
}
