#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { parseSentence, showHelp, showAll, parseLanguage } from "./utility.js";
import chalk from "chalk";
import boxen from "boxen";
import {translate} from "@vitalets/google-translate-api";

function main() {
	// Custom usage message
	const usage = chalk.hex("#83aaff")(
		"\\nUsage: tran <lang_name> sentence to be translated"
	);

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

	// console.log(argv);
	// Application logic here

	if (argv.l === true || argv.languages === true) {
		console.log("List of supported languages:");
		showAll();
		return;
	}

    if (argv._[0] == null || argv._[0] == "help") {
		showHelp();
		return;
	}

	if (argv._[0]) {
		let language = argv._[0].toLowerCase(); // stores the language
		language = parseLanguage(language); // parsing the language specified to the ISO-639-1 code
		const sentence = parseSentence(argv._); // parseSentence can handle all words
		if (sentence == "") {
			console.error(
				chalk.red.bold(
					"\nThe entered sentence is like John Cena, I can't see it!\n"
				)
			);
			console.log(chalk.green("Enter tran --help to get started.\n"));
			return;
		}
		if (language) {
			// Translate the sentence
			translate(sentence, { to: language })
				.then((res) => {
					console.log(
						"\n" +
							boxen(chalk.green("\n" + res.text + "\n"), {
								padding: 1,
								borderColor: "green",
								dimBorder: true,
							}) +
							"\n"
					);
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			console.error(
				"Invalid language provided. Use the -l option to see the list of supported languages."
			);
		}
	}
}

main();
