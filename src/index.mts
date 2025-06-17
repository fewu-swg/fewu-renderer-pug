import { compile, compileFile } from "pug";
import { dirname } from "path";
import { AbstractRenderer, Plugin, BasicContext } from "@fewu-swg/abstract-types";

class PugRenderer implements AbstractRenderer {
    __fewu__ = 'renderer';

    toString(){
        return `Renderer<pug>@fewu-swg`
    }

    type = /\.pug$/;

    async render(template: string, templatePath: string, variables: object): Promise<string> {
        let compiled = compile(template, {
            filename: templatePath,
            basedir: dirname(templatePath)
        });
        return compiled(variables);
    }

    async renderFile(templatePath: string, variables: object): Promise<string> {
        return compileFile(templatePath, {
            filename: templatePath,
            basedir: dirname(templatePath)
        })(variables);
    }
}

export default class PugRendererPlugin implements Plugin {
    __fewu_is_plugin = true;
    __fewu_plugin_name = 'Renderer<Template::Pug>';

    exports = {
        renderers: [
            new PugRenderer()
        ],
        parsers: []
    }

    constructor(_ctx: BasicContext) {
    }

    assigner(_ctx: BasicContext): void {};
}