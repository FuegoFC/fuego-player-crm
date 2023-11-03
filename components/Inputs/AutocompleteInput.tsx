import { Options } from '@/types/types';
import { Box, Popover, PopoverArrow, PopoverBody, PopoverContent } from '@chakra-ui/react';
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
        <Box width={'fit-content'} position={'relative'}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type something..."
            />
           <Popover isOpen={inputValue !== ''}>
                <PopoverContent>
                    <PopoverArrow>
                        <PopoverBody>
                            {suggestions.map((suggestion, index) => (
                                <Box className='hover:bg-slate-600 hover:text-white dark:hover:bg-gray-300 cursor-pointer' key={index} onClick={() => handleSuggestionClick(suggestion.label.toString())}>
                                    {suggestion.label}
                                </Box>
                            ))}
                        </PopoverBody>
                    </PopoverArrow>
                </PopoverContent>
                    
            </Popover>
        </Box>
    );
};

export default AutocompleteInput;
