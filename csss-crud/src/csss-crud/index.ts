import {
  apply,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  strings,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function table(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.logger.info('Creating a new CRUD table...');
    const sourceTemplates = url('./files');
    const filledTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings
      }),
      move(`src/app/pages/dashboard`)
    ]);
    return mergeWith(filledTemplates)(tree, _context);
  };
}
