<?php
class SSP {
    
	/**
	 * Create the data output array for the DataTables rows
	 *
	 *  @param  array $columns Column information array
	 *  @param  array $data    Data from the SQL get
	 *  @return array          Formatted data in a row based format
	 */
	static function data_output ( $columns, $data )
	{
		$out = array();

		for ( $i=0, $ien=count($data) ; $i<$ien ; $i++ ) {
			$row = array();

			for ( $j=0, $jen=count($columns) ; $j<$jen ; $j++ ) {
				$column = $columns[$j];

				// Is there a formatter?
				if ( isset( $column['formatter'] ) ) {
					$row[ $column['dt'] ] = $column['formatter']( $data[$i][ $column['db'] ], $data[$i] );
				}
				else {
					$row[ $column['dt'] ] = $data[$i][ $columns[$j]['db'] ];
				}
			}

			$out[] = $row;
		}

		return $out;
	}


	/**
	 * Paging
	 *
	 * Construct the LIMIT clause for server-side processing SQL query
	 *
	 *  @param  array $request Data sent to server by DataTables
	 *  @param  array $columns Column information array
	 *  @return string SQL limit clause
	 */
	static function limit ( $request, $columns )
	{
//		$limit = '';
//
//		if ( isset($request['start']) && $request['length'] != -1 ) {
//			$limit = "SKIP ".intval($request['start'])." FIRST ".intval($request['length']);
//		}
//
//		return $limit;
            $limit = '';

		if ( isset($request['start']) && $request['length'] != -1 ) {
			$limit = "LIMIT ".intval($request['start']).", ".intval($request['length']);
		}

		return $limit;
	}


	/**
	 * Ordering
	 *
	 * Construct the ORDER BY clause for server-side processing SQL query
	 *
	 *  @param  array $request Data sent to server by DataTables
	 *  @param  array $columns Column information array
	 *  @return string SQL order by clause
	 */
	static function order ( $request, $columns )
	{
		$order = '';

		if ( isset($request['order']) && count($request['order']) ) {
			$orderBy = array();
			$dtColumns = SSP::pluck( $columns, 'dt' );

			for ( $i=0, $ien=count($request['order']) ; $i<$ien ; $i++ ) {
				// Convert the column index into the column data property
				$columnIdx = intval($request['order'][$i]['column']);
				$requestColumn = $request['columns'][$columnIdx];
 
				$columnIdx = array_search( $requestColumn['data'], $dtColumns );
				$column = $columns[ $columnIdx ];

				if ( $requestColumn['orderable'] == 'true' ) {
					$dir = $request['order'][$i]['dir'] === 'asc' ?
						'ASC' :
						'DESC';

					$orderBy[] = ''.$column['db'].' '.$dir;
				}
			}

			$order = 'ORDER BY '.implode(', ', $orderBy);
		}

		return $order;
	}
   
static function columns($columns)
{    
    $cad = "";
    for ( $i=0, $ien=count($columns) ; $i<$ien ; $i++ ) {
            $requestColumn = $columns[$i];
            $cad.=$requestColumn[db].",";                                
    }    
    return substr($cad, 0, strlen($cad)-1);
                                                
}




