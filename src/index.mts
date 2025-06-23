import { compile, compileFile } from "pug";
import { dirname } from "path";
import { __Renderer, Plugin, BasicContext, FileBinding, Result } from "@fewu-swg/abstract-types";

class PugRenderer implements __Renderer {
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

    async assignTask(file_binding: FileBinding, provides: any): Promise<Result> {
        let compiled = compile(file_binding.source.content, {
            filename: file_binding.source.path!,
            basedir: dirname(file_binding.source.path!)
        });
        file_binding.target.content = compiled(provides);
        return {
            status: 'Ok',
            value: ``
        }
    }
}

export default class PugRendererPlugin implements Plugin {
    __fewu_plugin_id: string = `fewu.renderer-plugin.pug`;
    __fewu_is_plugin = true;
    __fewu_plugin_name = 'Renderer<Template::Pug>';

    exports = {
        renderers: [
            new PugRenderer()
        ],
        parsers: [],
        deployers: []
    }

    constructor(_ctx: BasicContext) {
    }

    assigner(_ctx: BasicContext): void {};
}