#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { parseSentence, showHelp, showAll, parseLanguage } from "./utility.js";
import { translateText } from "./translationService.js"; // Import the translation service

// Custom usage message
const usage = "\nUsage: tran <lang_name> sentence to be translated";

// Configure yargs
const argv = yargs(hideBin(process.argv))
    .usage(usage) // Set the usage message
    .option("l", {
        // Define the -l option
        alias: "languages",
        describe: "List all supported languages.",
        type: "boolean",
        demandOption: false,
    })
    .help(true).argv; // Enable the help message


console.log(argv);
// Application logic here

if (argv.l === true || argv.languages === true) {  
    console.log("List of supported languages:");
    showAll();  
    process.exit(0); 
}


if (argv._[0]) {
    let language = argv._[0].toLowerCase(); // stores the language
    language = parseLanguage(language); // parsing the language specified to the ISO-639-1 code
    const sentence = parseSentence(argv._); // parseSentence can handle all words

    if (language) {
        // Translate the sentence
        translateText(sentence, language).then(translatedText => {
            if (translatedText) {
                console.log("Translated text:", translatedText);
            } else {
                console.log("Translation failed.");
            }
        });
    } else {
        console.error("Invalid language provided. Use the -l option to see the list of supported languages.");
    }
}


// OTHERS

if (argv._[0] == null || argv._[0] == "help") {
    showHelp();
    process.exit(0);
}