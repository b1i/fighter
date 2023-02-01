#!/usr/bin/env node
// /*
// __        __   _                            _____ _       _     _            _ 
// \ \      / /__| | ___ ___  _ __ ___   ___  |  ___(_) __ _| |__ | |_ ___ _ __| |
//  \ \ /\ / / _ \ |/ __/ _ \| '_ ` _ \ / _ \ | |_  | |/ _` | '_ \| __/ _ \ '__| |
//   \ V  V /  __/ | (_| (_) | | | | | |  __/ |  _| | | (_| | | | | ||  __/ |  |_|
//    \_/\_/ \___|_|\___\___/|_| |_| |_|\___| |_|   |_|\__, |_| |_|\__\___|_|  (_)
//                                                     |___/
// */ 

import chalk from 'chalk'
import readline from 'readline';
import figlet from 'figlet'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let todoList = [];
figlet("Welcome  Fighter!", function(err, data) {
    if (err) {
        console.log(chalk.red('Something went wrong...'));
        console.dir(err);
        return;
    }
    console.log(chalk.cyan(data))
    fighter()
});

const fighter = () => {
    rl.question(chalk.blue("Enter a to-do item or type 'q' to quit, 'e' to edit an item , 'r' to review the current list, 'd' to delete an item: "), (input) => {
        if (input === 'q') {
            console.log(chalk.greenBright("Your to-do list:"));
            for (let i = 0; i < todoList.length; i++) {
                console.log(chalk.greenBright(`${i + 1}. ${todoList[i]}`));
            }
            rl.close();
            return;
        }
        if (input === 'e') {
            rl.question(chalk.blue("Enter the index of the item you want to edit: "), (index) => {
                index = parseInt(index);
                if (index > 0 && index <= todoList.length) {
                    rl.question(chalk.greenBright("Enter the new value: "), (newValue) => {
                        todoList[index - 1] = newValue;
                        console.log(chalk.greenBright(`Item ${index} has been updated`))
                        fighter();
                    });
                } else {
                    console.log(chalk.red("Invalid index"));
                    fighter();
                }
            });
        } else if(input === 'r'){
            console.log(chalk.greenBright("Your to-do list:"));
            for (let i = 0; i < todoList.length; i++) {
                console.log(chalk.greenBright(`${i + 1}. ${todoList[i]}`));
            }
            fighter();
        }else if(input === 'd'){
            rl.question(chalk.blue("Enter the index of the item you want to delete: "), (index) => {
                index = parseInt(index);
                if (index > 0 && index <= todoList.length) {
                    todoList.splice(index - 1, 1);
                    console.log(chalk.greenBright(`Item ${index} has been deleted`));
                    fighter();
                } else {
                    console.log(chalk.red("Invalid index"));
                    fighter();
                }
            });
        }else {
            todoList.push(input);
            console.log(chalk.greenBright("Item added to the list!"));
            fighter();
        }
    });
}
