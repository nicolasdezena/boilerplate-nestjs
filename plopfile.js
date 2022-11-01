module.exports = (plop) => {
  plop.setGenerator('🧱 Model', {
    description: 'Creates the basic model structure.',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your model name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: './src/{{lowerCase name}}/{{lowerCase name}}.controller.ts',
        templateFile: './generators/plop/templates/module/controller.ts.hbs',
      },
      {
        type: 'add',
        path: './src/{{lowerCase name}}/{{lowerCase name}}.entity.ts',
        templateFile: './generators/plop/templates/module/entity.ts.hbs',
      },
      {
        type: 'add',
        path: './src/{{lowerCase name}}/{{lowerCase name}}.interface.ts',
        templateFile: './generators/plop/templates/module/interface.ts.hbs',
      },
      {
        type: 'add',
        path: './src/{{lowerCase name}}/{{lowerCase name}}.module.ts',
        templateFile: './generators/plop/templates/module/module.ts.hbs',
      },
      {
        type: 'add',
        path: './src/{{lowerCase name}}/{{lowerCase name}}.repository.ts',
        templateFile: './generators/plop/templates/module/repository.ts.hbs',
      },
      {
        type: 'add',
        path: './src/{{lowerCase name}}/{{lowerCase name}}.service.ts',
        templateFile: './generators/plop/templates/module/service.ts.hbs',
      },
      {
        type: 'add',
        path: './src/{{lowerCase name}}/{{lowerCase name}}.validators.ts',
        templateFile: './generators/plop/templates/module/validators.ts.hbs',
      },
    ],
  });
};