        /**
	 * Searching / Filtering
	 *
	 * Construct the WHERE clause for server-si 
			for ( $i=0, $ien=count($request['columns']) ; $i<$ien ; $i++ ) {
				$requestColumn = $request['columns'][$i];
				$columnIdx = array_search( $requestColumn['data'], $dtColumns );
				$column = $columns[ $columnIdx ];

				if ( $requestColumn['searchable'] == 'true' ) {
					//$binding = SSP::bind( $bindings, '%'.$str.'%', PDO::PARAM_STR );
					$globalSearch[] = "".$column['db']." LIKE '".$str."%'";
				}
			}de processing SQL query.
	 *
	 * NOTE this does not match the built-in DataTables filtering which does it
	 * word by word on any field. It's possible to do here performance on large
	 * databases would be very poor
	 *
	 *  @param  array $request Data sent to server by DataTables
	 *  @param  array $columns Column information array
	 *  @param  array $bindings Array of values for PDO bindings, used in the
	 *    sql_exec() function
	 *  @return string SQL where clause
	 */
	static function filter ( $request, $columns )
	{
            
		$globalSearch = array();
		$columnSearch = array();
		$dtColumns = SSP::pluck( $columns, 'dt' );

		if ( isset($request['search']) && $request['search']['value'] != '' ) {
			$str = $request['search']['value'];
                                         
                        
			for ( $i=0, $ien=count($request['columns']) ; $i<$ien ; $i++ ) {
				$requestColumn = $request['columns'][$i];
				$columnIdx = array_search( $requestColumn['data'], $dtColumns );
				$column = $columns[ $columnIdx ];

				if ( $requestColumn['searchable'] == 'true' ) {
					//$binding = SSP::bind( $bindings, '%'.$str.'%', PDO::PARAM_STR );
					$globalSearch[] = "".$column['db']." LIKE '".$str."%'";
				}
			}
		}
                
                
               // echo $str."<--------------------1";

                
                //print_r($request['columns']);
                
		// Individual column filtering
		for ( $i=0, $ien=count($request['columns']) ; $i<$ien ; $i++ ) {
			$requestColumn = $request['columns'][$i];
			$columnIdx = array_search( $requestColumn['data'], $dtColumns );
			$column = $columns[ $columnIdx ];

			$str = $requestColumn['search']['value'];

			if ( $requestColumn['searchable'] == 'true' &&
			 $str != '' ) {
				//$binding = SSP::bind( $bindings, '%'.$str.'%', PDO::PARAM_STR );
				$columnSearch[] = "".$column['db']." LIKE '".$str."%'";
			}
		}

                
                //echo $str."<--------------------2";
                
		// Combine the filters into a single string
		$where = '';

		if ( count( $globalSearch ) ) {
			$where = '('.implode(' OR ', $globalSearch).')';
		}

		if ( count( $columnSearch ) ) {
			$where = $where === '' ?
				implode(' AND ', $columnSearch) :
				$where .' AND '. implode(' AND ', $columnSearch);
		}

		if ( $where !== '' ) {
			$where = 'WHERE '.$where;
		}

		return $where;
	}


        
static function fechaALetras($fecha){
  $fecha_separada=explode("-", $fecha);

  $dia= $fecha_separada[2];
  
  switch ($fecha_separada[1]) {
    
    case "01":
        $mes="Ene";
      break;
    case "02":
        $mes="Feb";
      break;
    case "03":
        $mes="Mar";
      break;
    case "04":
        $mes="Abr";
      break;
    case "05":
        $mes="May";
      break;
    case "06":
        $mes="Jun";
      break;
    case "07":
        $mes="Jul";
      break;
    case "08":
        $mes="Ago";
      break;
    case "09":
        $mes="Sep";
      break;
    case "10":
        $mes="Oct";
      break;
    case "11":
        $mes="Nov";
      break;
    case "12":
        $mes="Dic";
      break;

    default:
      break;
  }
  
  $anio= strtolower($fecha_separada[0]);
  
  
  return "$dia-$mes-$anio";
}

    /**
	 * Perform the SQL queries needed for an server-side processing requested,
	 * utilising the helper functions of this class, limit(), order() and
	 * filter() among others. The returned array is ready to be encoded as JSON
	 * in response to an SSP request, or can be modified if needed before
	 * sending back to the client.
	 *
	 *  @param  array $request Data sent to server by DataTables
	 *  @param  array $sql_details SQL connection details - see sql_connect()
	 *  @param  string $table SQL table to query
	 *  @param  string $primaryKey Primary key of the table
	 *  @param  array $columns Column information array
	 *  @return array          Server-side processing response array
	 */
	static function tabla( $request, $cant, $table, $primaryKey, $columns )
	{
            
            
//            print_r($columns);
//            echo "--------------------------------------";
//            print_r($request);
//            
//            die();
            
                // Build the SQL query string from the request
		$limit = SSP::limit( $request, $columns );
                $order = SSP::order( $request, $columns );
                $where = SSP::filter( $request, $columns );
                $col=  SSP::columns($columns);
                
              //print_r($col);
                
                $condicion='{"limit":"'.$limit.'","order":"'.$order.'","where":"'.$where.'","cols":"'.$col.'"}';
                return $condicion;       

	}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Internal methods
	 */

	/**
	 * Throw a fatal error.
	 *
	 * This writes out an error message in a JSON string which DataTables will
	 * see and show to the user in the browser.
	 *
	 * @param  string $msg Message to send to the client
	 */
	static function fatal ( $msg )
	{
		echo json_encode( array( 
			"error" => $msg
		) );

		exit(0);
	}

	/**
	 * Create a PDO binding key which can be used for escaping variables safely
	 * when executing a query with sql_exec()
	 *
	 * @param  array &$a    Array of bindings
	 * @param  *      $val  Value to bind
	 * @param  int    $type PDO field type
	 * @return string       Bound key to be used in the SQL where this parameter
	 *   would be used.
	 */
	static function bind ( &$a, $val, $type )
	{
		$key = ':binding_'.count( $a );

		$a[] = array(
			'key' => $key,
			'val' => $val,
			'type' => $type
		);

		return $key;
	}


	/**
	 * Pull a particular property from each assoc. array in a numeric array, 
	 * returning and array of the property values from each item.
	 *
	 *  @param  array  $a    Array to get data from
	 *  @param  string $prop Property to read
	 *  @return array        Array of property values
	 */
	static function pluck ( $a, $prop )
	{
		$out = array();

		for ( $i=0, $len=count($a) ; $i<$len ; $i++ ) {
			$out[] = $a[$i][$prop];
		}

		return $out;
	}
}
