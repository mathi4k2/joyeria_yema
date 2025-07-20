import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SearchBar.css';

const SearchBar = ({ 
    onSearch, 
    placeholder = "Buscar productos...", 
    darkMode = false,
    suggestions = [],
    onSuggestionSelect,
    className = ""
}) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);

    // Filtrar sugerencias basadas en la consulta
    const filteredSuggestions = useMemo(() => {
        if (!query.trim()) return suggestions.slice(0, 5);
        
        return suggestions
            .filter(item => 
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.category.toLowerCase().includes(query.toLowerCase()) ||
                item.brand?.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 8);
    }, [query, suggestions]);

    // Manejar cambios en la búsqueda
    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setSelectedIndex(-1);
        setShowSuggestions(value.length > 0);
        
        // Debounce para la búsqueda
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        
        searchTimeout.current = setTimeout(() => {
            if (value.trim()) {
                onSearch(value);
            }
        }, 300);
    };

    // Manejar navegación por teclado
    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev < filteredSuggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
                    handleSuggestionSelect(filteredSuggestions[selectedIndex]);
                } else if (query.trim()) {
                    onSearch(query);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                inputRef.current?.blur();
                break;
            default:
                break;
        }
    };

    // Manejar selección de sugerencia
    const handleSuggestionSelect = (suggestion) => {
        setQuery(suggestion.name);
        setShowSuggestions(false);
        setSelectedIndex(-1);
        onSuggestionSelect?.(suggestion);
        onSearch(suggestion.name);
    };

    // Manejar click fuera del componente
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setShowSuggestions(false);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Scroll a la sugerencia seleccionada
    useEffect(() => {
        if (selectedIndex >= 0 && suggestionsRef.current) {
            const selectedElement = suggestionsRef.current.children[selectedIndex];
            if (selectedElement) {
                selectedElement.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [selectedIndex]);

    const searchTimeout = useRef(null);

    // Limpiar timeout al desmontar
    useEffect(() => {
        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, []);

    return (
        <div className={`search-bar-container ${darkMode ? 'dark' : 'light'} ${className}`}>
            <div className="search-input-wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        setIsFocused(true);
                        setShowSuggestions(query.length > 0);
                    }}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className={`search-input ${isFocused ? 'focused' : ''}`}
                    aria-label="Buscar productos"
                    aria-expanded={showSuggestions}
                    aria-haspopup="listbox"
                    role="combobox"
                />
                <div className="search-icon">
                    <i className="fas fa-search"></i>
                </div>
                {query && (
                    <button
                        className="clear-button"
                        onClick={() => {
                            setQuery('');
                            setShowSuggestions(false);
                            setSelectedIndex(-1);
                            onSearch('');
                        }}
                        aria-label="Limpiar búsqueda"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                )}
            </div>

            <AnimatePresence>
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <motion.div
                        ref={suggestionsRef}
                        className="suggestions-container"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        role="listbox"
                    >
                        {filteredSuggestions.map((suggestion, index) => (
                            <motion.div
                                key={suggestion.id || index}
                                className={`suggestion-item ${selectedIndex === index ? 'selected' : ''}`}
                                onClick={() => handleSuggestionSelect(suggestion)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                role="option"
                                aria-selected={selectedIndex === index}
                                whileHover={{ backgroundColor: darkMode ? '#4a5568' : '#f7fafc' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="suggestion-content">
                                    <div className="suggestion-name">{suggestion.name}</div>
                                    <div className="suggestion-meta">
                                        {suggestion.brand && (
                                            <span className="suggestion-brand">{suggestion.brand}</span>
                                        )}
                                        <span className="suggestion-category">{suggestion.category}</span>
                                    </div>
                                </div>
                                <div className="suggestion-price">
                                    ${suggestion.price?.toLocaleString() || 'N/A'}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBar; 