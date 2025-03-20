/**
 * Extracts SQL-friendly data from an object for dynamic query building
 * @param obj Object to extract data from
 * @returns Object with fieldNames, fieldValues, and fieldPlaceholders
 */
export function extractSqlFields<T extends Record<string, any>>(obj: T) {
  // Get all defined fields from the object
  const definedFields = Object.entries(obj).filter(([_, value]) => value !== undefined);

  // Extract field keys
  const fieldKeys = definedFields.map(([key]) => key);

  // Create field names string (comma-separated)
  const fieldNames = fieldKeys.join(', ');

  // Extract field values
  const fieldValues = definedFields.map(([_, value]) => value);

  // Create placeholders string (comma-separated question marks)
  const fieldPlaceholders = fieldKeys.map(() => '?').join(', ');

  return {
    fieldNames,
    fieldValues,
    fieldPlaceholders,
    fieldKeys,
  };
}

/**
 * Creates a SET clause for SQL UPDATE statements
 * @param fieldKeys Array of field names
 * @returns SET clause string in format "field1 = ?, field2 = ?, ..."
 */
export function createSetClause(fieldKeys: string[]): string {
  return fieldKeys.map((key) => `${key} = ?`).join(', ');
}
