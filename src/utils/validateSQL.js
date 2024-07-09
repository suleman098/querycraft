const sqlKeywords = [
  'select', 'insert', 'update', 'delete', 'create', 'alter', 'drop', 'where', 'join', 'union', 'group by', 'order by', 'having',
  'fetch', 'query', 'retrieve', 'get'
];

export const isValidSQLDescription = (text) => {
  const containsKeywords = sqlKeywords.some(keyword => text.toLowerCase().includes(keyword));
  const englishTextPattern = /^[A-Za-z0-9\s,.!?'"()-]+$/;
  const lengthIsValid = text.length > 10 && text.length < 300;
  const isSQLFormula = /^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\s+/i.test(text);

  if (!containsKeywords && !isSQLFormula) {
    return { valid: false, error: 'Please include at least one SQL keyword (e.g., select, insert) or provide a valid SQL formula.' };
  }

  if (!englishTextPattern.test(text) && !isSQLFormula) {
    return { valid: false, error: 'Please use valid English text in your description or provide a valid SQL formula.' };
  }

  if (!lengthIsValid) {
    return { valid: false, error: 'Description must be between 10 and 300 characters long.' };
  }

  return { valid: true, error: '' };
};
