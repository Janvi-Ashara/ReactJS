import './App.css'
import React, { useState } from 'react';

function App() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);

    const handleInputChange = (event) => {
        setInput(event.target.value);

        // Set cursor position after $ sign
        const inputElement = event.target;
        if (inputElement.value.startsWith('$')) {
            inputElement.setSelectionRange(1, 1);
        }
    };

    const handleInputSubmit = (event) => {
        event.preventDefault();
        // Process the input command here
        const command = input.trim().toLowerCase();
        let result = '';

        switch (command) {
            case 'help':
                result = 'Available commands: help, about, contact';
                break;
            case 'about':
                result = 'This is a simple terminal created with React.';
                break;
            case 'contact':
                result = 'You can reach us at example@example.com';
                break;
            case 'python':
                result = 'You are enter the python terminal';
                result = '>>>';
                break;
            default:
                result = `Unknown command: ${command}. Type 'help' for available commands.`;
                break;
        }

        const newOutput = [...output, { command, result }];
        setOutput(newOutput);
        setInput('');
    };

    return (
        <div className="App">
            <div className="terminal">
                {output.map((item, index) => (
                    <div key={index}>
                        <span>$</span>

                        <span>{item.command}</span>
                        <br />
                        {item.result && <span>{item.result}</span>}
                    </div>

                ))}
            </div>
            <form onSubmit={handleInputSubmit}>
                <span>$ </span>
                <input
                    type="text"
                    autoFocus
                    value={input}
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
}

export default App;
