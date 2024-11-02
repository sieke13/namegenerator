import inquirer from 'inquirer';
import fs from 'fs';

const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: 'What is the name of the project?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Describe your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Installation Steps:',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'What is the Usage of your project?',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Contribuidores',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'How can you test the app?',
  },
  {
    type: 'input',
    name: 'note',
    message: '[NOTE] Note for Users:',
  },
  {
    type: 'input',
    name: 'important',
    message: '[IMPORTANT] Important information for user:',
  },
  {
    type: 'input',
    name: 'warning',
    message: '[WARNING] Add an advertise for users:',
  },
  {
    type: 'input',
    name: 'tip',
    message: '[TIP] Add a tip for the users:',
  },
  {
    type: 'list',
    name: 'license',
    message: 'What license use your project?',
    choices: [
      'MIT',
      'Apache 2.0',
      'GPL 3.0',
      'BSD 3-Clause',
      'I Dont Have License',
    ],
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'What is your GitHub username?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email?',
  },
];

function renderLicenseBadge(license) {
  if (!license || license === 'I Dont Have License') {
    return '';
  }
  return `![License](https://badgen.net/badge/license/${encodeURIComponent(license)}/blue)`;
}

function generateMarkdown(data) {
  const licenseBadge = renderLicenseBadge(data.license);
  return `
# ${data.projectName}

${licenseBadge}

## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Notes](#notes)
- [License](#license)
- [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

## Contributing
${data.contributing}

## Tests
${data.tests}

## Notes

> [!NOTE]
> ${data.note}

> [!IMPORTANT]
> ${data.important}

> [!WARNING]
> ${data.warning}

> [!TIP]
> ${data.tip}

## License
This project is licensed under the ${data.license} license.

## Questions
For any questions, reach out via GitHub: [${data.githubUsername}](https://github.com/${data.githubUsername})  
Or send an email to: [${data.email}]
`;
}

// Function to initialize the app
function init() {
  inquirer.prompt(questions).then((answers) => {
    const readmeContent = generateMarkdown(answers);

    fs.writeFile('README.md', readmeContent, (err) => {
      if (err) {
        console.error('Error Writing README.md:', err);
      } else {
        console.log('README.md successfully created!');
      }
    });
  });
}

init();

export default generateMarkdown;
