import { Options } from '@/types/types';
import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';

type AutocompleteInputProps = {
    options: Options[]
}

const AutocompleteInput = (props: AutocompleteInputProps) => {
    const { options } = props;
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<Options[]>([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Fetch suggestions based on the input value (you can customize this part)
        // For example, you can make an API call to get suggestions from a backend server.
        // For simplicity, I'll provide a static list of suggestions here.
        const newSuggestions = options.filter(option => option.label.toLowerCase().includes(value.toLowerCase()));

        setSuggestions(newSuggestions);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);
        setSuggestions([]);
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type something..."
            />
           {inputValue !== '' && <Box maxH={'250px'} overflow={'auto'}>
                    {suggestions.map((suggestion, index) => (
                        <Box key={index} onClick={() => handleSuggestionClick(suggestion.label.toString())}>
                            {suggestion.label}
                        </Box>
                    ))}
            </Box>
            }
        </div>
    );
};

export default AutocompleteInput;
