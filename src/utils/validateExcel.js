const excelKeywords = [
  'sum', 'average', 'vlookup', 'if', 'count', 'concatenate', 'min', 'max', 'cell', 'range',
  'sumif', 'countif', 'index', 'match', 'left', 'right', 'mid', 'round', 'trim', 'upper', 'lower'
];

export const isValidExcelDescription = (text) => {
  const containsKeywords = excelKeywords.some(keyword => text.toLowerCase().includes(keyword));
  const englishTextPattern = /^[A-Za-z0-9\s,.!?'"()-]+$/;
  const lengthIsValid = text.length > 10 && text.length < 300;
  const cellReferencePattern = /\b[A-Z]+[0-9]+\b/;  // Pattern to allow cell references like B2, C3, etc.
  const isFormulaPattern = /^=.+/;  // Pattern to recognize Excel formulas starting with =

  if (!containsKeywords && !cellReferencePattern.test(text) && !isFormulaPattern.test(text)) {
    return { valid: false, error: 'Please include at least one Excel keyword (e.g., sum, average) or provide a valid Excel formula.' };
  }

  if (!englishTextPattern.test(text) && !cellReferencePattern.test(text) && !isFormulaPattern.test(text)) {
    return { valid: false, error: 'Please use valid English text in your description or provide a valid Excel formula.' };
  }

  if (!lengthIsValid) {
    return { valid: false, error: 'Description must be between 10 and 300 characters long.' };
  }

  return { valid: true, error: '' };
};
