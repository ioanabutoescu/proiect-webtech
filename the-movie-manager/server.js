const express = require("express")
const Sequelize = require("sequelize")


const sequelize = new Sequelize('themoviemanager', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
})

sequelize.authenticate().then(function(){
    console.log('success')
}).catch(function(){
    console.log('there was an error connecting to db')
})

const Movies = sequelize.define('movies', {

    tmdb_id: {
        type: Sequelize.STRING,
        field: 'tmdb_id'
    },
    title: {
        type: Sequelize.STRING,
        field: 'title'
    },
    release_date: {
        type: Sequelize.DATE,
        field: 'release_date'
    },
    homepage: {
        type: Sequelize.STRING,
        field: 'homepage'
    },
    rating: {
        type: Sequelize.INTEGER,
        filed: 'rating'
    },
    movie_type: {
        type: Sequelize.STRING,
        field: 'type'
    },
    overview: {
        type: Sequelize.TEXT,
        field: 'overview'
    }
});

const Genres = sequelize.define('genres', {
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    description: {
        type: Sequelize.TEXT,
        field: 'description'
    }
});

const Cast = sequelize.define('cast', {
   
    character_name: {
        type: Sequelize.STRING,
        field: 'character_name'
    },
    role_type: {
        type: Sequelize.STRING,
        field: 'role_type'
    }
});

const Actors = sequelize.define('actors', {

    actor_name: {
        type: Sequelize.STRING,
        field: 'actor_name'
    },
    wiki_url: {
        type: Sequelize.STRING,
        field: 'wiki_url'
    }
});

const Users = sequelize.define('users', {
    user_name: {
        type: Sequelize.STRING,
        field: 'user_id'
    },
    password: {
        type: Sequelize.STRING,
        field: 'password'
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    join_date: {
        type: Sequelize.DATE,
        field: 'join_date'
    },
    description_id: {
        type: Sequelize.INTEGER,
        field: 'description_id'
    }
});

Movies.belongsTo(Users);
Movies.belongsTo(Genres);
Cast.belongsTo(Movies);
Cast.belongsTo(Actors);

const app = express()
app.use(express.json())
app.use(express.urlencoded())

app.use('/', express.static("static"))

app.get('/createdb', function(request, response){
    sequelize.sync({force:true}).then(function(){
        response.status(200).send('tables created')
    }).catch(function(){
        response.status(200).send('could not create tables')
    })
})

//users
app.post('/users', (request, response) => {
    Users.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.get('/users', (request, response) => {
    Users.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/users/:id',(request, response)=>{
    Users.findById(request.params.id).then((result)=>{
       if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('no resource found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/users/:id', (request, response) => {
    Users.findById(request.params.id).then((user) => {
        if(user) {
            user.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/users/:id', (request, response) => {
    Users.findById(request.params.id).then((user) => {
        if(user) {
            user.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})


//movies
app.post('/movies', (request, response) => {
    Movies.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.get('/movies', (request, response) => {
    Movies.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/movies/:id', (request, response) => {
    Movies.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('ID not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/movies/:id', (request, response) => {
    Movies.findById(request.params.id).then((movie) => {
        if(movie) {
            movie.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/movies/:id', (request, response) => {
    Movies.findById(request.params.id).then((movie) => {
        if(movie) {
            movie.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//genres
app.post('/genres', (request, response) => {
    Genres.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.get('/genres', (request, response) => {
    Genres.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/genres/:id', (request, response) => {
    Genres.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('ID not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/genres/:id', (request, response) => {
    Genres.findById(request.params.id).then((genre) => {
        if(genre) {
            genre.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/genres/:id', (request, response) => {
    Genres.findById(request.params.id).then((genre) => {
        if(genre) {
            genre.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//actors
app.post('/actors', (request, response) => {
    Actors.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.get('/actors', (request, response) => {
    Actors.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/actors/:id',(request, response)=>{
    Actors.findById(request.params.id).then((result)=>{
       if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('no resource found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/actors/:id', (request, response) => {
    Actors.findById(request.params.id).then((actor) => {
        if(actor) {
            actor.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/actors/:id', (request, response) => {
    Actors.findById(request.params.id).then((actor) => {
        if(actor) {
            actor.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//cast
app.post('/cast', (request, response) => {
    Cast.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.get('/cast', (request, response) => {
    Cast.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/cast/:id',(request, response)=>{
    Cast.findById(request.params.id).then((result)=>{
       if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('no resource found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/cast/:id', (request, response) => {
    Cast.findById(request.params.id).then((cast) => {
        if(cast) {
            cast.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/cast/:id', (request, response) => {
    Cast.findById(request.params.id).then((cast) => {
        if(cast) {
            cast.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})



app.listen(8080)



