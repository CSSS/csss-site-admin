# Getting Started With Schematics

This directory contains the schematics to create new CRUD components.

### Usage

To link these schematics locally, run the following commands:
```bash
# In the `schematics` folder
npm link

# Move to your project folder
npm link csss-crud
```

After linking the folder globally you can generate all the CRUD components.
```
ng generate csss-crud:crud <name>
```

By default, the files generated will be under `src/app/pages/dashboard/<name>`
### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with

```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

