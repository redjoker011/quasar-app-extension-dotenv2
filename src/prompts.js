/**
 * Quasar App Extension prompts script
 *
 * Inquirer prompts
 * (answers are available as "api.prompts" in the other scripts)
 * https://www.npmjs.com/package/inquirer#question
 *
 * Example:

  return [
    {
      name: 'name',
      type: 'string',
      required: true,
      message: 'Quasar CLI Extension name (without prefix)',
    },
    {
      name: 'preset',
      type: 'checkbox',
      message: 'Check the features needed for your project:',
      choices: [
        {
          name: 'Install script',
          value: 'install'
        },
        {
          name: 'Prompts script',
          value: 'prompts'
        },
        {
          name: 'Uninstall script',
          value: 'uninstall'
        }
      ]
    }
  ]

 */

module.exports = function () {
  return [
    {
      type: 'checkbox',
      name: 'environments',
      message: "Choose supported environments",
      choices: [
        {
          name: 'Development (recommended)',
          value: 'development',
          checked: true
        },
        {
          name: 'Production (recommended)',
          value: 'production',
          checked: true
        },
        {
          name: 'Staging',
          value: 'staging',
        },
        {
          name: 'Test',
          value: 'test',
        },
        {
          name: 'QA',
          value: 'qa',
        },
      ],
      validate: (answer) => {
        if (answer.length < 1) {
          return 'You must choose at least one environment';
        }

        return true;
      }
    },
    {
      type: 'input',
      name: 'common_root_object',
      message: "What name would you like to use for your Common Root Object ('none' means to not use one)?",
      default: "none"
    },
    {
      type: 'confirm',
      name: 'create_env_files',
      message: "Create your .env files for you?",
      default: true
    },
    {
      type: 'confirm',
      name: 'add_env_to_gitignore',
      message: "For security, would you like your .env files automatically added to .gitignore?",
      default: true
    }
  ]
}
