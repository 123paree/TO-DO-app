#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let mytodos = [];
async function main() {
    console.log(chalk.cyan.bold.italic("\n \t MY TO-DOS \n"));
    let keepAddingTasks = true;
    while (keepAddingTasks) {
        let taskoption = await inquirer.prompt([
            {
                name: "options",
                type: "list",
                message: chalk.yellowBright("Select any of the following "),
                choices: ["Jot down to-do", "List Everything", "Modify Task", "Remove Task", "Check Off Task", "Quit Program"]
            }
        ]);
        if (taskoption.options === "Jot down to-do") {
            let jotdown = await inquirer.prompt([
                {
                    name: "create",
                    type: "input",
                    message: "Enter task to be added",
                }
            ]);
            if (jotdown.create.trim() === "") {
                console.log(chalk.redBright("Please enter a task to add."));
            }
            else {
                mytodos.push(jotdown.create);
                console.log(chalk.greenBright("Task captured!"));
            }
            let jotdownmore = await inquirer.prompt([
                {
                    name: "createmore",
                    type: "confirm",
                    message: chalk.blueBright("Is there anything else you'd like to add?"),
                    default: false
                }
            ]);
            if (!jotdownmore.createmore) {
                console.log(chalk.green("Great job! Back to the main menu"));
                continue;
            }
            else {
                console.log(chalk.green("Great job! Back to the main menu"));
            }
        }
        else if (taskoption.options === "List Everything") {
            if (mytodos.length > 0) {
                console.log(chalk.magentaBright.bold("Your Tasks:"));
                mytodos.forEach((task, index) => console.log(index + 1 + ". " + task));
            }
            else {
                console.log(chalk.redBright("No tasks to be shown yet!"));
            }
        }
        else if (taskoption.options === "Modify Task") {
            console.log(chalk.bold("Select task to modify"));
            if (mytodos.length > 0) {
                mytodos.forEach((task, index) => console.log(index + 1 + ". " + task));
                let selectedTask = await inquirer.prompt([
                    {
                        name: "selectedTaskInput",
                        type: "input",
                        message: "Enter the number of the task to modify:"
                    }
                ]);
                selectedTask = parseInt(selectedTask.selectedTaskInput) - 1;
                if (selectedTask >= 0 && selectedTask < mytodos.length) {
                    const newTask = await inquirer.prompt([
                        {
                            name: "modifyTask",
                            type: "input",
                            message: "Enter new task:"
                        }
                    ]);
                    mytodos[selectedTask] = newTask.modifyTask;
                    console.log(chalk.greenBright.bold("Task modified successfully!"));
                }
                else {
                    console.log(chalk.redBright.bold("Invalid task selection. Please try again."));
                }
            }
            else {
                console.log("No tasks to modify yet!");
            }
        }
        else if (taskoption.options === "Remove Task") {
            console.log(chalk.bold("Select task to remove"));
            if (mytodos.length > 0) {
                mytodos.forEach((task, index) => console.log(index + 1 + ". " + task));
                let selectedTask = await inquirer.prompt([
                    {
                        name: "selectedTaskInput",
                        type: "input",
                        message: chalk.blueBright("Enter the number of the task to remove:")
                    }
                ]);
                selectedTask = parseInt(selectedTask.selectedTaskInput) - 1;
                if (selectedTask >= 0 && selectedTask < mytodos.length) {
                    const removeTask = await inquirer.prompt([
                        {
                            name: "deleteTask",
                            type: "confirm",
                            message: chalk.yellowBright.bold.italic("Confirm removal (Y/N)")
                        }
                    ]);
                    if (removeTask.deleteTask) {
                        mytodos.splice(selectedTask, 1);
                        console.log(chalk.greenBright("Task removed successfully!"));
                    }
                    else {
                        console.log(chalk.red.bold("Task removal cancelled."));
                    }
                }
                else {
                    console.log(chalk.redBright.bold("Invalid task selection. Please try again."));
                }
            }
            else {
                console.log(chalk.redBright("No tasks to remove yet!"));
            }
        }
        else if (taskoption.options === "Check Off Task") {
            if (mytodos.length === 0) {
                console.log(chalk.redBright("No tasks to mark as completed yet!"));
                return;
            }
            let checkoff = await inquirer.prompt({
                type: "list",
                message: chalk.bold("Select completed Task"),
                name: "checkedoff",
                choices: mytodos,
            });
            console.log(chalk.green.bold(`Task ${checkoff.checkedoff}, is accomplished ✅`));
        }
        else if (taskoption.options === "Quit Program") {
            console.log(chalk.cyan.bold("Please wait, quitting program....."));
            await wait(2000);
            keepAddingTasks = false;
        }
    }
}
async function wait(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}
main();
