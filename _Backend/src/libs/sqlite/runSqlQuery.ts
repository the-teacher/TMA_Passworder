import sqlite3 from 'sqlite3';

// Helper function to run a database command
const runCommand = (db: sqlite3.Database, command: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(command, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

/**
 * Execute a SQL query on a database connection within a transaction
 * @param db SQLite database connection
 * @param sql SQL query to execute
 */
export const runSqlQuery = async (db: sqlite3.Database, sql: string): Promise<void> => {
  try {
    // Begin transaction
    console.log('Begin transaction');
    await runCommand(db, 'BEGIN TRANSACTION');

    // Execute the query
    await runCommand(db, sql);

    // Commit transaction
    await runCommand(db, 'COMMIT');
    console.log('Transaction was successfuly committed');
  } catch (error) {
    // Rollback on any error
    try {
      await runCommand(db, 'ROLLBACK');
      console.error('Transaction rolled back');
    } catch (rollbackError) {
      console.error('Failed to rollback transaction:', rollbackError);
    }
    throw error;
  }
};
