// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "example" is now active!');

	let disposable = vscode.commands.registerCommand('easy-console-log.consoleLogComment', async () => {
	  const editor = vscode.window.activeTextEditor;
	  const position = editor.selection.active;
	  const currentLine = editor.document.lineAt(position.line);
	  if (editor) {
		const input = await vscode.window.showInputBox({
		  prompt: 'Enter the message for console.log()'
		});
  
		if (input !== undefined) {  // Check if the user has entered a value
			// Prompt for confirmation
			const confirm = await vscode.window.showQuickPick(['Yes', 'No'], {
			  placeHolder: 'Do you want to style this console.log statement?'
			});
	
			// If the user selected "Yes", insert the console.log statement
			if (confirm === 'Yes') {
				const logColor = await vscode.window.showInputBox({
					prompt: 'enter a text color'
				  });
				  const logBgColor = await vscode.window.showInputBox({
					prompt: 'enter a background color'
				  });
			  
			  const newPosition = position.with(position.line + 1, 0); // Go to the next line
			  const edit = new vscode.WorkspaceEdit();
			  const indent = currentLine.firstNonWhitespaceCharacterIndex;
			  const indentString = currentLine.text.substring(0, indent);
	
			  // Insert the user's input into the console.log statement
			  const lineText = `${indentString}console.log("%c${input}", "color: ${logColor}; background-color: ${logBgColor}");\n`;
	
			  // Insert the new text at the calculated position
			  edit.insert(editor.document.uri, newPosition, lineText);
	
			  // Apply the edit
			  await vscode.workspace.applyEdit(edit);
			} else if (confirm === "No") {
				const position = editor.selection.active;
			  const newPosition = position.with(position.line + 1, 0); // Go to the next line
			  const edit = new vscode.WorkspaceEdit();
			  const indent = currentLine.firstNonWhitespaceCharacterIndex;
			  const indentString = currentLine.text.substring(0, indent);
			  const lineText = `${indentString}console.log("${input}");\n`;
	
			  // Insert the new text at the calculated position
			  edit.insert(editor.document.uri, newPosition, lineText);
	
			  // Apply the edit
			  await vscode.workspace.applyEdit(edit);
			}
		  }
		}
	  });
	
	  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
