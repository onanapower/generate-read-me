const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
  inquirer.prompt([
    /* Pass your questions in here */
    {
      type: "input",
      name: "title",
      message: "The title of the project?",
    },
    {
      type: "input",
      name: "description",
      message: "Kindly describe your project?",
    },
    {
      type: "input",
      name: "installation",
      message: "how can it be installed?",
    },
    {
      type: "input",
      name: "usage",
      message: "How can you use it?",
    },
    {
      type: "list",
      name: "licenses",
      messages: "license?",
      choices: ["MIT", "ISC", "GNUPLv3"],
      filter(val) {
        return val.toLowerCase();
      },
    },
    {
      type: "input",
      name: "contributors",
      message: "who are the contributors",
    },
    {
      type: "input",
      name: "test",
      message: "how can you test",
    },
    {
      type: "input",
      name: "questions",
      message: "what are the frequently asked questions",
    },
  ]);

const generateHTML = (answers) =>
  `# $(answers.title)

## Table of Content
- [project description](#Description)
- [usage](#usage)
- [project License](#License)
- [Contibuting](#Contibuting)
- [Test](#Test)
- [Questions](#Questions)
- [Installations](#Installations)

## Description
${answers.description}

## usage
${answers.usage}

## License
${answers.licensce}

## Installations
${answers.installation}

## Contributing
${answers.contributors}

## Questions
${answers.questions}

## Test
${answers.test}`;

promptUser()
  .then((answers) => writeFileAsync("README.md", generateHTML(answers)))
  .then(() => console.log("Successfully generated a README.md"))
  .catch((err) => console.error(err));
