const inquirer = require("inquirer");
const fs = require("fs");


const propmtUser () =>
inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: "input",
      name: "Title",
      message: "The title of the project?",
    },
    {
      type: "input",
      name: "Description",
      message: "Kindly describe your project?",
    },
    {
      type: "input",
      name: "Ttableofcontents",
      message: "List your table of contents",
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
  ])

  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
