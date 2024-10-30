import inquirer from 'inquirer';
import fs from 'fs';

// Preguntas para generar el README
const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: '¿Cuál es el nombre de tu proyecto?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Describe brevemente tu proyecto:',
  },
  {
    type: 'input',
    name: 'installation',
    message: '¿Cuáles son los pasos de instalación?',
  },
  {
    type: 'input',
    name: 'usage',
    message: '¿Cómo se utiliza el proyecto?',
  },
  {
    type: 'input',
    name: 'contributing',
    message: '¿Cómo pueden contribuir otros al proyecto?',
  },
  {
    type: 'input',
    name: 'tests',
    message: '¿Cómo se pueden correr las pruebas?',
  },
  {
    type: 'input',
    name: 'note',
    message: '[NOTE] Agrega una nota para los usuarios:',
  },
  {
    type: 'input',
    name: 'important',
    message: '[IMPORTANT] Agrega una información importante:',
  },
  {
    type: 'input',
    name: 'warning',
    message: '[WARNING] Agrega una advertencia para los usuarios:',
  },
  {
    type: 'input',
    name: 'tip',
    message: '[TIP] Agrega un consejo para los usuarios:',
  },
  {
    type: 'list',
    name: 'license',
    message: '¿Qué tipo de licencia tiene tu proyecto?',
    choices: [
      'MIT',
      'Apache 2.0',
      'GPL 3.0',
      'BSD 3-Clause',
      'No tengo una licencia',
    ],
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: '¿Cuál es tu nombre de usuario de GitHub?',
  },
];

// Función para generar el contenido del README
function generateReadme(data) {
  // Insignia de licencia
  const licenseBadge = data.license !== 'No tengo una licencia'
    ? `![License](https://img.shields.io/badge/license-${data.license.replace(/ /g, '%20')}-blue.svg)`
    : '';

  return `
# ${data.projectName}

${licenseBadge}

## Descripción
${data.description}

## Tabla de Contenidos
- [Instalación](#instalación)
- [Uso](#uso)
- [Contribuyendo](#contribuyendo)
- [Pruebas](#pruebas)
- [Notas](#notas)
- [Licencia](#licencia)
- [Preguntas](#preguntas)

## Instalación
${data.installation}

## Uso
${data.usage}

## Contribuyendo
${data.contributing}

## Pruebas
${data.tests}

## Notas

> [!NOTE]
> ${data.note}

> [!IMPORTANT]
> ${data.important}

> [!WARNING]
> ${data.warning}

> [!TIP]
> ${data.tip}

## Licencia

Este proyecto está bajo la licencia ${data.license}.

## Preguntas

Para cualquier pregunta, por favor visita mi perfil de GitHub: [${data.githubUsername}](https://github.com/${data.githubUsername}).
  `;
}

// Función para inicializar la aplicación
function init() {
  inquirer.prompt(questions).then((answers) => {
    const readmeContent = generateReadme(answers);

    fs.writeFile('README.md', readmeContent, (err) => {
      if (err) {
        console.error('Error al escribir el archivo README.md:', err);
      } else {
        console.log('README.md creado con éxito');
      }
    });
  });
}

init();
