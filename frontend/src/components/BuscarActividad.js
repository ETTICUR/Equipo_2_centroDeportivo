import React, { useState, useEffect, useRef } from 'react';



function SearchMovies(){

	const [movies, setMovies] = useState([])
	const [keyword, setKeyword] = useState("")
	
	let busqueda = useRef()
	
	
	const apiKey = 'c53f759';
		
	useEffect(async ()=>{

		

			let response = await fetch(`/api/products`)
			let data = await response.json()

			if(data.products){
				setMovies(data.products)
			}else{
				setMovies([])
			}
		
		
	}, [keyword])

	const handleSubmit = (e)=>{
		e.preventDefault()
		let inputValue = busqueda.current.value
		setKeyword(inputValue)
	}

	

	// Credenciales de API
	 // Intenta poner cualquier cosa antes para probar

	return(
		<div className="container-fluid">
			{
				apiKey !== '' ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form method="GET" onSubmit={handleSubmit}>
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input ref={busqueda} type="text" className="form-control" />
								</div>
								<button className="btn btn-info" type='submit'>Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Películas para la palabra: {keyword}</h2>
						</div>
						{/* Listado de películas */}
						{
							movies.length > 0 && movies.map((movie, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.name}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													{/* <img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={movie.Poster}
														alt={movie.Title} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/> */}
												</div>
												<p>{movie.description}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ movies.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
			}
		</div>
	)
}

export default SearchMovies;
