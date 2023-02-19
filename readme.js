//Required modules/dependencies for the readmefile
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
      message: "how can you test this project?",
    },
    {
      type: "input",
      name: "email",
      message: "Add your email address here for questions",
    },
    {
      type: "input",
      name: "github",
      message: "For questions, input your github profile link:",
    },
  ]);

const generateREADME = (answers) => {
  // show badge function to indicate the license a user opted out for
  function showBadge(license) {
    const diffBadge = {
      gnuplv3:
        "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licence/lgpl-3.0)",
      isc: "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)",
      mit: "[![License: MIT](https://img.shields.io/badge/Licence-MIT-yellow.svg)](https://opensources.org/MIT)",
    };
    return diffBadge[license];
  }

  //second function:

  function showlicensedlinks(licence) {
    const licensedlinks = {
      GNUPLv3: "[GNUPLv3](https://choosealicense.com/licenses/gpl-3.0/)",
      isc: "[ISC](https://https://choosealicense.com/licenses/isc/)",
      mit: "[MIT](https://https://choosealicense.com/licenses/mit/)",
    };
    return licensedlinks[licence];
  }

  //3rd function:
  function presentlicensetext() {
    if (license) {
      return `Licensed under the ${showlicensedlinks(license)} license`;
    } else {
      return "license not found";
    }
  }
  // line 75 below is the expected place for the license badge to appear
  //line 95 is where the license link will be clicked
  //Below is the mark up language for the readme file with appended template literals
  `# ${answers.title}

${showBadge(answers.license)}

## Table of Content
- [project description](#description)
- [usage](#usage)
- [project License](#license)
- [Contibuting](#contibuting)
- [Test](#test)
- [Questions](#questions)
- [Installations](#installations)

## Description
${answers.description}

## usage
${answers.usage}

## License
${presentlicensetext(answers.license)}

## Installations
${answers.installation}

## Contributing
${answers.contributors}

## Questions
${answers.email}
${answers.github}

## Test
${answers.test}`;
  // function that will handle prompting and generation of the read me file
  promptUser()
    .then((answers) => writeFileAsync("README.md", generateREADME(answers)))
    .then(() => console.log("Successfully generated a README.md"))
    .catch((err) => console.error(err));
};
