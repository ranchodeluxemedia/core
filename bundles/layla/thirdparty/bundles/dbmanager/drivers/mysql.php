<?php namespace DBManager\Drivers; 

use Laravel\Config;
use Exception;
use PDO;

class MySQL extends Driver {

	/**
	 * __construct
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Return all tables we're allowed to use
	 *
	 * @return array
	 * // pgsql:  $query_string = "SELECT tablename FROM pg_tables WHERE tablename !~ '^pg_+' AND tableowner = '" . $connection['username'] ."'";
	 */
	public static function tables()
	{
		foreach($this->pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_NUM) as $table)
		{
			if( ! in_array($table[0], $this->no_access))
			{
				$this->tables[] = $table[0];
			}
		}

		return $this->tables;
	}

	/**
	 * Get all column info from the specified table
	 *
	 * @param string $table
	 * @return array
	 */
	public function info($table = null)
	{
		if(is_null($table))
		{
			throw new Exception("No table set");
		}

		try
		{
			$this->table_info = $this->pdo->query("SHOW FULL COLUMNS FROM `$table`")->fetchAll(PDO::FETCH_ASSOC);
		}
		catch (Exception $e)
		{
			throw new Exception($e->errorInfo[2]);
		}

		return $this->table_info;

	}

	/**
	 * Set
	 *
	 * @param string|array $field
	 * @param string|array $property
	 * @param string|array $value
	 * @return DBManager
	 */
	public function set($field, $properties)
	{
		return $this;
	}

	/**
	 * new_table
	 *
	 * @return void
	 */
	public static function new_table($table)
	{
		return $this;
	}

}