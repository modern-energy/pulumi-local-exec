// Copyright 2021 Modern Energy
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as pulumi from "@pulumi/pulumi";
import * as provider from "@pulumi/pulumi/provider";
const uuid = require("uuid");
const child_process = require('child_process');

export interface CommandProperties {
    command: pulumi.Input<string>;
    timeout?: pulumi.Input<number>;
    shell?: pulumi.Input<string>;
    cwd?: pulumi.Input<string>;
    env?: Map<string, pulumi.Input<string>>;
}

interface CommandState {
    command: pulumi.Unwrap<string>;
    timeout?: pulumi.Unwrap<number>;
    shell?: pulumi.Unwrap<string>;
    cwd?: pulumi.Unwrap<string>;
    env?: Map<string, pulumi.Unwrap<string>>;
}

interface CommandResult {
    stdout: string;
    stderr: string;
    error?: Error
}

async function execute(urn: pulumi.URN, inputs: CommandState): Promise<CommandResult> {

    let p = new Promise(resolve => {
        child_process.exec(inputs.command, inputs, (error: Error, stdout: string, stderr: string) => {
            resolve( { error: error,
                       stdout: stdout,
                       stderr: stderr } );
        });
    });

    let result = await p as CommandResult;

    if (result.error) {
        throw result.error;
    }

    return result;
}


function envEqual(o1: any, o2: any) {

    if (o1 === o2) {
        return true;
    }

    if ((o1 === undefined) || (o2 === undefined)) {
        return false;
    }

    if (Object.keys(o1).length !== Object.keys(o2).length) {
        return false;
    }

    let keys = Object.keys(o1);
    for (var i = 0; i < keys.length; i++) {
        let k = keys[i]
        if (o1[k] !== o2[k]) {
            return false;
        }
    }

    return true;
}

export class Provider implements provider.Provider {
    constructor(readonly version: string) { }

    async check(urn: pulumi.URN,
                olds: CommandProperties,
                news: CommandProperties): Promise<provider.CheckResult> {
        const failures = []

        if(!news.command) {
            failures.push({property: "command",
                           reason: "must not be empty"})
        }

        return {
            failures: failures
        }
    }

    async create(urn: pulumi.URN,
                 inputs: CommandState): Promise<provider.CreateResult> {

        const result = await execute(urn, inputs)

        return { id: uuid.v4(),
                 outs: Object.assign({ stdout: result.stdout,
                                       stderr: result.stderr }, inputs) }
    }

    async diff(id: pulumi.ID,
               urn: pulumi.URN,
               olds: CommandState,
               news: CommandState): Promise<provider.DiffResult> {

        let replace = false;
        let replacementProperties = [];

        if(!envEqual(olds.env, news.env)) {
            replace = true;
            replacementProperties.push("env");
        }

        if(olds.command !== news.command) {
            replace = true;
            replacementProperties.push("command");

        }

        if(olds.cwd !== news.cwd) {
            replace = true;
            replacementProperties.push("cwd");
        }

        if(olds.shell !== news.shell) {
            replace = true;
            replacementProperties.push("shell");
        }

        return { changes: replace,
                 replaces: replace ? replacementProperties : undefined,
                 deleteBeforeReplace: true }
    }

}
